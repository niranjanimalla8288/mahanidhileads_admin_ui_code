import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/model/city';
import { StateService } from 'src/app/services/state.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent implements OnInit {

  cityForm!: FormGroup;
  CityModel: City = new City();
  States: any[] = [];
  constructor(
    private _fb: FormBuilder,
    public _planService: CityService, public stateservice: StateService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.cityForm = this._fb.group({
      id: '0',
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      stateId: ['', [Validators.required]],
      gpslocation: ''

    });
  }
  onCategoryChange(event: MatSelectChange): void {
    // Access the selected value using event.value
    console.log('Selected Category ID:', event.value);
  }
  ngOnInit(): void {
    this.cityForm.patchValue(this.data);
    this.stateservice.getStates().subscribe((data: any) => {
      console.log("statedata" + data);
      this.States = data
    })
  }
  onSubmit() {
    if (this.cityForm.valid) {
      if (this.data) {
        this._planService
          .updateCity(this.data.id, this.cityForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('City detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error('Error updating city:', err);

              if (err.status === 401) {
                this._coreService.openSnackBar('Unauthorized. Please login and try again.');
              } else if (err.status === 403) {
                this._coreService.openSnackBar('Forbidden. You do not have permission to update this city.');
              } else if (err.status === 404) {
                this._coreService.openSnackBar('City not found. Please check the details.');
              } else {
                this._coreService.openSnackBar('An error occurred while updating the city. Please try again.');
              }
            },
          });
      } else {
        this._planService.createCity(this.cityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('City added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error creating city:', err);

            if (err.status === 401) {
              this._coreService.openSnackBar('Unauthorized. Please login and try again.');
            } else if (err.status === 409) {
              this._coreService.openSnackBar('City already exists with the provided details.');
            } else {
              this._coreService.openSnackBar('An error occurred while adding the city. Please try again.');
            }
          },
        });
      }
    } else {
      this._coreService.openSnackBar('Invalid form. Please fill in all required fields.');
    }
  }


  toModel(formData: any) {

    this.CityModel.name = formData.name;
    this.CityModel.stateId = formData.stateId;
    this.CityModel.gpslocation = formData.gpslocation;
  }
}


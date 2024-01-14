import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CoreService } from 'src/app/core/core.service';
import { State } from 'src/app/model/state';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-create-states',
  templateUrl: './create-states.component.html',
  styleUrls: ['./create-states.component.css']
})
export class CreateStatesComponent implements OnInit {

  serviceForm!: FormGroup;

  serviceModel: State = new State();
  country: any;
  constructor(
    private _fb: FormBuilder,
    public _Service: StateService,
    private countryService: CountryService,
    private _dialogRef: MatDialogRef<CreateStatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {
    this.serviceForm = this._fb.group({
      id: '0',
      countryId: ['', Validators.required],
      name: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {

    this.serviceForm.patchValue(this.data);

    this.countryService.getCountries().subscribe((data: any) => {
      this.country = data;
    });

    this.getPlanList();
  }

  getPlanList() {
    this._Service.getStates().subscribe((res: any) => {
      console.log(res);
      this.serviceModel = res;
    });
  }
  onSubmit() {
    this.toModel(this.serviceForm.value);

    if (this.serviceForm.valid) {
      if (this.data) {
        this._Service
          .updateState(this.data.id, this.serviceForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('State detail updated!');
              this.getPlanList();
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error('Error updating state:', err);
              // Add more specific error handling or display user-friendly error messages
              if (err.status === 401) {
                this._coreService.openSnackBar('Unauthorized. Please login and try again.');
              } else if (err.status === 403) {
                this._coreService.openSnackBar('Forbidden. You do not have permission to perform this action.');
              } else if (err.status === 404) {
                this._coreService.openSnackBar('State not found. Please check the details.');
              } else {
                this._coreService.openSnackBar('An error occurred while updating the state. Please try again.');
              }
            },
          });
      } else {
        this._Service.createState(this.serviceForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('State added successfully');
            this._dialogRef.close(true);
            this.getPlanList();
          },
          error: (err: any) => {
            console.error('Error creating state:', err);
            // Add more specific error handling or display user-friendly error messages
            if (err.status === 401) {
              this._coreService.openSnackBar('Unauthorized. Please login and try again.');
            } else if (err.status === 409) {
              this._coreService.openSnackBar('State already exists with the provided details.');
            } else {
              this._coreService.openSnackBar('An error occurred while adding the state. Please try again.');
            }
          },
        });
      }
    } else {
      this._coreService.openSnackBar('Invalid form. Please fill in all required fields.');
    }
  }

  // onSubmit() {
  //   this._planService.updatePlan(this.data.id, this.serviceForm.value).subscribe((data: any) => {
  //     this._coreService.openSnackBar('Successfully Updated Plan Data');
  //     this._dialogRef.close(true);
  //     this.getPlanList();
  //   });
  // }

  toModel(formData: any) {

    if (this.data) {
      this.serviceModel.id = formData.id;
    }
    this.serviceModel.name = formData.name;
    this.serviceModel.countryId = formData.countryId;
  }


  onCountry(event: MatSelectChange): void {
    console.log("Country Name id", event.value);
  }

}

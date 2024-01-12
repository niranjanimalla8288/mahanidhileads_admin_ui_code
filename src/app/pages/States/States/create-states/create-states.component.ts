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
      name: '',
      countryId: '',
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
              console.error(err);
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
            console.error(err);
          },
        });
      }
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

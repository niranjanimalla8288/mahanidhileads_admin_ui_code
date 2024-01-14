import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/model/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryForm!: FormGroup;
  countryModel: Country = new Country();
  constructor(
    private _fb: FormBuilder,
    public _planService: CountryService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.countryForm = this._fb.group({
      id: '0',
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      currencyCode: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z0-9]+')]],
      telecomeCode: ['', [Validators.required]],
      currencySymbol: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    });
  }
  ngOnInit(): void {
    this.countryForm.patchValue(this.data);
  }
  onSubmit() {
    if (this.countryForm.valid) {
      if (this.data) {
        this._planService
          .updaupdateCountry(this.data.id, this.countryForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Country detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);

              // Handle specific error cases here
              if (err.status === 404) {
                this._coreService.openSnackBar('Country not found!', 'error');
              } else {
                this._coreService.openSnackBar('Error updating country detail.', 'error');
              }
            },
          });
      } else {
        console.log(this.countryModel);
        this._planService.createCountry(this.countryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Country added successfully');
            this._dialogRef.close(true);
            console.log(val);
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input.', 'error');
            } else {
              this._coreService.openSnackBar('Error adding country.', 'error');
            }
          },
        });
      }
    }
  }



  // ToModel(formData: any) {

  //   if (this.data) {
  //     this.countryModel.id = formData.id;
  //   }
  //   this.countryModel.name = formData.name;
  //   this.countryModel.code = formData.code;
  //   this.countryModel.currencyCode = formData.currencyCode;
  //   this.countryModel.telecomeCode = formData.telecomeCode;
  //   this.countryModel.currencySymbol = formData.currencySymbol;
  // }

}


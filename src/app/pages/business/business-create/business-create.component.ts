import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { BusinesstagService } from 'src/app/services/businesstag.service';
import { Businesstag } from 'src/app/model/businesstag';

@Component({
  selector: 'app-business-create',
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.css']
})
export class BusinessCreateComponent implements OnInit {

  businessForm!: FormGroup;
  Businessmodel: Businesstag = new Businesstag();
  constructor(
    private _fb: FormBuilder,
    public _planService: BusinesstagService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.businessForm = this._fb.group({
      id: '0',
      name: ['', [Validators.required]],

    });
  }
  ngOnInit(): void {
    this.businessForm.patchValue(this.data);
  }
  onSubmit() {
    if (this.businessForm.valid) {
      if (this.data) {
        this._planService
          .updateBusinesstag(this.data.id, this.businessForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Business detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error('Error updating business:', err);

              if (err.status === 401) {
                this._coreService.openSnackBar('Unauthorized. Please login and try again.');
              } else if (err.status === 403) {
                this._coreService.openSnackBar('Forbidden. You do not have permission to update this business.');
              } else if (err.status === 404) {
                this._coreService.openSnackBar('Business not found. Please check the details.');
              } else {
                this._coreService.openSnackBar('An error occurred while updating the business. Please try again.');
              }
            },
          });
      } else {
        this._planService.createBusinesstag(this.businessForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Business added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error creating business:', err);

            if (err.status === 401) {
              this._coreService.openSnackBar('Unauthorized. Please login and try again.');
            } else if (err.status === 409) {
              this._coreService.openSnackBar('Business already exists with the provided details.');
            } else {
              this._coreService.openSnackBar('An error occurred while adding the business. Please try again.');
            }
          },
        });
      }
    } else {
      this._coreService.openSnackBar('Invalid form. Please fill in all required fields.');
    }
  }

  toModel(formData: any) {

    this.Businessmodel.id = formData.id;

    this.Businessmodel.name = formData.name;


  }
}

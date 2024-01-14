import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { Paymentmode } from 'src/app/model/paymentmode';
import { PaymentmodeService } from 'src/app/services/paymentmode.service';

@Component({
  selector: 'app-paymentmode',
  templateUrl: './paymentmode.component.html',
  styleUrls: ['./paymentmode.component.css']
})
export class PaymentmodeComponent implements OnInit {

  paymentModeForm!: FormGroup;
  paymentModel: Paymentmode = new Paymentmode;
  constructor(
    private _fb: FormBuilder,
    public _planService: PaymentmodeService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.paymentModeForm = this._fb.group({
      id: '0',
      name: ['', Validators.required]

    });
  }
  ngOnInit(): void {
    this.paymentModeForm.patchValue(this.data);
  }
  onSubmit() {
    if (this.paymentModeForm.valid) {
      if (this.data) {
        this._planService
          .updatePaymentMode(this.data.id, this.paymentModeForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Pyament detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error('Error updating payment mode:', err);
              // Add more specific error handling or display user-friendly error messages
              if (err.status === 401) {
                this._coreService.openSnackBar('Unauthorized. Please login and try again.');
              } else if (err.status === 404) {
                this._coreService.openSnackBar('Pyament not found. Please check the details.');
              } else {
                this._coreService.openSnackBar('An error occurred while updating the payment mode. Please try again.');
              }
            },
          });
      } else {
        this._planService.createPaymentMode(this.paymentModeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Pyament added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error creating payment mode:', err);
            // Add more specific error handling or display user-friendly error messages
            if (err.status === 401) {
              this._coreService.openSnackBar('Unauthorized. Please login and try again.');
            } else if (err.status === 409) {
              this._coreService.openSnackBar('Pyament already exists with the provided details.');
            } else {
              this._coreService.openSnackBar('An error occurred while adding the Pyament. Please try again.');
            }
          },
        });
      }
    } else {
      this._coreService.openSnackBar('Invalid form. Please fill in all required fields.');
    }
  }

  ToModel(formData: any) {

    if (this.data) {
      this.paymentModel.id = formData.id;
    }
    this.paymentModel.name = formData.name;
  }
}


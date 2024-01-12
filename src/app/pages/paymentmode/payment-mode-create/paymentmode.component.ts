import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      name: ''

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
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._planService.createPaymentMode(this.paymentModeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  ToModel(formData: any) {

    if (this.data) {
      this.paymentModel.id = formData.id;
    }
    this.paymentModel.name = formData.name;
  }
}


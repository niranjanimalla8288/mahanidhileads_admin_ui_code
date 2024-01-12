import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-coustomer',
  templateUrl: './coustomer.component.html',
  styleUrls: ['./coustomer.component.css']
})
export class CoustomerComponent implements OnInit {

  customerForm!: FormGroup;
  custemerModel: Customer = new Customer();
  constructor(
    private _fb: FormBuilder,
    public _planService: CustomerService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.customerForm = this._fb.group({
      id: '0',
      name: '',
      mobileNumber: '',
      loginOtp: ''

    });
  }
  ngOnInit(): void {
    this.customerForm.patchValue(this.data);
  }
  onSubmit() {
    if (this.customerForm.valid) {
      if (this.data) {
        this._planService
          .updateCustomer(this.data.id, this.customerForm.value)
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
        this._planService.createCustomer(this.customerForm.value).subscribe({
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
      this.custemerModel.id = formData.id;
    }
    this.custemerModel.name = formData.name;
    this.custemerModel.mobileNumber = formData.mobileNumber;
    this.custemerModel.loginOtp = formData.loginOtp;
  }

}


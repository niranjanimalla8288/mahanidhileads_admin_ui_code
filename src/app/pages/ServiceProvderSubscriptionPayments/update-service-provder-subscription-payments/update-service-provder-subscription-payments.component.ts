import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { Serviceprovidersubscriptionspayment } from 'src/app/model/serviceprovidersubscriptionspayment';
import { ServiceprovidersubscriptionspaymentService } from 'src/app/services/serviceprovidersubscriptionspayment.service';

@Component({
  selector: 'app-update-service-provder-subscription-payments',
  templateUrl: './update-service-provder-subscription-payments.component.html',
  styleUrls: ['./update-service-provder-subscription-payments.component.css']
})
export class UpdateServiceProvderSubscriptionPaymentsComponent implements OnInit {

  formGroup!: FormGroup;
  serviceProviderModel: Serviceprovidersubscriptionspayment = new Serviceprovidersubscriptionspayment();
  constructor(
    private _fb: FormBuilder,
    public _Service: ServiceprovidersubscriptionspaymentService,
    private _dialogRef: MatDialogRef<UpdateServiceProvderSubscriptionPaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {
    this.formGroup = this._fb.group({
      id: '',
      serviceProviderId: '',
      serviceProviderSubscriptionId: '',
      paidAmount: '',
      paymentModeId: '',
      paymentDate: '',
      transactionReference: ''
    });
  }
  ngOnInit(): void {
    this.formGroup.patchValue(this.data);
  }

  getPlanList() {
    this._Service.getServiceprovidersubscriptionspayments().subscribe((res: any) => {
      console.log(res);
    });
  }
  onSubmit() {
    this.toModel(this.formGroup.value);
    if (this.formGroup.valid) {
      if (this.data) {
        this._Service
          .updateServiceprovidersubscriptionspayment(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Service Provider Subcribtion Payment detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },

          });
      } else {
        console.log("in add");
        this.toModel(this.formGroup.value);
        console.log(this.serviceProviderModel, "hi i am model");
        this._Service.createServiceprovidersubscriptionspayment(this.serviceProviderModel).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Plan added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  // onSubmit() {
  //   this._planService.updatePlan(this.data.id, this.planForm.value).subscribe((data: any) => {
  //     this._coreService.openSnackBar('Successfully Updated Plan Data');
  //     this._dialogRef.close(true);
  //     this.getPlanList();
  //   });
  // }

  toModel(formData: any) {

    if (this.data) {
      this.serviceProviderModel.id = formData.id;
    }
    this.serviceProviderModel.serviceProviderId = formData.serviceProviderId;
    this.serviceProviderModel.serviceProviderSubscriptionId = formData.serviceProviderSubscriptionId;
    this.serviceProviderModel.paidAmount = formData.paidAmount;
    this.serviceProviderModel.paymentModeId = formData.paymentModeId;
    this.serviceProviderModel.paymentDate = formData.paymentDate;
    this.serviceProviderModel.transactionReference = formData.transactionReference;
    // this.serviceProviderModel.isBannerAdd = formData.isBannerAdd == 0 ? false : true;
  }
}






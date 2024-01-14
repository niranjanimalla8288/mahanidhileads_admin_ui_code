import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CoreService } from 'src/app/core/core.service';
import { Serviceprovider } from 'src/app/model/serviceprovider';
import { Serviceprovidersubcategory } from 'src/app/model/serviceprovidersubcategory';
import { Serviceprovidersubscription } from 'src/app/model/serviceprovidersubscription';
import { Serviceprovidersubscriptionspayment } from 'src/app/model/serviceprovidersubscriptionspayment';
import { PaymentmodeService } from 'src/app/services/paymentmode.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { ServiceprovidersubscriptionService } from 'src/app/services/serviceprovidersubscription.service';
import { ServiceprovidersubscriptionspaymentService } from 'src/app/services/serviceprovidersubscriptionspayment.service';

@Component({
  selector: 'app-update-service-provder-subscription-payments',
  templateUrl: './update-service-provder-subscription-payments.component.html',
  styleUrls: ['./update-service-provder-subscription-payments.component.css']
})
export class UpdateServiceProvderSubscriptionPaymentsComponent implements OnInit {

  formGroup!: FormGroup;
  serviceProviderModel: Serviceprovidersubscriptionspayment = new Serviceprovidersubscriptionspayment();
  serviceProviderSubcategoryModel: Serviceprovidersubscription = new Serviceprovidersubscription();
  serviceProvider: any[] = [];
  serviceProviderSubscriptionData: any[] = [];
  paymentdata: any[] = [];
  constructor(
    private _fb: FormBuilder,
    private _serviceProvider: ServiceproviderService,
    private _paymentService: PaymentmodeService,
    public _Service: ServiceprovidersubscriptionspaymentService,
    private _serviceProviderSubscription: ServiceprovidersubscriptionService,
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
    this._serviceProvider.getServiceProviders().subscribe((data: any) => {
      this.serviceProvider = data;
      console.log(data, "service provider data");
    });
    this._serviceProviderSubscription.getServiceprovidersubscriptions().subscribe((data: any) => {
      this.serviceProviderSubscriptionData = data;
      console.log(data, "service service subcription");
    });
    this._paymentService.getPaymentModes().subscribe((data: any) => {
      this.paymentdata = data;
      console.log(data, "payment data");
    });
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

  getServiceProviderName(serviceProviderId: number): string {
    const Service = this.serviceProvider.find(s => s.Id === serviceProviderId);
    return Service ? Service.name : '';
  }
  serviceProviderEvent(event: MatSelectChange): void {
    console.log("Select City ID: ", event.value);
  }

  serviceProviderSubscriptionEvent(event: MatSelectChange): void {
    console.log("Select Subcription", event.value);
  }
  paymentMode(event: MatSelectChange): void {
    console.log("Select Payment ", event.value);
  }
}






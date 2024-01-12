import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { ServiceprovidersubscriptionService } from 'src/app/services/serviceprovidersubscription.service';
import { Serviceprovidersubscriptionspayment } from 'src/app/model/serviceprovidersubscriptionspayment';
import { Serviceprovidersubscription } from 'src/app/model/serviceprovidersubscription';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-create-service-provder-subscriptions',
  templateUrl: './create-service-provder-subscriptions.component.html',
  styleUrls: ['./create-service-provder-subscriptions.component.css']
})
export class CreateServiceProvderSubscriptionsComponent implements OnInit {

  formGroup!: FormGroup;
  categoryModel: Serviceprovidersubscription = new Serviceprovidersubscription();
  serviceProvider: any;
  Plan: any;
  constructor(
    private _fb: FormBuilder,
    public _planService: ServiceprovidersubscriptionService, private planService: PlanService,
    private ServiceProviderService: ServiceproviderService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.formGroup = this._fb.group({
      id: '0',
      ServiceProviderId: '',
      PlanId: '',
      StartDate: '',
      EndDate: '',
      ContractDocPath: '',
      SubscriptionAmount: '',
      ListingPosition: '',
    });
  }
  ngOnInit(): void {
    this.formGroup.patchValue(this.data);
    this.ServiceProviderService.getServiceProviders().subscribe((data: any) => {
      this.serviceProvider = data;
    });
    this.planService.getPlanList().subscribe((data: any) => {
      this.Plan = data;
    })
  }
  onSubmit() {
    if (this.formGroup.valid) {
      if (this.data) {
        this._planService
          .updateServiceprovidersubscription(this.data.id, this.formGroup.value)
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
        this._planService.createServiceprovidersubscription(this.formGroup.value).subscribe({
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
  onProvider(event: MatSelectChange): void {
    console.log('Selected City Id:', event.value);
  }
  onPlan(event: MatSelectChange): void {
    console.log('Selected City Id:', event.value);
  }
}





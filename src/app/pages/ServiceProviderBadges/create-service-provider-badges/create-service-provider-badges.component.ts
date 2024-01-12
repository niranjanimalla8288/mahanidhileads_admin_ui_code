import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { ServiceproviderbadgeService } from 'src/app/services/serviceproviderbadge.service';
import { Serviceproviderbadge } from 'src/app/model/serviceproviderbadge';
import { BadgeService } from 'src/app/services/badge.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-create-service-provider-badges',
  templateUrl: './create-service-provider-badges.component.html',
  styleUrls: ['./create-service-provider-badges.component.css']
})
export class CreateServiceProviderBadgesComponent implements OnInit {
  badgeModel: Serviceproviderbadge = new Serviceproviderbadge();
  formGroup!: FormGroup;
  serviceProviderModel: any;
  badge: any;
  constructor(
    private _fb: FormBuilder,
    public _Service: ServiceproviderbadgeService,
    private _serviceProvder: ServiceproviderService,
    private _badgeService: BadgeService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.formGroup = this._fb.group({
      'id': '0',
      'serviceProviderId': '',
      'badgeId': '',
      'expiryDate': ''

    });
  }
  ngOnInit(): void {
    this.formGroup.patchValue(this.data);

    this._serviceProvder.getServiceProviders().subscribe((data: any) => {
      this.serviceProviderModel = data;
    });

    this._badgeService.getBadges().subscribe((data: any) => {
      this.badge = data;
    });
  }
  onSubmit() {
    if (this.formGroup.valid) {
      if (this.data) {
        this._Service
          .updateServiceproviderbadge(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Service Badge detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._Service.createServiceproviderbadge(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Service Badge successfully');
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
      this.badgeModel.id = formData.id;
    }
    this.badgeModel.serviceProviderId = formData.serviceProviderId;
    this.badgeModel.badgeId = formData.badgeId;
    this.badgeModel.expiryDate = formData.expiryDate;
  }


  onServivceProvderID(event: MatSelectChange): void {
    console.log("Service Provider ID", event.value);
  }

  onBadge(event: MatSelectChange): void {
    console.log("Service Provider ID", event.value);
  }

}

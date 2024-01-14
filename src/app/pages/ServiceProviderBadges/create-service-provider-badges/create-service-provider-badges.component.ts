import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      serviceProviderId: ['', Validators.required],
      badgeId: ['', Validators.required],
      expiryDate: ['', Validators.required],

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
              console.error('Error updating service provider badge:', err);
              // Add more specific error handling or display user-friendly error messages
              if (err.status === 401) {
                this._coreService.openSnackBar('Unauthorized. Please login and try again.');
              } else if (err.status === 403) {
                this._coreService.openSnackBar('Forbidden. You do not have permission to perform this action.');
              } else if (err.status === 404) {
                this._coreService.openSnackBar('Service provider badge not found. Please check the details.');
              } else {
                this._coreService.openSnackBar('An error occurred while updating the service provider badge. Please try again.');
              }
            },
          });
      } else {
        this._Service.createServiceproviderbadge(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Service Badge added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error creating service provider badge:', err);
            // Add more specific error handling or display user-friendly error messages
            if (err.status === 401) {
              this._coreService.openSnackBar('Unauthorized. Please login and try again.');
            } else if (err.status === 409) {
              this._coreService.openSnackBar('Service provider badge already exists with the provided details.');
            } else {
              this._coreService.openSnackBar('An error occurred while adding the service provider badge. Please try again.');
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

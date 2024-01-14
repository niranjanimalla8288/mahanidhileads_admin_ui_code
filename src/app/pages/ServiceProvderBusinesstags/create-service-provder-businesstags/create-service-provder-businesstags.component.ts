import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { Serviceproviderbusinesstag } from 'src/app/model/serviceproviderbusinesstag';
import { ServiceproviderbusinesstagService } from 'src/app/services/serviceproviderbusinesstag.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { MatSelectChange } from '@angular/material/select';
import { BusinesstagService } from 'src/app/services/businesstag.service';

@Component({
  selector: 'app-create-service-provder-businesstags',
  templateUrl: './create-service-provder-businesstags.component.html',
  styleUrls: ['./create-service-provder-businesstags.component.css']
})
export class CreateServiceProvderBusinesstagsComponent implements OnInit {

  formGroup!: FormGroup;
  serviceProviderModel: any;
  businessTagModel: any;
  businessTagsModel: Serviceproviderbusinesstag = new Serviceproviderbusinesstag();
  constructor(
    private _fb: FormBuilder,
    public _Service: ServiceproviderbusinesstagService,
    private _service_provider_service: ServiceproviderService,
    private service_businesTag_service: BusinesstagService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.formGroup = this._fb.group({
      'id': '0',
      serviceProviderId: [null, Validators.required],
      businessTagId: [null, Validators.required],

    });
  }
  ngOnInit(): void {
    this.formGroup.patchValue(this.data);
    this._service_provider_service.getServiceProviders().subscribe((data: any) => {
      this.serviceProviderModel = data;
    });

    this.service_businesTag_service.getBusinesstags().subscribe((data: any) => {
      this.businessTagModel = data;
      console.log(data, "business tage data");
    });

  }
  onSubmit() {
    if (this.formGroup.valid) {
      if (this.data) {
        this._Service
          .updateServiceproviderbusinesstag(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Service Provider Business Tage detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error('Error updating service provider business tag:', err);
              // Add more specific error handling or display user-friendly error messages
              if (err.status === 401) {
                this._coreService.openSnackBar('Unauthorized. Please login and try again.');
              } else if (err.status === 403) {
                this._coreService.openSnackBar('Forbidden. You do not have permission to perform this action.');
              } else if (err.status === 404) {
                this._coreService.openSnackBar('Service provider business tag not found. Please check the details.');
              } else {
                this._coreService.openSnackBar('An error occurred while updating the service provider business tag. Please try again.');
              }
            },
          });
      } else {
        this._Service.createServiceproviderbusinesstag(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Service Provider Business Tage added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error creating service provider business tag:', err);
            // Add more specific error handling or display user-friendly error messages
            if (err.status === 401) {
              this._coreService.openSnackBar('Unauthorized. Please login and try again.');
            } else if (err.status === 409) {
              this._coreService.openSnackBar('Service provider business tag already exists with the provided details.');
            } else {
              this._coreService.openSnackBar('An error occurred while adding the service provider business tag. Please try again.');
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
      this.businessTagsModel.id = formData.id;
    }
    this.businessTagsModel.serviceProviderId = formData.serviceProviderId;
    this.businessTagsModel.businessTagId = formData.businessTagId;
  }


  onServiceProviderBusiness(event: MatSelectChange): void {
    console.log("Service Provider Business Id", event.value);
  }
  onbusinessTagId(event: MatSelectChange): void {
    console.log("Business Tage Id", event.value);
  }
}


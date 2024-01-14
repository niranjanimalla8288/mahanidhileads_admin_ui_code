import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { ServiceproviderserviceService } from 'src/app/services/serviceproviderservice.service';
import { Serviceproviderservice } from 'src/app/model/serviceproviderservice';
import { Observable, Subscriber } from 'rxjs';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { Serviceprovidercategory_Service_Service } from 'src/app/services/serviceprovidercategoryservice.service';

@Component({
  selector: 'app-create-service-provder-services',
  templateUrl: './create-service-provder-services.component.html',
  styleUrls: ['./create-service-provder-services.component.css']
})
export class CreateServiceProvderServicesComponent implements OnInit {
  logoBas64!: string;
  serviceForm!: FormGroup;
  serviceModel: Serviceproviderservice = new Serviceproviderservice();
  serviceProviderCategoryServiceModel: any[] = [];
  serviceProviderModel: any;
  constructor(
    private serviceProviderCategoryService: Serviceprovidercategory_Service_Service,
    private serviceProviderService: ServiceproviderService,
    private _fb: FormBuilder,
    public _Service: ServiceproviderserviceService,
    private _dialogRef: MatDialogRef<CreateServiceProvderServicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.serviceForm = this._fb.group({
      id: '0',
      serviceProviderCategoryServicesId: ['', Validators.required],
      serviceProviderId: ['', Validators.required],
      thumnailImagePath: ''
      // serviceProviderCategoryServices: ['']
    });
  }
  ngOnInit(): void {

    this.serviceForm.patchValue(this.data);

    this.serviceProviderCategoryService.getServiceprovidercategories().subscribe((data: any) => {
      this.serviceProviderCategoryServiceModel = data;

      console.log(data, "Service category Provider data");
    });


    this.serviceProviderService.getServiceProviders().subscribe((data: any) => {
      this.serviceProviderModel = data;

    });

  }

  getPlanList() {
    this._Service.getServiceproviderservices().subscribe((res: any) => {
      console.log(res);
      this.serviceModel = res;
    });
  }
  onSubmit() {
    if (this.serviceForm.valid) {
      this.serviceForm.value.thumnailImagePath = this.logoBas64;

      if (this.data) {
        this._Service
          .updateServiceproviderservice(this.data.id, this.serviceForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Service Provider Service detail updated!');
              this._dialogRef.close(true);
              this.getPlanList();
            },
            error: (err: any) => {
              console.error(err);

              // Handle specific error cases here
              if (err.status === 404) {
                this._coreService.openSnackBar('Service Provider Service not found!', 'error');
              } else {
                this._coreService.openSnackBar('Error updating Service Provider Service detail.', 'error');
              }
            },
          });
      } else {
        this._Service.createServiceproviderservice(this.serviceForm.value).subscribe({
          next: (val: any) => {
            this.getPlanList();
            this._coreService.openSnackBar('Service Provider Service added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input.', 'error');
            } else if (err.status === 409) {
              this._coreService.openSnackBar('Conflict. This Service Provider Service already exists.', 'error');
            } else {
              this._coreService.openSnackBar('Error adding Service Provider Service.', 'error');
            }
          },
        });
      }
    }
  }


  toModel(formData: any) {

    if (this.data) {
      this.serviceModel.id = formData.id;
    }
    this.serviceModel.serviceProviderCategoryServicesId = formData.serviceProviderCategoryServicesId;
    this.serviceModel.serviceProviderId = formData.serviceProviderId;

    this.serviceModel.thumnailImagePath = formData.thumnailImagePath;



  }
  // image convert to base64
  onchange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.converttoBase64(file);
  }

  converttoBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((d) => {

      console.log(d);
      this.logoBas64 = d;
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }

  onServiceProviderCategory(event: MatSelectChange): void {
    console.log('Selected serviceProviderCategoryServicesId Id:', event.value);
  }

  onSelect_serviceProvider(event: MatSelectChange): void {
    console.log('Selected Service Provider ID', event.value);
  }
}









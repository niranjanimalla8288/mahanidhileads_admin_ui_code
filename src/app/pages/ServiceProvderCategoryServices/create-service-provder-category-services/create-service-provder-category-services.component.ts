import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { ServiceprovidercategoryserviceModel } from 'src/app/model/serviceprovidercategoryservice';
import { Serviceprovidercategory_Service_Service } from 'src/app/services/serviceprovidercategoryservice.service';

@Component({
  selector: 'app-create-service-provder-category-services',
  templateUrl: './create-service-provder-category-services.component.html',
  styleUrls: ['./create-service-provder-category-services.component.css']
})
export class CreateServiceProvderCategoryServicesComponent implements OnInit {



  serviceForm!: FormGroup;
  serviceModel: ServiceprovidercategoryserviceModel = new ServiceprovidercategoryserviceModel();

  constructor(
    private _fb: FormBuilder,
    public _Service: Serviceprovidercategory_Service_Service,
    private _dialogRef: MatDialogRef<CreateServiceProvderCategoryServicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {
    this.serviceForm = this._fb.group({
      id: '',
      name: ['', [Validators.required]],


    });
  }
  ngOnInit(): void {

    this.serviceForm.patchValue(this.data);
  }

  getPlanList() {
    this._Service.getServiceprovidercategories().subscribe((res: any) => {
      console.log(res);
      this.serviceModel = res;
    });
  }
  onSubmit() {
    // this.toModel(this.serviceForm.value);

    if (this.serviceForm.valid) {
      if (this.data) {
        this._Service
          .updateServiceprovidercategory(this.data.id, this.serviceForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Service Provider Category Service detail updated!');
              this._dialogRef.close(true);
              this.getPlanList();
            },
            error: (err: any) => {
              console.error(err);

              // Handle specific error cases here
              if (err.status === 404) {
                this._coreService.openSnackBar('Service Provider Category Service not found!', 'error');
              } else {
                this._coreService.openSnackBar('Error updating Service Provider Category Service detail.', 'error');
              }
            },
          });
      } else {
        console.log("in add");
        // this.toModel(this.serviceForm.value);
        console.log("hi");
        this._Service.createServiceprovidercategory(this.serviceForm.value).subscribe({
          next: (val: any) => {
            this.serviceModel = val;
            this._coreService.openSnackBar('Service Provider Category Service added successfully');
            this._dialogRef.close(true);
            this.getPlanList();
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input.', 'error');
            } else {
              this._coreService.openSnackBar('Error adding Sesrvice Provider Category Service.', 'error');
            }
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

  // toModel(formData: any) {

  //   if (this.data) {
  //     this.serviceModel.id = formData.id;
  //   }
  //   this.serviceModel.name = formData.name;

  // }


}

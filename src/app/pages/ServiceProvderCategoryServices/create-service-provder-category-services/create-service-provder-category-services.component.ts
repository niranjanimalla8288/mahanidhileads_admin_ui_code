import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      name: ''

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
    this.toModel(this.serviceForm.value);
    if (this.serviceForm.valid) {
      if (this.data) {
        this._Service
          .updateServiceprovidercategory(this.data.id, this.serviceForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Plan detail updated!');
              this._dialogRef.close(true);
              this.getPlanList();
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        console.log("in add");
        this.toModel(this.serviceForm.value);
        console.log("hi");
        this._Service.createServiceprovidercategory(this.serviceModel).subscribe({
          next: (val: any) => {
            this.serviceModel = val;
            this._coreService.openSnackBar('Service  added successfully');
            this._dialogRef.close(true);
            this.getPlanList();
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
      this.serviceModel.id = formData.id;
    }
    this.serviceModel.name = formData.name;

  }


}

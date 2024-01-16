import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { ServiceprovidersubcategoryService } from 'src/app/services/serviceprovidersubcategory.service';
import { Observable, Subscriber } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ServiceprovidercategoryserviceModel } from 'src/app/services/serviceprovidercategoryservice';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

@Component({
  selector: 'app-create-service-provder-sub-categories',
  templateUrl: './create-service-provder-sub-categories.component.html',
  styleUrls: ['./create-service-provder-sub-categories.component.css']
})
export class CreateServiceProvderSubCategoriesComponent implements OnInit {

  formGroup!: FormGroup;
  logoBas641: any;
  serviceProviderCategoryModel: any[] = [];
  serviceProviderCategoryList: any;
  constructor(
    private _fb: FormBuilder,
    public _Service: ServiceprovidersubcategoryService,
    // private _serviceCategory: ServiceprovidercategoryserviceModel,
    private _serviceProviderCategory: ServiceprovidercategoryService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {
    this.formGroup = this._fb.group({
      id: '0',
      name: '',
      parentCategoryId: '',
      mainCategoryId: '',
      thumnailImagePath: '',
    });
  }
  ngOnInit(): void {
    this.formGroup.patchValue(this.data);
    // this.logoBas641 = this.data.thumnailImagePath;
    this._Service.getServiceprovidersubcategories().subscribe((data: any) => {
      this.serviceProviderCategoryModel = data;
      console.log(data, "service provider sub category details");
    });
    console.log("Hi i am working");
    this._serviceProviderCategory.getServiceprovidercategories().subscribe((data: any) => {
      this.serviceProviderCategoryList = data;
      console.log(data, "service provider category list");
    });
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.formGroup.value.thumnailImagePath = this.logoBas641;
      if (this.data) {
        this._Service
          .updateServiceprovidersubcategory(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Service Provider Sub Category detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              if (err.status === 401) {
                this._coreService.openSnackBar('Unauthorized. Please log in.');
              } else if (err.status === 403) {
                this._coreService.openSnackBar('Forbidden. You do not have permission.');
              } else if (err.status === 404) {
                this._coreService.openSnackBar('Not Found. Resource not available.');
              } else {
                this._coreService.openSnackBar('Error updating Service Provider Sub Category detail');
              }
            },
          });
      } else {
        this._Service.createServiceprovidersubcategory(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Service Provider Sub Category added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            if (err.status === 401) {
              this._coreService.openSnackBar('Unauthorized. Please log in.');
            } else if (err.status === 403) {
              this._coreService.openSnackBar('Forbidden. You do not have permission.');
            } else if (err.status === 404) {
              this._coreService.openSnackBar('Not Found. Resource not available.');
            } else {
              this._coreService.openSnackBar('Error adding Service Provider Sub Category');
            }
          },
        });
      }
    }
  }

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
      this.logoBas641 = d;
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
  // getSubCategoryName(mainCategoryId: number): string {
  //   const CategoryName = this.serviceProviderCategoryModel.find(s => s.id === mainCategoryId);
  //   return CategoryName ? CategoryName.name : '';
  // }

  onServiceSubCategory(event: MatSelectChange): void {
    console.log("Sub Category Id", event.value);
  }
  onServiceMainCategory(event: MatSelectChange): void {

  }
  onmainCategory(event: MatSelectChange): void {
    console.log("Category Select", event.value);
  }
}





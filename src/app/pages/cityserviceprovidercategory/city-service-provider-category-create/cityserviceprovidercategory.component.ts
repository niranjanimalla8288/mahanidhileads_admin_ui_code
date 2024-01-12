import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { CityserviceprovidercategoryService } from 'src/app/services/cityserviceprovidercategory.service';
import { CityService } from 'src/app/services/city.service';
import { MatSelectChange } from '@angular/material/select';
import { Serviceprovidercategory } from 'src/app/model/serviceprovidercategory';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

@Component({
  selector: 'app-cityserviceprovidercategory',
  templateUrl: './cityserviceprovidercategory.component.html',
  styleUrls: ['./cityserviceprovidercategory.component.css']
})
export class CityserviceprovidercategoryComponent implements OnInit {

  cityServicesCategoryForm!: FormGroup;
  Cities:any[]=[];
  cityprovidercatergories:any[]=[];
  constructor(
    private _fb: FormBuilder,
    public _planService: CityserviceprovidercategoryService,
    public cityservice: CityService,
    public serviceprovidecategory:ServiceprovidercategoryService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.cityServicesCategoryForm = this._fb.group({
      id:'0',
      cityId: '',
      serviceProviderCategoryId: '',
    });
  }
  ngOnInit(): void {
    this.cityServicesCategoryForm.patchValue(this.data);
    this.cityservice.getCities().subscribe((data:any)=>{
      console.log("Citydata"+data);
      this.Cities=data
    });
    this.serviceprovidecategory.getServiceprovidercategories().subscribe((res:any)=>{
      console.log('cityprovidercatergorydata:'+res);
      this.cityprovidercatergories=res;
    }); 
  }
  onCityChange(event: MatSelectChange): void {
    console.log('Selected City ID:', event.value);
  }

  onCategoryChange(events: MatSelectChange): void {
    console.log('Selected cityprovidercatergorydata ID:', events.value);
  }
  onSubmit() {
    if (this.cityServicesCategoryForm.valid) {
      if (this.data) {
        this._planService
          .updateCityServiceProviderCategory(this.data.id, this.cityServicesCategoryForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('CityyServiceProviderCategory detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._planService.createCityServiceProviderCategory(this.cityServicesCategoryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('CityyServiceProviderCategory added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}



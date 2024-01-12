import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { Observable, Subscriber } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';
import { MatSelectChange } from '@angular/material/select';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { ServiceprovidersubcategoryService } from 'src/app/services/serviceprovidersubcategory.service';
import { CityService } from 'src/app/services/city.service';
import { StateService } from 'src/app/services/state.service';
import { State } from 'src/app/model/state';

@Component({
  selector: 'app-create-service-providers',
  templateUrl: './create-service-providers.component.html',
  styleUrls: ['./create-service-providers.component.css']
})
export class CreateServiceProvidersComponent implements OnInit {

  serviceproviderForm!: FormGroup;
  logoBas641!: string;
  // currentIndex='';
  Statedata: any[] = [];
  mainCategoryModel: any;
  subCategoryModel: any;
  planDetails: any;
  cityModel: any;
  stateModel: any;
  cityDt: any;

  stateId: number = 0;
  cityId: number = 0;
  constructor(
    private _fb: FormBuilder,
    public _Service: ServiceproviderService,
    public _planService: PlanService,
    public _cityService: CityService,
    public _stateService: StateService,
    private _mainCategoryService: ServiceprovidercategoryService,
    private _subCategoryService: ServiceprovidersubcategoryService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.serviceproviderForm = this._fb.group({
      id: 0,
      businessName: '',
      subCategoryId: 0,
      mainCategoryId: 0,
      thumnailImagePath: '',
      email: '',
      mobileNumber: '',
      watsAppNumber: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      pinCode: '',
      gpsLocation: '',
      contactPerson: '',
      gstNumber: '',
      cinNumber: '',
      enrolledDate: null,
      expiryDate: null,
      yearOfEstablishment: '',
      workingHours: '',
      holidays: '',
      modesOfPayment: '',
      currentRating: 0,
      serviceDescription: '',
      stateId: '',
      cityId: ''
      // ... add other properties
    });
  }

  goToNextTab(tabGroup: MatTabGroup) {
    const currentIndex = tabGroup.selectedIndex || 0;
    const nextIndex = (currentIndex < tabGroup._tabs.toArray().length - 1) ? currentIndex + 1 : 0;
    tabGroup.selectedIndex = nextIndex;
  }

  ngOnInit(): void {
    this.serviceproviderForm.patchValue(this.data);
    // this.logoBas641 = this.data.thumnailImagePath;
    this._mainCategoryService.getServiceprovidercategories().subscribe((data: any) => {
      this.mainCategoryModel = data;
    });
    this._stateService.getStates().subscribe((data: any) => {
      this.Statedata = data;
    });
    this._subCategoryService.getServiceprovidersubcategories().subscribe((data: any) => {
      this.subCategoryModel = data;
    });

    this._planService.getPlanList
      ().subscribe((data: any) => {
        this.planDetails = data;
      });
  }

  onSubmit() {
    this._cityService.getCities().subscribe((data: any) => {
      this.cityModel = data;
    });
    this.serviceproviderForm.value.thumnailImagePath = this.logoBas641;
    this._Service.createServiceProvider(this.serviceproviderForm.value).subscribe((data: any) => {
      this._coreService.openSnackBar('Service Provider added successfully');
      this._dialogRef.close(true);
    });
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

  onmainCategory(event: MatSelectChange): void {
    console.log("Select Main Category Id:", event.value);
  }

  // onSubCategory(event: MatSelectChange): void {
  //   console.log("select sub category Id :", event.value);
  // }
  onCity(event: MatSelectChange): void {
    console.log("Select City Id :", event.value);
  }
  onState(event: MatSelectChange): void {
    console.log("Select State Id :", event.value)
  }
  onSubCategory(event: MatSelectChange): void {
    console.log("Select Main Category Id:", event.value);
  }
  // onmainCategory(event: MatSelectChange): void {
  //   console.log("select Main Category Id :", event.value);
  // }
  onAmenities(event: MatSelectChange): void {
    console.log("select sub Amenities Id :", event.value);
  }


  OnSelectState() {
    console.log(this.stateId, " state id on chagne event");
    if (this.serviceproviderForm.value.stateId) {
      this._stateService.getCitiesByStateById(this.serviceproviderForm.value.stateId)
        .subscribe((cities: any) => {
          this.cityDt = cities;
          console.log(this.cityDt, "city data");
        });
    } else {
      this.cityDt = [];
    }
  }

}

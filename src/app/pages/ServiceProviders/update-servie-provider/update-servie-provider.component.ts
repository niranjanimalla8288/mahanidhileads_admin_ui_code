import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Observable, Subscriber } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { StateService } from 'src/app/services/state.service';
import { CityService } from 'src/app/services/city.service';
import { MatSelectChange } from '@angular/material/select';
import { State } from 'src/app/model/state';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { ServiceprovidersubcategoryService } from 'src/app/services/serviceprovidersubcategory.service';
import { AminitiesService } from 'src/app/services/aminities.service';

@Component({
  selector: 'app-update-servie-provider',
  templateUrl: './update-servie-provider.component.html',
  styleUrls: ['./update-servie-provider.component.css']
})
export class UpdateServieProviderComponent implements OnInit {

  serviceproviderForm!: FormGroup;
  logoBas641!: string;
  // currentIndex='';
  // state: any[] = [];
  // city: any[] = [];
  stateModel: any;
  cityModel: any;
  mainCategoryModel: any;
  subCategoryModel: any;
  amenitiesModel: any;
  constructor(
    private _fb: FormBuilder,
    public _planService: ServiceproviderService,
    private _stateService: StateService,
    private _cityService: CityService,
    private _mainCategoryService: ServiceprovidercategoryService,
    private _amenitiesService: AminitiesService,
    private _subCategoryService: ServiceprovidersubcategoryService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.serviceproviderForm = this._fb.group({
      id: '',
      businessName: '',
      subCategoryId: '',
      mainCategoryId: '',
      thumbnailImagePath: '',
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
      enrolledDate: '',
      expiryDate: '',
      yearOfEstablishment: '',
      workingHours: '',
      holidays: '',
      modesOfPayment: '',
      currentRating: '',
      websiteLink: '',
      founded: '',
      stateId: '',
      cityId: '',
      streetViewImageLink: '',
      desciption: '',
      title: '',
      selectedPackage: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      facebook: '',
      twitterLink: '',
      linkedinLink: '',
      pintrestLink: '',
      googleplusLink: '',
      instagramLink: '',
      amenitiesId: ''
    });
  }

  goToNextTab(tabGroup: MatTabGroup) {
    const currentIndex = tabGroup.selectedIndex || 0;
    const nextIndex = (currentIndex < tabGroup._tabs.toArray().length - 1) ? currentIndex + 1 : 0;
    tabGroup.selectedIndex = nextIndex;
  }

  ngOnInit(): void {


    this.serviceproviderForm.patchValue(this.data);
    this._cityService.getCities().subscribe((data: any) => {
      this.cityModel = data;
    });
    console.log("hi iam testing");
    this._stateService.getStates().subscribe((data: any) => {
      this.stateModel = data;
      console.log(data, "State Data");
    });
    this._mainCategoryService.getServiceprovidercategories().subscribe((data: any) => {
      this.mainCategoryModel = data;
    });

    this._subCategoryService.getServiceprovidersubcategories().subscribe((data: any) => {
      this.subCategoryModel = data;
    });

    this._amenitiesService.getAmenities().subscribe((data: any) => {
      this.amenitiesModel = data;
    });
  }
  onSubmit() {
    if (this.serviceproviderForm.valid) {
      this.serviceproviderForm.value.thumnailImagePath = this.logoBas641;

      if (this.data) {
        this._planService.updateServiceProvider(this.data.id, this.serviceproviderForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Service Provider detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error updating service provider:', err);

            // Handle specific error cases
            if (err.status === 404) {
              this._coreService.openSnackBar('Service Provider not found. Please try again.');
            } else if (err.status === 403) {
              this._coreService.openSnackBar('You do not have permission to update this service provider.');
            } else {
              this._coreService.openSnackBar('An error occurred while updating service provider.');
            }
          },
        });
      } else {
        this._planService.createServiceProvider(this.serviceproviderForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Service Provider added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error creating service provider:', err);

            // Handle specific error cases
            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input and try again.');
            } else if (err.status === 402) {
              this._coreService.openSnackBar('Payment is required to add a service provider.');
            } else if (err.status === 403) {
              this._coreService.openSnackBar('You do not have permission to add a service provider.');
            } else {
              this._coreService.openSnackBar('An error occurred while adding service provider.');
            }
          },
        });
      }
    } else {
      // Handle form validation errors
      this._coreService.openSnackBar('Please fill in all required fields correctly.');
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

  // getCity(cityId:number):string{
  //   const city=this.city.find(c=>c.id  ===cityId);
  //   return city ? city.name:'';
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
  onmainCategory(event: MatSelectChange): void {
    console.log("select Main Category Id :", event.value);
  }
  onAmenities(event: MatSelectChange): void {
    console.log("select sub Amenities Id :", event.value);
  }
}

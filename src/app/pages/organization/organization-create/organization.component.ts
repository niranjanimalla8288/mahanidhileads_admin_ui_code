import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { Organization } from 'src/app/model/organization';
import { OrganizationService } from 'src/app/services/organization.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';
import { CityService } from 'src/app/services/city.service';
import { MatTabGroup } from '@angular/material/tabs';
import { City } from 'src/app/model/city';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']

})
export class OrganizationComponent implements OnInit {
  Countries: any;
  Cities: City[] = [];
  States: any;
  organizationForm!: FormGroup;
  organizationModel: Organization = new Organization();
  constructor(
    private _fb: FormBuilder,
    public _planService: OrganizationService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private countryService: CountryService,
    private StateService: StateService,
    private CityService: CityService) {

    this.organizationForm = this._fb.group({
      id: '0',
      // name: ['',],
      // contactPerson: [''],
      // contactNumber: [''],
      // supportNumber: [''],
      // supportEmail: [''],
      // addressLine1: [''],
      // addressLine2: [''],
      // addressLine3: [''],
      // stateId: [''],
      // cityId: [''],
      // pinCode: [''],
      // countryId: [''],
      name: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]*$/)]],
      supportNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]*$/)]],
      cityId: [Number],
      stateId: [Number],
      supportEmail: ['', [Validators.required, Validators.email]],
      addressLine1: ['', [Validators.required]],
      countryId: [null, [Validators.required]],
      addressLine2: [''],
      addressLine3: [''],
      pinCode: ['', [Validators.required]],

    });
  }

  goToNextTab(tabGroup: MatTabGroup) {
    const currentIndex = tabGroup.selectedIndex || 0;
    const nextIndex = (currentIndex < tabGroup._tabs.toArray().length - 1) ? currentIndex + 1 : 0;
    tabGroup.selectedIndex = nextIndex;
  }

  // get 
  onCountry(event: MatSelectChange): void {
    console.log('Selected Country Id:', event.value);
  }
  OnSelectState(event: MatSelectChange) {
    console.log('Selected state Id:', event.value);
    console.log(this.organizationForm.value.stateId, "onchange state id");
    if (this.organizationForm.value.stateId) {
      this.StateService.getCitiesByStateById(this.organizationForm.value.stateId).subscribe((data: any) => {
        console.log("state by city id", data);
        this.Cities = data;
      });
    }
  }
  onCity(event: MatSelectChange): void {
    console.log('Selected City Id:', event.value);
  }
  // get 
  ngOnInit(): void {
    this.organizationForm.patchValue(this.data);
    // countryget 
    this.countryService.getCountries().subscribe((data: any) => {
      this.Countries = data;
      console.log("contry data", data);
    });
    // Stateget
    this.StateService.getStates().subscribe((data: any) => {
      console.log('state data', data);
      this.States = data;
    });
    // Cityget
    this.CityService.getCities().subscribe((data: any) => {
      console.log('city data', data);
      // this.Cities = data;
    });// Cityget 
  }
  onSubmit() {
    if (this.organizationForm.valid) {
      if (this.data) {
        this._planService
          .updateOrganization(this.data.id, this.organizationForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Organization detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);

              // Handle specific error cases here
              if (err.status === 404) {
                this._coreService.openSnackBar('Organization not found!', 'error');
              } else {
                this._coreService.openSnackBar('Error updating organization detail.', 'error');
              }
            },
          });
      } else {
        this._planService.createOrganization(this.organizationForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Organization added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input.', 'error');
            } else {
              this._coreService.openSnackBar('Error adding organization.', 'error');
            }
          },
        });
      }
    }
  }

  ToModel(formData: any) {

    if (this.data) {
      this.organizationModel.id = formData.id; ``
    }
    this.organizationModel.name = formData.name;
    this.organizationModel.contactPerson = formData.contactPerson;
    this.organizationModel.contactNumber = formData.contactNumber;
    this.organizationModel.supportNumber = formData.supportNumber;
    this.organizationModel.supportEmail = formData.supportEmail;
    this.organizationModel.addressLine1 = formData.addressLine1;
    this.organizationModel.addressLine2 = formData.addressLine2;
    this.organizationModel.addressLine3 = formData.addressLine3;
    this.organizationModel.pinCode = formData.pinCode;
  }

}

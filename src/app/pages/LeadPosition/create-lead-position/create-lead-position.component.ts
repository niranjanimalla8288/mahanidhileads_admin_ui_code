import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CoreService } from 'src/app/core/core.service';
import { Leadposition } from 'src/app/model/leadposition';
import { CityService } from 'src/app/services/city.service';
import { LeadPositionService } from 'src/app/services/lead-position.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { LeadPositionRangeService } from 'src/app/services/lead-position-range.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

@Component({
  selector: 'app-create-lead-position',
  templateUrl: './create-lead-position.component.html',
  styleUrls: ['./create-lead-position.component.css']
})
export class CreateLeadPositionComponent {
  cityForm!: FormGroup;
  LpModel: Leadposition = new Leadposition();
  Cities: any[] = [];
  Categories: any[] = [];
  leadPositionRange: any[] = [];
  Sp: any[] = []
  constructor(
    private _fb: FormBuilder,
    public _planService: LeadPositionService, private cityService: CityService,
    private categoryService: ServiceprovidercategoryService, private LPRServiceRange: LeadPositionRangeService,
    private SPService: ServiceproviderService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.cityForm = this._fb.group({
      id: '0',
      cityId: '',
      categoryId: '',
      leadpositionRangeId: '',
      fromDate: '',
      toDate: '',
      serviceProviderId: ''

    });
  }
  onCategoryChange(event: MatSelectChange): void {
    // Access the selected value using event.value
    console.log('Selected Category ID:', event.value);
  }
  ngOnInit(): void {
    this.cityForm.patchValue(this.data);
    this.cityService.getCities().subscribe((data: any) => {
      console.log("Citiesdata" + data);
      this.Cities = data
    })
    this.categoryService.getServiceprovidercategories().subscribe((data: any) => {
      this.Categories = data;
    });

    this.LPRServiceRange.getLPR().subscribe((data: any) => {
      this.leadPositionRange = data;
      console.log("console", this.leadPositionRange);
    });

    this.SPService.getServiceProviders().subscribe((data: any) => {
      this.Sp = data;
    });
  }
  onSubmit() {
    if (this.cityForm.valid) {
      if (this.data) {
        this._planService
          .updateLP(this.data.id, this.cityForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('City detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._planService.createLP(this.cityForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('City added successfully');
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

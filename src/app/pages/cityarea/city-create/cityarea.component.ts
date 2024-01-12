import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { CityareaService } from 'src/app/services/cityarea.service';
import { Cityarea } from 'src/app/model/cityarea';
import { CityService } from 'src/app/services/city.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-cityarea',
  templateUrl: './cityarea.component.html',
  styleUrls: ['./cityarea.component.css']
})
export class CityareaComponent implements OnInit {

  cityAreaForm!: FormGroup;
  CityareaModel:Cityarea =new Cityarea();
   Cities:any[]=[];
  constructor(
    private _fb: FormBuilder,
    public _planService: CityareaService,
    public cityservice: CityService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.cityAreaForm = this._fb.group({
      id:'0',
      name: '',
      cityId:'',
      pinCode:'',
      gpslocation:'',
      searchRadiusInKms:''

    });
  }
  onCategoryChange(event: MatSelectChange): void {
    // Access the selected value using event.value
    console.log('Selected Category ID:', event.value);
  }
  ngOnInit(): void {
    this.cityAreaForm.patchValue(this.data);
    this.cityservice.getCities().subscribe((data:any)=>{
      console.log("Citydata"+data);
      this.Cities=data
    })
  }
  onSubmit() {
    if (this.cityAreaForm.valid) {
      if (this.data) {
        this._planService
          .updateCityarea(this.data.id, this.cityAreaForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('CityArea detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._planService.createCityarea(this.cityAreaForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('CityArea added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  toModel(formData: any) {
    
    this.CityareaModel.name = formData.name;
    this.CityareaModel.cityId = formData.cityId;
   this.CityareaModel.pinCode=formData.pinCode;
   this.CityareaModel.gpslocation=formData.gpslocation;
   this.CityareaModel.searchRadiusInKms=formData.searchRadiusInKms;
  }
}


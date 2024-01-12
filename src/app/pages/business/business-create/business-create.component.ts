import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { BusinesstagService } from 'src/app/services/businesstag.service';
import { Businesstag } from 'src/app/model/businesstag';

@Component({
  selector: 'app-business-create',
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.css']
})
export class BusinessCreateComponent implements OnInit {

  businessForm!: FormGroup;
  Businessmodel: Businesstag = new Businesstag();
  constructor(
    private _fb: FormBuilder,
    public _planService: BusinesstagService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.businessForm = this._fb.group({
      id:'0',
      name: '',

    });
  }
  ngOnInit(): void {
    this.businessForm.patchValue(this.data);
  }
  onSubmit() {
    if (this.businessForm.valid) {
      if (this.data) {
        this._planService
          .updateBusinesstag(this.data.id, this.businessForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Business detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._planService.createBusinesstag(this.businessForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Business added successfully');
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
   
    this.Businessmodel.id = formData.id;
    
    this.Businessmodel.name = formData.name;
    
   
  }
}

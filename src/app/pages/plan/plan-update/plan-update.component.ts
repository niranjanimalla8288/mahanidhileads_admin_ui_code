import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CoreService } from 'src/app/core/core.service';
import { Plan } from 'src/app/model/plan';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan-update',
  templateUrl: './plan-update.component.html',
  styleUrls: ['./plan-update.component.css']
})
export class PlanUpdateComponent implements OnInit {

  planForm!: FormGroup;
  planModel: Plan = new Plan();
  planFormControl: any;
  planDetails: any;
  constructor(
    private _fb: FormBuilder,
    public _planService: PlanService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {
    this.planForm = this._fb.group({
      id: '',
      name: ['', [Validators.required, Validators.maxLength(50)]],
      cost: ['', [Validators.required, Validators.min(0)]],
      durationInMonths: ['', [Validators.required, Validators.min(1)]],
      serviceDescription: ['', [Validators.maxLength(500)]],
      positionInListing: ['', [Validators.required, Validators.min(1)]],
    });
  }
  ngOnInit(): void {

    this.planForm.patchValue(this.data);
    this._planService.getPlanList().subscribe((data: any) => {
      this.planDetails = data;
    });
  }

  getPlanList() {
    this._planService.getPlanList().subscribe((res: any) => {
      console.log(res);
    });
  }
  // onSubmit() {
  //   this.toModel(this.planForm.value);
  //   if (this.planForm.valid) {
  //     if (this.data) {

  //       this._planService
  //         .updatePlan(this.data.id, this.planForm.value)
  //         .subscribe({

  //           next: (val: any) => {
  //             this._coreService.openSnackBar('Plan detail updated!');
  //             this._dialogRef.close(true);
  //           },
  //           error: (err: any) => {
  //             console.error(err);
  //           },

  //         });
  //     } else {
  //       console.log("in add");
  //       this.toModel(this.planForm.value);
  //       console.log(this.planModel);
  //       this._planService.createPlan(this.planModel).subscribe({
  //         next: (val: any) => {
  //           this._coreService.openSnackBar('Plan added successfully');
  //           this._dialogRef.close(true);
  //         },
  //         error: (err: any) => {
  //           console.error(err);
  //         },
  //       });
  //     }
  //   }
  // }
  onSubmit() {
    this.toModel(this.planForm.value);

    if (this.planForm.valid) {
      if (this.data) {
        this._planService.updatePlan(this.data.id, this.planForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Package detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 404) {
              this._coreService.openSnackBar('Package Details not found!', 'error');
            } else {
              this._coreService.openSnackBar('Error updating Package detail.', 'error');
            }
          },
        });
      } else {
        console.log("in add");
        this.toModel(this.planForm.value);
        console.log(this.planModel);

        this._planService.createPlan(this.planModel).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Package added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input.', 'error');
            } else {
              this._coreService.openSnackBar('Error! Please check your details, Please enter Valid details.', 'error');
            }
          },
        });
      }
    }
  }


  toModel(formData: any) {

    if (this.data) {
      this.planModel.id = formData.id;
    }
    this.planModel.name = formData.name;
    this.planModel.cost = formData.cost;
    this.planModel.durationInMonths = formData.durationInMonths;
    this.planModel.isBannerAdd = formData.isBannerAdd == 0 ? false : true;
    this.planModel.positionInListing = formData.positionInListing;
    this.planModel.serviceDescription = formData.serviceDescription;

  }


  onmainCategory(event: MatSelectChange): void {
    console.log("Select Main Category Id:", event.value);
  }
}

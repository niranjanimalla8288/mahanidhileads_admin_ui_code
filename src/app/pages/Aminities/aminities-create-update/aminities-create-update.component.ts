import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { Badge } from 'src/app/model/badge';
import { BadgeService } from 'src/app/services/badge.service';
import { Observable, Subscriber } from 'rxjs';
import { Aminities } from 'src/app/model/aminities';
import { AminitiesService } from 'src/app/services/aminities.service';

@Component({
  selector: 'app-aminities-create-update',
  templateUrl: './aminities-create-update.component.html',
  styleUrls: ['./aminities-create-update.component.css']
})
export class AminitiesCreateUpdateComponent {
  badgeForm!: FormGroup;
  AminitiesModel: Aminities = new Aminities();
  logoBas64!: string;
  constructor(
    private _fb: FormBuilder,
    public _planService: AminitiesService,
    private _dialogRef: MatDialogRef<AminitiesCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.badgeForm = this._fb.group({
      id: '0',
      categoryId: '',
      options: '',
      status: ''
    });
  }

  ngOnInit(): void {
    this.badgeForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.badgeForm.valid) {
      if (this.data) {
        this._planService
          .updateAmenities(this.data.id, this.badgeForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Aminities detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        console.log(this.badgeForm.value);
        this._planService.createAmenities(this.badgeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Aminities added successfully');
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

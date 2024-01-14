import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CoreService } from 'src/app/core/core.service';
import { Leadpositionrange } from 'src/app/model/leadpositionrange';
import { CityService } from 'src/app/services/city.service';
import { LeadPositionRangeService } from 'src/app/services/lead-position-range.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';

@Component({
  selector: 'app-create-leadposition-range',
  templateUrl: './create-leadposition-range.component.html',
  styleUrls: ['./create-leadposition-range.component.css']
})
export class CreateLeadpositionRangeComponent {
  leadRange!: FormGroup;
  LprModel: Leadpositionrange = new Leadpositionrange();

  constructor(
    private _fb: FormBuilder,
    public _planService: LeadPositionRangeService, public cityService: CityService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.leadRange = this._fb.group({
      id: '0',
      positionName: ['', Validators.required],
      price: ['', [Validators.required, Validators.minLength(0)]],
      positionFrom: [null, Validators.required],
      positionTo: [null, Validators.required],

    });
  }
  onCategoryChange(event: MatSelectChange): void {
    // Access the selected value using event.value
    console.log('Selected Category ID:', event.value);
  }
  ngOnInit(): void {
    this.leadRange.patchValue(this.data);

  }
  onSubmit() {
    if (this.leadRange.valid) {
      if (this.data) {
        this._planService
          .updateLPR(this.data.id, this.leadRange.value)
          .subscribe({
            next: (val: any) => {
              // Successful update
              this._coreService.openSnackBar('Lead Position Range detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              // Handle error
              console.error(err);

              if (err.status === 404) {
                this._coreService.openSnackBar('Lead Position Range not found!', 'error');
              } else {
                this._coreService.openSnackBar('Error updating Lead Position Range detail.', 'error');
              }
            },
          });
      } else {
        this._planService.createLPR(this.leadRange.value).subscribe({
          next: (val: any) => {
            // Successful creation
            this._coreService.openSnackBar('Lead Position Range added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            // Handle error
            console.error(err);

            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input.', 'error');
            } else {
              this._coreService.openSnackBar('Error adding Lead Position Range.', 'error');
            }
          },
        });
      }
    }
  }


  ToModel(formData: any) {
    if (this.data) {
      this.LprModel.id = formData.id;
    }
    this.LprModel.positionName = formData.positionName;
    this.LprModel.positionFrom = formData.positionFrom;
    this.LprModel.positionTo = formData.positionTo;
    this.LprModel.price = formData.price;
  }

}



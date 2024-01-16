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
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

@Component({
  selector: 'app-aminities-create-update',
  templateUrl: './aminities-create-update.component.html',
  styleUrls: ['./aminities-create-update.component.css']
})
export class AminitiesCreateUpdateComponent {
  badgeForm!: FormGroup;
  AminitiesModel: Aminities = new Aminities();
  logoBas64!: string;
  categories: any;
  constructor(
    private _fb: FormBuilder,
    public _planService: AminitiesService,
    private _serviceProviderCategory: ServiceprovidercategoryService,
    private _dialogRef: MatDialogRef<AminitiesCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.badgeForm = this._fb.group({
      id: '0',
      categoryId: '',
      options: '',
      // status: ''
    });
  }

  ngOnInit(): void {
    this.badgeForm.patchValue(this.data);
    this._serviceProviderCategory.getServiceprovidercategories().subscribe((data: any) => {
      this.categories = data;
      console.log(data, "Service Provider Category list");
    });
  }

  onSubmit() {
    if (this.badgeForm.valid) {
      if (this.data) {
        // Update existing amenity
        this._planService.updateAmenities(this.data.id, this.badgeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Amenities detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this.handleApiError(err);
          },
        });
      } else {
        // Create new amenity
        this._planService.createAmenities(this.badgeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Amenities added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this.handleApiError(err);
          },
        });
      }
    }
  }

  private handleApiError(error: any): void {
    let errorMessage = 'An error occurred. Please try again.';

    // Customize error messages based on the error response, if needed
    if (error.status === 404) {
      errorMessage = 'Amenity not found. Please check the details and try again.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please log in and try again.';
    }

    // Handle error logic, e.g., show a snackbar or display a modal with the error message
    this._coreService.openSnackBar(errorMessage, 'error');
    // You can also perform additional actions such as logging errors, etc.
  }



}

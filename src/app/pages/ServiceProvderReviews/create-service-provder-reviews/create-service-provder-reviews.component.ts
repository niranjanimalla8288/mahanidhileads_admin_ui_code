import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { Serviceproviderreview } from 'src/app/model/serviceproviderreview';
import { ServiceproviderreviewService } from 'src/app/services/serviceproviderreview.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MatSelectChange } from '@angular/material/select';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';

@Component({
  selector: 'app-create-service-provder-reviews',
  templateUrl: './create-service-provder-reviews.component.html',
  styleUrls: ['./create-service-provder-reviews.component.css']
})
export class CreateServiceProvderReviewsComponent implements OnInit {

  formGroup!: FormGroup;
  customers: any[] = [];
  serviceProvider: any[] = [];

  constructor(
    private _fb: FormBuilder,
    public _planService: ServiceproviderreviewService,
    private _providerService: ServiceproviderService,
    public _customerService: CustomerService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.formGroup = this._fb.group({
      id: '0',
      customerId: '',
      serviceProviderId: '',
      reviewTitle: '',
      reviewDescription: '',
      rating: '',
      reviewDate: '',
    });
  }
  ngOnInit(): void {
    this.formGroup.patchValue(this.data);
    this._customerService.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });

    this._providerService.getServiceProviders().subscribe((data: any) => {
      this.serviceProvider = data;
    });

  }
  onCustomerChange(event: MatSelectChange): void {
    // Access the selected value using event.value
    console.log('Selected Customer ID:', event.value);
  }

  onServiceProvider(event: MatSelectChange): void {
    console.log("Selected ServiceProvider Id: ", event.value);
  }
  onSubmit() {
    if (this.formGroup.valid) {
      if (this.data) {
        this._planService
          .updateServiceproviderreview(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('SP Review detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._planService.createServiceproviderreview(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('SP Review  added successfully');
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





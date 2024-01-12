import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomFields } from 'src/app/model/customfields';
import { CustomfieldsService } from 'src/app/services/customfields.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-custome-fields-create',
  templateUrl: './custome-fields-create.component.html',
  styleUrls: ['./custome-fields-create.component.css']
})
export class CustomeFieldsCreateComponent implements OnInit {
  Category: any;
  paymentModeForm!: FormGroup;
  paymentModel: CustomFields = new CustomFields;
  constructor(
    private _fb: FormBuilder,
    public _planService: CustomfieldsService,
    private _dialogRef: MatDialogRef<CustomeFieldsCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private CataegoryService: ServiceprovidercategoryService) {

    this.paymentModeForm = this._fb.group({
      id: '0',
      categoryId: '',
      fieldName: "",
      fieldTitle: "",
      type: "",
      options: "",
      helpText: "",
      showInDetail: "",
      showInSearch: "",
      sortOrder: ""

    });
  }

  onState(event: MatSelectChange): void {
    console.log('Selected State Id:', event.value);
  }

  ngOnInit(): void {
    this.paymentModeForm.patchValue(this.data);

    this.CataegoryService.getServiceprovidercategories().subscribe((data: any) => {
      console.log('data' + data);
      this.Category = data;
    });
  }
  onSubmit() {
    if (this.paymentModeForm.valid) {
      if (this.data) {
        this._planService
          .updateCF(this.data.id, this.paymentModeForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._planService.createCF(this.paymentModeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
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



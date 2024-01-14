import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { Serviceprovidercategory } from 'src/app/model/serviceprovidercategory';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-create-service-provder-categories',
  templateUrl: './create-service-provder-categories.component.html',
  styleUrls: ['./create-service-provder-categories.component.css']
})
export class CreateServiceProvderCategoriesComponent implements OnInit {
  categoryModel: Serviceprovidercategory = new Serviceprovidercategory();
  formGroup!: FormGroup;
  logoBas64!: string;
  constructor(
    private _fb: FormBuilder,
    public _planService: ServiceprovidercategoryService,
    private _dialogRef: MatDialogRef<PlanUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.formGroup = this._fb.group({
      id: '0',
      name: ['', [Validators.required]],
      thumnailImagePath: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    console.log(this.data.thumnailImagePath);
    this.formGroup.patchValue(this.data);
    this.logoBas64 = this.data?.thumnailImagePath || '';
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.formGroup.value.thumnailImagePath = this.logoBas64;
      if (this.data) {
        this._planService
          .updateServiceprovidercategory(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Service Provider Category detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);

              // Handle specific error cases here
              if (err.status === 404) {
                this._coreService.openSnackBar('Service Provider Category not found!', 'error');
              } else if (err.status === 401) {
                this._coreService.openSnackBar('Unauthorized. Please log in.', 'error');
              } else {
                this._coreService.openSnackBar('Error updating Service Provider Category. Please try again later.', 'error');
              }
            },
          });
      } else {
        this._planService.createServiceprovidercategory(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Service Provider Category added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input.', 'error');
            } else {
              this._coreService.openSnackBar('Error adding Service Provider Category. Please try again later.', 'error');
            }
          },
        });
      }
    }
  }

  ToModel(formData: any) {

    if (this.data) {
      this.categoryModel.id = formData.id;
    }
    this.categoryModel.name = formData.name;
    this.categoryModel.thumnailImagePath = formData.thumnailImagePath;
  }

  // image 
  // Image Convert to Base64
  onchange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.converttoBase64(file);
    }
  }


  converttoBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((d) => {
      console.log(d);
      this.logoBas64 = d;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }

    filereader.onerror = (error) => {
      console.error('Error reading file:', error);
      subscriber.error();
      subscriber.complete();
    }
  }
}



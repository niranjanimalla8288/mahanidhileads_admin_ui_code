import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { Badge } from 'src/app/model/badge';
import { BadgeService } from 'src/app/services/badge.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-badg-create',
  templateUrl: './badg-create.component.html',
  styleUrls: ['./badg-create.component.css']
})
export class BadgCreateComponent implements OnInit {

  badgeForm!: FormGroup;
  BadgeModel: Badge = new Badge();
  logoBas64!: string;
  constructor(
    private _fb: FormBuilder,
    public _planService: BadgeService,
    private _dialogRef: MatDialogRef<BadgCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.badgeForm = this._fb.group({
      id: '0',
      name: ['', Validators.required],
      thumnailImagePath: [null, Validators.required]
    });
  }

  ngOnInit(): void {

    this.badgeForm.patchValue(this.data);
    console.log(this.data.thumnailImagePath);
    console.log(this.data.name)
    this.logoBas64 = this.data.thumnailImagePath;

  }

  onSubmit() {
    if (this.badgeForm.valid) {
      // Set thumnailImagePath with the base64 value
      this.badgeForm.value.thumnailImagePath = this.logoBas64;

      if (this.data) {
        this._planService.updateBadge(this.data.id, this.badgeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Badge detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 404) {
              this._coreService.openSnackBar('Badge not found!', 'error');
            } else {
              this._coreService.openSnackBar('Error updating badge detail.', 'error');
            }
          },
        });
      } else {
        console.log(this.badgeForm.value);
        console.log(this.badgeForm.value.thumnailImagePath = this.logoBas64);

        this._planService.createBadge(this.badgeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Badge added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);

            // Handle specific error cases here
            if (err.status === 400) {
              this._coreService.openSnackBar('Bad request. Please check your input.', 'error');
            } else {
              this._coreService.openSnackBar('Error adding badge.', 'error');
            }
          },
        });
      }
    }
  }


  toModel(formData: any) {
    this.BadgeModel.name = formData.name;
    this.BadgeModel.thumnailImagePath = formData.thumnailImagePath;
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

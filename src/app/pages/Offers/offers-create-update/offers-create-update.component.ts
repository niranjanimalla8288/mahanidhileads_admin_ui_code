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
import { OffersService } from 'src/app/services/offers.service';


@Component({
  selector: 'app-offers-create-update',
  templateUrl: './offers-create-update.component.html',
  styleUrls: ['./offers-create-update.component.css']
})
export class OffersCreateUpdateComponent {
  offerForm!: FormGroup;
  AminitiesModel: Aminities = new Aminities();
  logoBas64!: string;
  constructor(
    private _fb: FormBuilder,
    public _planService: OffersService,
    private _dialogRef: MatDialogRef<OffersCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.offerForm = this._fb.group({
      id: '0',
      // postId:'',
      title: '',
      featuredImage: '',
      // hasTimeLimit: '',
      // activationDate: '',
      // expirationDate: '',
      // createdBy: '',
      // createdTime: '',
      // publishTime: '',
      // lastUpdatedTime: '',
      // status: '',
    });
  }

  ngOnInit(): void {

    this.offerForm.patchValue(this.data);
    console.log(this.data.featuredImage);
    console.log(this.data.name)
    this.logoBas64 = this.data.featuredImage;

  }

  onSubmit() {
    if (this.offerForm.valid) {
      this.offerForm.value.featuredImage = this.logoBas64;

      if (this.data) {
        this._planService.updateoffers(this.data.id, this.offerForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Offer detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error updating Offer:', err);

            if (err.status === 401) {
              console.error('Unauthorized access. Please log in.');
              // Handle unauthorized access (redirect to login or show a message)
            } else if (err.status === 403) {
              console.error('Forbidden access. You do not have permission.');
              // Handle forbidden access (redirect to an access denied page or show a message)
            } else {
              console.error('Unexpected error. Please try again later.');
              // Handle other errors (show a generic error message or perform other actions)
            }
          },
        });
      } else {
        this._planService.createOffers(this.offerForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Offer added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error adding Offer:', err);

            if (err.status === 401) {
              console.error('Unauthorized access. Please log in.');
              // Handle unauthorized access (redirect to login or show a message)
            } else if (err.status === 403) {
              console.error('Forbidden access. You do not have permission.');
              // Handle forbidden access (redirect to an access denied page or show a message)
            } else {
              console.error('Unexpected error. Please try again later.');
              // Handle other errors (show a generic error message or perform other actions)
            }
          },
        });
      }
    }
  }

  // toModel(formData: any) {
  //   this.BadgeModel.name = formData.name;
  //   this.BadgeModel.thumnailImagePath = formData.thumnailImagePath;
  // }

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

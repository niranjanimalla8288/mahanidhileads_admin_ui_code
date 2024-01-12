import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscriber } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { Add } from 'src/app/model/adds';
import { City } from 'src/app/model/city';
import { AddsService } from 'src/app/services/adds.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-adds-create',
  templateUrl: './adds-create.component.html',
  styleUrls: ['./adds-create.component.css']
})
export class AddsCreateComponent implements OnInit {
  addForm!: FormGroup
  cityModel: any;
  logoBas641!: string;
  addModel: Add = new Add();
  token: any;
  private authToken = 'your_authentication_token';
  private apiUrl = 'http://localhost:5148/api/Add';

  constructor(
    public http: HttpClient,
    public autherize: LoginService,
    private addService: AddsService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddsCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private CityService: CityService) {
    this.addForm = this._fb.group({
      id: '0',
      cityid: '',
      addImage: '',
      addPlace: '',
      fromDate: '',
      toDate: '',
      isActive: ''
    });
  }
  ngOnInit(): void {
    this.addForm.patchValue(this.data);
    this.CityService.getCities().subscribe((data: any) => {
      this.cityModel = data;
    });
    console.log("Hi hi hihh");
    this.token = this.autherize.getToken();
    console.log(this.token, "token value");
    console.log("login token data", this.token.token);
    // this.tokenValue();
    this.logoBas641 = this.data.addImage;
  }

  onSubmit() {
    if (this.addForm.valid, this.token) {
      this.addForm.value.addImage = this.logoBas641;
      if (this.data) {
        this.addService
          .updateAdds(this.data.id, this.addForm.value)
          .subscribe({
            next: (val: any) => {
              console.log(val);
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.addService.createAdd(this.addForm.value).subscribe({
          next: (val: any) => {
            console.log(val);
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

  onCity(event: MatSelectChange): void {
    console.log("Select City ID: ", event.value);
  }

  onchange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.converttoBase64(file);
  }

  converttoBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((d) => {

      console.log(d);
      this.logoBas641 = d;
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }



  ToModel(formData: any) {
    if (this.data) {
      this.addModel.id = formData.id;
    }
    this.addModel.cityid = formData.cityid;
    this.addModel.addPlace = formData.addPlace;
    this.addModel.fromDate = formData.fromDate;
    this.addModel.toDate = formData.toDate;
    this.addModel.addImage = formData.addImage;
    this.addModel.isActive = formData.isActive;
  }
}

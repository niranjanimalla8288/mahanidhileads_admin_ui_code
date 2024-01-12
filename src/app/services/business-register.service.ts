import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessRegisterService {

  // public apiUrl = "http://localhost:5148/api/BusinessRegistrations";

  public apiUrl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getBusinesslist() {
    return this.http.get(this.apiUrl + "BusinessRegistrations");
  }

}

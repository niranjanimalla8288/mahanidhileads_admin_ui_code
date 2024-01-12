import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomFields } from '../model/customfields';
import { environment } from '../model/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomfieldsService {

  // public apiurl = "http://localhost:5148/api/Customfields";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getCF() {
    return this.http.get(this.apiurl + "Customfields");
  }

  getCFById(id: number) {
    return this.http.get(`${this.apiurl + "Customfields"}/getCountryById?Id=${id}`);
  }

  createCF(data: CustomFields) {
    return this.http.post(this.apiurl + "Customfields", data);
  }
  updateCF(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiurl + "Customfields"}/${id}`, data);
  }

  deleteCF(id: number) {
    return this.http.delete(`${this.apiurl + "Customfields"}?id=${id}`);
  }
}

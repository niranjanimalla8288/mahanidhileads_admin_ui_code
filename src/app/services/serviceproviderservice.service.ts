import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Serviceproviderservice } from './serviceproviderservice';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceproviderserviceService {
  // public apiurl = "http://localhost:5148/api/Serviceproviderservices";

  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getServiceproviderservices() {
    return this.http.get(this.apiurl + "Serviceproviderservices");
  }

  getServiceproviderserviceById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceproviderservices"}/getServiceproviderserviceById?Id=${id}`);
  }

  createServiceproviderservice(data: Serviceproviderservice) {
    return this.http.post(this.apiurl + "Serviceproviderservices", data);
  }

  updateServiceproviderservice(id: number, data: any): Observable<any> {
    // Assuming there is an 'id' property in the Serviceproviderservice object
    return this.http.put(`${this.apiurl + "Serviceproviderservices"}/${data.id}`, data);
  }

  // deleteServiceproviderservice(id: number) {
  //   return this.http.delete(`${this.apiurl}/${id}`);
  // }

  deleteServiceproviderservice(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Serviceproviderservices"}/${id}`);
  }
}

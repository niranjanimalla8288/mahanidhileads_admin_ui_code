import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceprovidercategoryserviceModel } from '../model/serviceprovidercategoryservice';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class Serviceprovidercategory_Service_Service {

  // public apiurl = "http://localhost:5148/api/Serviceprovidercategoryservice";

  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceprovidercategories() {
    return this.http.get(this.apiurl + "Serviceprovidercategoryservice");
  }

  getServiceprovidercategoryById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceprovidercategoryservice"}/getServiceprovidercategoryById?Id=${id}`);
  }

  // createServiceprovidercategory(data: ServiceprovidercategoryserviceModel) {
  //   return this.http.post(this.apiurl, data);
  // }


  createServiceprovidercategory(data: ServiceprovidercategoryserviceModel) {
    return this.http.post(this.apiurl + "Serviceprovidercategoryservice", data);
  }
  // updateServiceprovidercategory(data: Serviceprovidercategory) {
  //   return this.http.put(`${this.apiurl}/${data.id}`, data);
  // }
  updateServiceprovidercategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiurl + "Serviceprovidercategoryservice"}/${id}`, data);
  }

  // deletePlan(id: number): Observable<any> {
  //   return this.http.delete(`http://localhost:5148/api/Serviceprovidercategoryservice/${id}`);
  // }

  deleteServiePCS(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Serviceprovidercategoryservice"}/${id}`);
  }
}

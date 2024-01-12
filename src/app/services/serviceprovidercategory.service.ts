import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serviceprovidercategory } from '../model/serviceprovidercategory';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceprovidercategoryService {
  // public apiurl = "http://localhost:5148/api/Serviceprovidercategories";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceprovidercategories() {
    return this.http.get(this.apiurl + "Serviceprovidercategories");
  }

  getServiceprovidercategoryById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceprovidercategories"}/getServiceprovidercategoryById?Id=${id}`);
  }

  createServiceprovidercategory(data: Serviceprovidercategory) {
    return this.http.post(this.apiurl + "Serviceprovidercategories", data);
  }

  updateServiceprovidercategory(id: number, data: any) {
    // Assuming there is an 'id' property in the Serviceprovidercategory object
    return this.http.put(`${this.apiurl + "Serviceprovidercategories"}/${id}`, data);
  }

  // deleteServiceprovidercategory(id: number) {
  //   return this.http.delete(`${this.apiurl}?id=${id}`);
  // }

  deleteServiceprovidercategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Serviceprovidercategories"}/${id}`);
  }
}

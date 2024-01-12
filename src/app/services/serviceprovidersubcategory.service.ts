import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serviceprovidersubcategory } from '../model/serviceprovidersubcategory';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceprovidersubcategoryService {
  // public apiurl = "http://localhost:5148/api/Serviceprovidersubcategories";

  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceprovidersubcategories() {
    return this.http.get(this.apiurl + "Serviceprovidersubcategories");
  }

  getServiceprovidersubcategoryById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceprovidersubcategories"}/getServiceprovidersubcategoryById?Id=${id}`);
  }

  createServiceprovidersubcategory(data: Serviceprovidersubcategory) {
    return this.http.post(this.apiurl + "Serviceprovidersubcategories", data);
  }

  updateServiceprovidersubcategory(id: number, data: any): Observable<any> {
    // Assuming there is an 'id' property in the Serviceprovidersubcategory object
    return this.http.put(`${this.apiurl + "Serviceprovidersubcategories"}/${data.id}`, data);
  }

  deleteServiceprovidersubcategory(id: number) {
    return this.http.delete(`${this.apiurl + "Serviceprovidersubcategories"}/${id}`);
  }
}

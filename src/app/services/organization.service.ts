import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '../model/organization';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  // public apiurl = "http://localhost:5148/api/Organizations";

  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getOrganizations() {
    return this.http.get(this.apiurl + "Organizations");
  }

  getOrganizationById(id: number) {
    return this.http.get(`${this.apiurl + "Organizations"}/getOrganizationById?Id=${id}`);
  }

  createOrganization(data: Organization) {
    return this.http.post(this.apiurl + "Organizations", data);
  }

  updateOrganization(id: number, data: any) {
    // Assuming there is an 'id' property in the Organization object
    return this.http.put(`${this.apiurl + "Organizations"}/${id}`, data);
  }

  // deleteOrganization(id: number) {
  //   return this.http.delete(`${this.apiurl}?id=${id}`);
  // }

  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Organizations"}/${id}`);
  }
}

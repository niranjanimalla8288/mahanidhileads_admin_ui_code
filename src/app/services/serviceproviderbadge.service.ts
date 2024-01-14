import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serviceproviderbadge } from '../model/serviceproviderbadge';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceproviderbadgeService {
  // public apiurl = "http://localhost:5148/api/Serviceproviderbadges";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceproviderbadges() {
    return this.http.get(this.apiurl + "Serviceproviderbadges");
  }

  getServiceproviderbadgeById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceproviderbadges"}/getServiceproviderbadgeById?Id=${id}`);
  }

  createServiceproviderbadge(data: Serviceproviderbadge) {
    return this.http.post(this.apiurl + "Serviceproviderbadges", data);
  }
  // updateServiceproviderbadge(id: number, data: any) {
  //   // Assuming there is an 'id' property in the Serviceproviderbadge object
  //   return this.http.put(`${this.apiurl}/${id}`, data);
  // }
  updateServiceproviderbadge(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiurl + "Serviceproviderbadges"}/${id}`, data);
  }

  // deleteServiceproviderbadge(id: number) {
  //   return this.http.delete(`${this.apiurl}?id=${id}`);
  // }

  deleteServiceproviderbadge(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Serviceproviderbadges"}/${id}`);
  }

}

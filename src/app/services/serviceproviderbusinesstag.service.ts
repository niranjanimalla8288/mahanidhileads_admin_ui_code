import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serviceproviderbusinesstag } from '../model/serviceproviderbusinesstag';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceproviderbusinesstagService {
  // public apiurl = "http://localhost:5148/api/Serviceproviderbusinesstags";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceproviderbusinesstags() {
    return this.http.get(this.apiurl + "Serviceproviderbusinesstags");
  }

  getServiceproviderbusinesstagById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceproviderbusinesstags"}/getServiceproviderbusinesstagById?Id=${id}`);
  }

  createServiceproviderbusinesstag(data: Serviceproviderbusinesstag) {
    return this.http.post(this.apiurl + "Serviceproviderbusinesstags", data);
  }

  updateServiceproviderbusinesstag(id: number, data: any) {
    // Assuming there is an 'id' property in the Serviceproviderbusinesstag object
    return this.http.put(`${this.apiurl + "Serviceproviderbusinesstags"}/${id}`, data);
  }

  // deleteServiceproviderbusinesstag(id: number) {
  //   return this.http.delete(`${this.apiurl}?id=${id}`);
  // }
  deleteServiceproviderbusinesstag(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Serviceproviderbusinesstags"}/${id}`);
  }
}

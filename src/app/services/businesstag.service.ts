import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Businesstag } from '../model/businesstag';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';


@Injectable({
  providedIn: 'root'
})
export class BusinesstagService {
  // public apiurl = "http://localhost:5148/api/Businesstags";
  public apiUrl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getBusinesstags() {
    return this.http.get(this.apiUrl + "Businesstags");
  }

  getBusinesstagById(id: number) {
    return this.http.get(`${this.apiUrl + "Businesstags"}/getBusinesstagById?Id=${id}`);
  }

  createBusinesstag(data: Businesstag) {
    return this.http.post(this.apiUrl + "Businesstags", data);
  }

  updateBusinesstag(id: number, data: any): Observable<any> {
    // Assuming there is an 'id' property in the Businesstag object
    return this.http.put(`${this.apiUrl + "Businesstags"}/${data.id}`, data);
  }

  // deleteBusinesstag(id: number) {
  //   return this.http.delete(`${this.apiUrl}?id=${id}`);
  // }
  // deleteBusinesstag(id: number): Observable<any> {
  //   return this.http.delete($ this.apiUrl +"Businesstags" ${id}`);
  // }
  deleteBusinesstag(id: number) {
    return this.http.delete(this.apiUrl + "Businesstags" + "/" + id);
  }
}

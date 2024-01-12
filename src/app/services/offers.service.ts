import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offers } from '../model/offers';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  // public apiurl = "http://localhost:5148/api/Offers";
  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getoffers() {
    return this.http.get(this.apiurl + "Offers");
  }

  getBadgeById(id: number) {
    return this.http.get(`${this.apiurl + "Offers"}/getBadgeById?Id=${id}`);
  }

  createOffers(formData: Offers) {
    return this.http.post(this.apiurl + "Offers", formData);
  }

  updateoffers(id: number, data: any): Observable<any> {
    // Assuming there is an 'id' property in the Badge object
    return this.http.put(`${this.apiurl + "Offers"}/${data.id}`, data);
  }
  // updatePlan(id: number, data: any): Observable<any> {
  //   return this.http.put(`http://localhost:5148/api/Plans/${id}`, data);
  // }
  deleteoffers(id: number) {
    return this.http.delete(this.apiurl + "Offers" + "/" + id);
  }

}

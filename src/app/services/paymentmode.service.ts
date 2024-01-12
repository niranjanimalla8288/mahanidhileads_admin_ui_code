import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paymentmode } from '../model/paymentmode';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentmodeService {
  // public apiurl = "http://localhost:5148/api/Paymentmodes";
  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getPaymentModes() {
    return this.http.get(this.apiurl + "Paymentmodes");
  }

  getPaymentModeById(id: number) {
    return this.http.get(`${this.apiurl + "Paymentmodes"}/getPaymentModeById?Id=${id}`);
  }

  createPaymentMode(data: Paymentmode) {
    return this.http.post(this.apiurl + "Paymentmodes", data);
  }

  updatePaymentMode(id: number, data: any) {
    // Assuming there is an 'id' property in the Paymentmode object
    return this.http.put(`${this.apiurl + "Paymentmodes"}/${id}`, data);
  }

  // deletePaymentMode(id: number) {
  //   return this.http.delete(`${this.apiurl}?id=${id}`);
  // }

  deletePaymentMode(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Paymentmodes"}/${id}`);
  }
}

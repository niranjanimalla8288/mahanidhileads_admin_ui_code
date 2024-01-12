import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serviceprovidersubscriptionspayment } from '../model/serviceprovidersubscriptionspayment';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceprovidersubscriptionspaymentService {
  // public apiurl = "http://localhost:5148/api/Serviceprovidersubscriptionspayments";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceprovidersubscriptionspayments() {
    return this.http.get(this.apiurl + "Serviceprovidersubscriptionspayments");
  }

  getServiceprovidersubscriptionspaymentById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceprovidersubscriptionspayments"}/getServiceprovidersubscriptionspaymentById?Id=${id}`);
  }

  createServiceprovidersubscriptionspayment(data: Serviceprovidersubscriptionspayment) {
    return this.http.post(this.apiurl + "Serviceprovidersubscriptionspayments", data);
  }

  updateServiceprovidersubscriptionspayment(id: number, data: any) {
    // Assuming there is an 'id' property in the Serviceprovidersubscriptionspayment object
    return this.http.put(`${this.apiurl + "Serviceprovidersubscriptionspayments"}/${id}`, data);
  }

  deleteServiceprovidersubscriptionspayment(id: number) {
    return this.http.delete(`${this.apiurl + "Serviceprovidersubscriptionspayments"}/${id}`);
  }
}

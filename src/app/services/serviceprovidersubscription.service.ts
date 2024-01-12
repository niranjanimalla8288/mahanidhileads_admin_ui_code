import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serviceprovidersubscription } from '../model/serviceprovidersubscription';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceprovidersubscriptionService {
  // public apiurl = "http://localhost:5108/api/Serviceprovidersubscription";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceprovidersubscriptions() {
    return this.http.get(this.apiurl + "Serviceprovidersubscription");
  }

  getServiceprovidersubscriptionById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceprovidersubscription"}/getServiceprovidersubscriptionById?Id=${id}`);
  }

  createServiceprovidersubscription(data: Serviceprovidersubscription) {
    return this.http.post(this.apiurl + "Serviceprovidersubscription", data);
  }

  updateServiceprovidersubscription(id: number, data: any) {
    // Assuming there is an 'id' property in the Serviceprovidersubscription object
    return this.http.put(`${this.apiurl + "Serviceprovidersubscription"}/${id}`, data);
  }

  deleteServiceprovidersubscription(id: number) {
    return this.http.delete(`${this.apiurl + "Serviceprovidersubscription"}/${id}`);
  }
}

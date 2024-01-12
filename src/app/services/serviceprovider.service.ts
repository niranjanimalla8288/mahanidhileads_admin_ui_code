import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Serviceprovider } from '../model/serviceprovider';
import { Observable } from 'rxjs';
import { Serviceprovider } from '../model/serviceprovider';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceproviderService {
  // public apiurl = "http://localhost:5148/api/Serviceproviders";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceProviders() {
    return this.http.get(this.apiurl + "Serviceproviders");
  }

  getServiceProviderById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceproviders"}/getServiceProviderById?Id=${id}`);
  }

  createServiceProvider(data: Serviceprovider) {
    return this.http.post(this.apiurl + "Serviceproviders/", data);
  }

  updateServiceProvider(id: number, data: Serviceprovider): Observable<any> {
    // Assuming there is an 'id' property in the Serviceprovider object
    return this.http.put(`${this.apiurl + "Serviceproviders"}/${data.id}`, data);
  }

  // deleteServiceProvider(id: number) {
  //   return this.http.delete(`${this.apiurl}/${id}`);
  // }

  deleteServiceProvider(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Serviceproviders"}/${id}`);
  }
}

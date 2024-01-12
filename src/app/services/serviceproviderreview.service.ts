import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Serviceproviderreview } from '../model/serviceproviderreview';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceproviderreviewService {
  // public apiurl = "http://localhost:5148/api/Serviceproviderreviews";

  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getServiceproviderreviews() {
    return this.http.get(this.apiurl + "Serviceproviderreviews");
  }

  getServiceproviderreviewById(id: number) {
    return this.http.get(`${this.apiurl + "Serviceproviderreviews"}/getServiceproviderreviewById?Id=${id}`);
  }

  createServiceproviderreview(data: Serviceproviderreview) {
    return this.http.post(this.apiurl + "Serviceproviderreviews", data);
  }

  updateServiceproviderreview(id: number, data: any): Observable<any> {
    // Assuming there is an 'id' property in the Serviceproviderreview object
    return this.http.put(`${this.apiurl + "Serviceproviderreviews"}/${data.id}`, data);
  }

  deleteServiceproviderreview(id: number) {
    return this.http.delete(`${this.apiurl + "Serviceproviderreviews"}/${id}`);
  }
}

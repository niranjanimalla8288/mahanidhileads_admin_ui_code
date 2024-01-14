import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../model/country';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // public apiurl = "http://localhost:5148/api/Countries";
  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getCountries() {
    return this.http.get(this.apiurl + "Countries");
  }

  getCountryById(id: number) {
    return this.http.get(`${this.apiurl + "Countries"}/getCountryById?Id=${id}`);
  }

  createCountry(data: Country) {
    return this.http.post(this.apiurl + "Countries/", data);
  }

  // updateCountry(id: number, data: Country): Observable<any> {
  //   return this.http.put(`${this.apiurl + "Countries"}/${data.id}`, data);
  // }
  // updateCountry(data: Country) {
  //   return this.http.put(this.apiurl + "Countries", data);
  // }
  updaupdateCountry(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiurl + "Countries"}/${id}`, data);
  }
  deleteCountry(id: number) {
    return this.http.delete(this.apiurl + "Countries" + "/" + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cityserviceprovidercategory } from '../model/cityserviceprovidercategory';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';


@Injectable({
  providedIn: 'root'
})
export class CityserviceprovidercategoryService {
  // public apiurl = "http://localhost:5148/api/Cityserviceprovidercategories";
  // http://localhost:5148/api/Cityserviceprovidercategories

  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getCityServiceProviderCategories() {
    return this.http.get(this.apiurl + "Cityserviceprovidercategories");
  }

  getCityServiceProviderCategoryById(id: number) {
    return this.http.get(`${this.apiurl + "Cityserviceprovidercategories"}/getCityServiceProviderCategoryById?Id=${id}`);
  }

  createCityServiceProviderCategory(data: Cityserviceprovidercategory) {
    return this.http.post(this.apiurl + "Cityserviceprovidercategories", data);
  }

  updateCityServiceProviderCategory(id: number, data: Cityserviceprovidercategory): Observable<any> {
    // Assuming there is an 'id' property in the Cityserviceprovidercategory object
    return this.http.put(`${this.apiurl + "Cityserviceprovidercategories"}/${data.id}`, data);
  }

  deleteCityServiceProviderCategory(id: number) {
    return this.http.delete(this.apiurl + "Cityserviceprovidercategories" + "/" + id);
  }
}

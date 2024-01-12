import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aminities } from '../model/aminities';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class AminitiesService {


  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getAmenities() {
    return this.http.get(this.apiurl + "Amenities");
  }

  getAmenitiesId(id: number) {
    return this.http.get(`${this.apiurl + "Amenities"}/getBadgeById?Id=${id}`);
  }

  createAmenities(formData: Aminities) {
    return this.http.post(this.apiurl + "Amenities", formData);
  }

  updateAmenities(id: number, data: any): Observable<any> {
    // Assuming there is an 'id' property in the Badge object
    return this.http.put(`${this.apiurl + "Amenities"}/${data.id}`, data);
  }
  // updatePlan(id: number, data: any): Observable<any> {
  //   return this.http.put(`http://localhost:5148/api/Plans/${id}`, data);
  // }
  deleteAmenities(id: number) {
    return this.http.delete(this.apiurl + "Amenities" + "/" + id);
  }

}

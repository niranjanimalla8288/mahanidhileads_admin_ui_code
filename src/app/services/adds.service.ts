import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Add } from '../model/adds';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})


export class AddsService {



  public apiurl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAdds() {
    return this.http.get(this.apiurl + "Add");
  }

  createAdd(data: Add) {
    return this.http.post(this.apiurl + "Add", data);
  }


  updateAdds(id: number, data: Add) {
    // Assuming there is an 'id' property in the Organization object
    return this.http.put(`${this.apiurl + "Add"}/${id}`, data);
  }

  // deleteOrganization(id: number) {
  //   return this.http.delete(`${this.apiurl}?id=${id}`);
  // }

  deleteAdds(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl}?id=${id}`);
  }
}

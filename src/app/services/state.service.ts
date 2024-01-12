import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../model/state';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // public apiurl = "http://localhost:5148/api/States";
  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getStates() {
    return this.http.get(this.apiurl + "States");
  }

  getStateById(id: number) {
    return this.http.get(`${this.apiurl + "States"}/getStateById?Id=${id}`);
  }

  createState(data: State) {
    return this.http.post(this.apiurl + "States", data);
  }

  updateState(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiurl + "States"}/${id}`, data);
  }


  // deleteState(id: number) {
  //   return this.http.delete(`${this.apiurl}?id=${id}`);
  // }
  getCitiesByStateById(id: number) {
    return this.http.get(this.apiurl + "States" + "/getstatecities?id=" + id);
  }
  deleteState(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "States"}/${id}`);
  }
}

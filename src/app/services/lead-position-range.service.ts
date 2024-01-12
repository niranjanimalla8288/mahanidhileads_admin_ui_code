import { Injectable } from '@angular/core';
import { Leadpositionrange } from '../model/leadpositionrange';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from 'jquery';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadPositionRangeService {
  // public apiurl = "http://localhost:5148/api/Leadpositionrange";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getLPR() {
    return this.http.get(this.apiurl + "Leadpositionrange");
  }

  getLPRById(id: number) {
    return this.http.get(`${this.apiurl + "Leadpositionrange"}/${id}`);
  }

  createLPR(data: Leadpositionrange) {
    return this.http.post(this.apiurl + "Leadpositionrange", data);
  }
  // updateLPR(id: number, data: any): Observable<any> {
  //   return this.http.put(`${this.apiurl}/${id}`, data);
  // }
  updateLPR(id: number, data: Leadpositionrange) {
    return this.http.put(this.apiurl + "Leadpositionrange" + "/" + id, data);
  }


  // deleteLPR(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiurl} ${id}`);
  // }

  deleteLPR(id: number) {
    return this.http.delete(this.apiurl + "Leadpositionrange" + "/" + id);
  }
}

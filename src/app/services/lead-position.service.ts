import { Injectable } from '@angular/core';
import { Leadposition } from '../model/leadposition';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadPositionService {

  // public apiurl = "http://localhost:5148/api/Leadposition";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getLP() {
    return this.http.get(this.apiurl + "Leadposition");
  }

  getLPById(id: number) {
    return this.http.get(`${this.apiurl + "Leadposition"}/${id}`);
  }

  createLP(data: Leadposition) {
    return this.http.post(this.apiurl + "Leadposition", data);
  }
  updateLP(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiurl + "Leadposition"}/${id}`, data);
  }


  deleteLP(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl} /${id}`);
  }
}

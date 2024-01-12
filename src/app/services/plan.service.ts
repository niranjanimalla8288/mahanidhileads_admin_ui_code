import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  // public apiurl = "http://localhost:5148/api/Plans";
  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  createPlan(data: Plan) {
    return this.http.post(this.apiurl + "Plans", data);
  }

  updatePlan(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiurl + "Plans"}/${id}`, data);
  }

  getPlanList(): Observable<any> {
    return this.http.get(this.apiurl + "Plans");
  }

  // deletePlan(id: number): Observable<any> {
  //   return this.http.delete(`http://localhost:5148/api/Plans/${id}`);
  // }
  deletePlan(id: number) {
    return this.http.delete(this.apiurl + "Plans" + "/" + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Badge } from '../model/badge';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';


@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getBadges() {
    return this.http.get(this.apiurl + "Badges");
  }

  getBadgeById(id: number) {
    return this.http.get(`${this.apiurl + "Badges"}/getBadgeById?Id=${id}`);
  }

  createBadge(formData: Badge) {
    return this.http.post(this.apiurl + "Badges", formData);
  }

  updateBadge(id: number, data: any): Observable<any> {
    // Assuming there is an 'id' property in the Badge object
    return this.http.put(`${this.apiurl}${data.id}`, data);
  }
  // updatePlan(id: number, data: any): Observable<any> {
  //   return this.http.put(`http://localhost:5148/api/Plans/${id}`, data);
  // }
  deleteBadge(id: number) {
    return this.http.delete(this.apiurl + "Badges" + "/" + id);
  }

}

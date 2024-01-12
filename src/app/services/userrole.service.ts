import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userrole } from '../model/userrole';

@Injectable({
  providedIn: 'root'
})
export class UserroleService {
  public apiurl = "http://localhost:5108/api/Userrole";

  constructor(public http: HttpClient) { }

  getUserroles() {
    return this.http.get(this.apiurl);
  }

  getUserroleById(id: number) {
    return this.http.get(`${this.apiurl}/getUserroleById?Id=${id}`);
  }

  createUserrole(data: Userrole) {
    return this.http.post(this.apiurl, data);
  }

  updateUserrole(data: Userrole) {
    // Assuming there is an 'id' property in the Userrole object
    return this.http.put(`${this.apiurl}/${data.id}`, data);
  }

  deleteUserrole(id: number) {
    return this.http.delete(`${this.apiurl}?id=${id}`);
  }
}

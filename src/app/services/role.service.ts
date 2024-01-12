import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../model/roles';
// import { Role } from 'src/model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public apiurl = "http://localhost:5108/api/Role";

  constructor(public http: HttpClient) { }

  getRoles() {
    return this.http.get(this.apiurl);
  }

  getRoleById(id: number) {
    return this.http.get(`${this.apiurl}/getRoleById?Id=${id}`);
  }

  createRole(data: Role) {
    return this.http.post(this.apiurl, data);
  }

  // updateRole(data: Role) {
  //   return this.http.put(`${this.apiurl}/${data.id}`, data);
  // }

  deleteRole(id: number) {
    return this.http.delete(`${this.apiurl}?id=${id}`);
  }
}

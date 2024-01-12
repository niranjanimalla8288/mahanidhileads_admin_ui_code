import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiurl = "http://localhost:5108/api/User";

  constructor(public http: HttpClient) { }

  getUsers() {
    return this.http.get(this.apiurl);
  }

  getUserById(id: number) {
    return this.http.get(`${this.apiurl}/getUserById?Id=${id}`);
  }

  createUser(data: User) {
    return this.http.post(this.apiurl, data);
  }

  updateUser(data: User) {
    // Assuming there is an 'id' property in the User object
    return this.http.put(`${this.apiurl}/${data.id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiurl}?id=${id}`);
  }
}

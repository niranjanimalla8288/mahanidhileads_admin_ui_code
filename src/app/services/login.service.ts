import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Signup } from '../model/add-user';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInUser: any;
  // private baseUrl = "http://localhost:5148/api/Register";
  private baseUrl = environment.apiUrl;
  private userPayload: any;



  constructor(private http: HttpClient, public router: Router) {
    this.userPayload = this.decodedToken()
  }

  signUp(data: Signup) {
    return this.http.post(this.baseUrl + 'Register/register', data);
  }
  login(data: Signup) {
    return this.http.post<any>(this.baseUrl + "Register/authenticate", data);
  }
  signOut() {
    localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
    localStorage.setItem('registerDetails', JSON.stringify(Signup));
  }
  // getCustomer(): any {
  //   const cust = localStorage.getItem('registerDetails');

  //   if (cust) {
  //     return JSON.parse(cust); 

  //   } else {
  //     return null;
  //   }
  // }


  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token)
  }

  getUserNameFromToken() {
    if (this.userPayload)
      return this.userPayload.username;
  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }

  loginDetails(username: string): boolean {
    this.loggedInUser = { username: username };
    return true;
  }



}

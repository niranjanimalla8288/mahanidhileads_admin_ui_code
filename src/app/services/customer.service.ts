import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // public apiurl = "http://localhost:5148/api/Customers";
  public apiurl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.apiurl + "Customers");
  }

  getCustomerById(id: number) {
    return this.http.get(`${this.apiurl + "Customers"}/getCustomerById?Id=${id}`);
  }

  createCustomer(data: Customer) {
    return this.http.post(this.apiurl + "Customers", data);
  }

  updateCustomer(id: number, data: any) {
    // Assuming there is an 'id' property in the Customer object
    return this.http.put(`${this.apiurl + "Customers"}/${id}`, data);
  }

  // deleteCustomer(id: number) {
  //   return this.http.delete(`${this.apiurl}?id=${id}`);
  // }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl + "Customers"} ${id}`);
  }
}

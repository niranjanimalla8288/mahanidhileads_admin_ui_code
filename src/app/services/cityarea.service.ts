import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cityarea } from '../model/cityarea';
import { Observable } from 'rxjs';
import { environment } from '../model/environment';


@Injectable({
  providedIn: 'root'
})
export class CityareaService {
  // public apiurl = "http://localhost:5148/api/Cityareas";
  public apiurl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getCityareas() {
    return this.http.get(this.apiurl + "Cityareas");
  }

  getCityareaById(id: number) {
    return this.http.get(`${this.apiurl + "Cityareas"}/getCityareaById?Id=${id}`);
  }

  createCityarea(data: Cityarea) {
    return this.http.post(this.apiurl + "Cityareas", data);
  }

  updateCityarea(id: number, data: Cityarea): Observable<any> {
    // Assuming there is an 'id' property in the Cityarea object
    return this.http.put(`${this.apiurl + "Cityareas"}/${data.id}`, data);
  }

  deleteCityarea(id: number) {
    return this.http.delete(this.apiurl + "Cityareas" + "/" + id);
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wine } from 'Wine';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  postWine(wine: Wine) {
    return this.http.post<Wine>("http://localhost:5000/wineList/", wine);
  }

  getWine() {
    return this.http.get<Wine>("http://localhost:5000/wineList/");
  }

}

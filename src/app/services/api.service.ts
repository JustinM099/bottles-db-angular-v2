import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wine } from 'Wine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  postWine(wine: Wine) {
    return this.http.post<Wine>("http://localhost:5000/api/bottles", wine);
  }

  getWine(): Observable<any> {
    return this.http.get<Wine[]>("http://localhost:5000/api/bottles");
  }

  putWine(wine: Wine, id: number) {
    return this.http.put<Wine[]>("http://localhost:5000/api/bottles/" + id, wine);
  }

  deleteWine(id: number) {
    return this.http.delete<Wine[]>("http://localhost:5000/api/bottles/"+id);
  }
}

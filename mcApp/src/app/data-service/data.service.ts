import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'https://github.com/Ponsoda/alcoi-m-c-dades/blob/main/associacioSantJordi/revista2015/dades2014.json'; // Replace with your JSON endpoint

  constructor(private http: HttpClient) {} 

//   getJsonData(): Observable<any> {
//     return this.http.get(this.jsonUrl);
//   }
}

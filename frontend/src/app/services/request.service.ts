import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../model/request';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl:string ="http://localhost/backend/request/request.php";


  httpclient = inject(HttpClient);


  getUserRequestsByState(userId: number, state: string): Observable<Request[]> {
    const url = `${this.baseUrl}?userId=${userId}&state=${state}`;
    return this.http.get<Request[]>(url);
  }
  
  checkIfRequestExists(userId: number, annCode: number) {
    return this.httpclient.get(this.baseUrl + "?userId=" + userId + "&annCode=" + annCode);
  }
  public getAnnReqByState (annCod: string , state: string) {
    return this.http.get<any[]>(`${this.baseUrl}?annCod=${annCod}&state=${state}`)
  }

  public getAnnReqByState (annCod: string , state: string) {
  return this.http.get<any[]>(`${this.baseUrl}?annCod=${annCod}&state=${state}`)
  }
 

}  
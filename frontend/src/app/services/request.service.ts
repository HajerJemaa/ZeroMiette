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
    return this.httpclient.get<Request[]>(url);
  }
  
  checkIfRequestExists(userId: number, annCode: number) {
    return this.httpclient.get(this.baseUrl + "?userId=" + userId + "&annCode=" + annCode);
  }
  public getAnnReqByState (annCod: string , state: string) {
    return this.httpclient.get<any[]>(`${this.baseUrl}?annCod=${annCod}&state=${state}`)
  }

  
 

}  
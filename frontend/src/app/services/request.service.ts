import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../model/request';
import { RequestResponse } from '../model/requestResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost/backend/request/request.php';

  http = inject(HttpClient);

  getUserRequestsByState(userId: number, state: string): Observable<Request[]> {
    const url = `${this.baseUrl}?userId=${userId}&state=${state}`;
    return this.http.get<Request[]>(url);
  }
  public getAnnReqByState (annCod: string , state: string) {
    return this.http.get<any[]>(`${this.baseUrl}?annCod=${annCod}&state=${state}`)
  }

  //public getUserRequestsByState(userId: string, state: string): Observable<RequestResponse> {
   // return this.http.get<RequestResponse>(`${this.baseUrl}?userId=${userId}&state=${state}`);}

  public getAnnReqByannCodeAndState(annCod: string, state: string): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}?annCod=${annCod}&state=${state}`);
  }

  acceptOrRefuseRequest(annCode: string, userId: number, state: 'accept' | 'refuse'): Observable<any> {
    return this.http.get<any>(`${this.baseUrl }?annCode=${annCode}&userId=${userId}&state=${state}`);
  }
  
}

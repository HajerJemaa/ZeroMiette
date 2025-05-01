import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Request } from '../model/request';
import { RequestResponse } from '../model/requestResponse';
import { Observable } from 'rxjs';

=======
import {Result} from '../model/result'
//import {}
>>>>>>> b3b1eb44337571faee42ca9e38faf60f1ec69209
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl:string ="http://localhost/backend/request/request.php";
                   

  httpclient = inject(HttpClient);


  getUserRequestsByState(userId: number, state: string) {
    return this.httpclient.get<Result>(`${this.baseUrl}?userId=${userId}&state=${state}`); 
  }
  addRequest(annCode: string, userId: number, description: string){
    const body = { annCode, userId, description };
    return this.httpclient.post<{ message: string; data?: Request }>(this.baseUrl, body);
  }
  
  checkIfRequestExists(userId: number, annCode: string) {
     return this.httpclient.get<boolean>(this.baseUrl + "?userId=" + userId + "&annCode=" + annCode);
  }
  public getAnnReqByState (annCod: string , state: string) {
    return this.httpclient.get<Result>(`${this.baseUrl}?annCod=${annCod}&state=${state}`)
  }

<<<<<<< HEAD
  //public getUserRequestsByState(userId: string, state: string): Observable<RequestResponse> {
   // return this.http.get<RequestResponse>(`${this.baseUrl}?userId=${userId}&state=${state}`);}

  public getAnnReqByannCodeAndState(annCod: string, state: string): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}?annCod=${annCod}&state=${state}`);
  }

  acceptOrRefuseRequest(annCode: string, userId: number, state: 'accept' | 'refuse'): Observable<any> {
    return this.http.get<any>(`${this.baseUrl }?annCode=${annCode}&userId=${userId}&state=${state}`);
  }
  
}
=======
  
 

}  
>>>>>>> b3b1eb44337571faee42ca9e38faf60f1ec69209

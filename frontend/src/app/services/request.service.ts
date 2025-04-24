import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Result} from '../model/result'
//import {}
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

  
 

}  
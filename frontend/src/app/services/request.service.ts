import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../model/request';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl:string ="http://localhost/backend/request/request.php";
                   

  httpclient = inject(HttpClient);


  getUserRequestsByState(userId: number, state: string) {
    const url = `${this.baseUrl}?userId=${userId}&state=${state}`;
    console.log("📡 Requête envoyée à :", url);
    return this.httpclient.get<any>(url); 

  }
  addRequest(annCode: string, userId: number, description: string){
  
    const body = { annCode, userId, description };
    return this.httpclient.post<{ message: string; data?: Request }>(this.baseUrl, body);
  }
  
  checkIfRequestExists(userId: string, annCode: number) {
    return this.httpclient.get(this.baseUrl + "?userId=" + userId + "&annCode=" + annCode);
  }
  public getAnnReqByState (annCod: string , state: string) {
    return this.httpclient.get<any[]>(`${this.baseUrl}?annCod=${annCod}&state=${state}`)
  }

  
 

}  
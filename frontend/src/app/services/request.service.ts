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
    return this.httpclient.get(this.baseUrl + "?userId=" + userId + "&state=" + state);
  }
  
  checkIfRequestExists(userId: number, annCode: number) {
    return this.httpclient.get(this.baseUrl + "?userId=" + userId + "&annCode=" + annCode);
  }
  addRequest(req: Request) {
    return this.httpclient.post(this.baseUrl, req);
  }

}  
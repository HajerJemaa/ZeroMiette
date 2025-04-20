import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  api:string="http://localhost/backend/announcement/announcement.php";
  
    httpclient = inject(HttpClient);


    getAnnByState(state:String){
      return this.httpclient.get<any[]>(this.api+"?state="+state);
    }

    getAnnByDonorId(donId: string) {
      return this.httpclient.get<any[]>(`${this.api}?donId=${donId}`);
    }

    
   
    
    



}

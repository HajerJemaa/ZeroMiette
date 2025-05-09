import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from '../model/announcement';
import { Observable } from 'rxjs';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  api:string="http://localhost/backend/announcement/announcement.php";
  
    httpclient = inject(HttpClient);

    getAnnByState(state:string){
      return this.httpclient.get<Result>(this.api+"?state="+state);
    }

    getAnnByDonorId(donId: number) {
      return 0
    }

    getAnnByDonorIdAndState(donId:number, state:String) {
      return this.httpclient.get<any[]>(`${this.api}?donId=${donId}&state=${state}`);

    }
    createAnnouncement(data:any){
      return this.httpclient.post(this.api, data);
    }
    updateAnnouncement(data:any){
      return this.httpclient.post(this.api+"?update=true", data);
    }

    deleteAnnouncement(code:string){
      return this.httpclient.delete<any>(`${this.api}?annCode=${code}`);
    }
    getOneAnnouncement(code:string){
      return this.httpclient.get<Result>(`${this.api}?annCode=${code}`);
    }
}

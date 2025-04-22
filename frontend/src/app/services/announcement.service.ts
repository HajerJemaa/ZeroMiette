import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from '../model/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  api:string="http://localhost/backend/announcement/announcement.php";
  
    httpclient = inject(HttpClient);

    GetAnnByState(state:String){
      //if(id==undefined)
      return this.httpclient.get<Announcement[]>(this.api+"?state="+state);
    //else
     //return this.httpclient.get<any[]>(this.api+"?state="+state+"&donId="+id);
    }

}

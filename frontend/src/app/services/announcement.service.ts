import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from '../model/announcement';
<<<<<<< HEAD
import { Observable } from 'rxjs';
=======
import { Result } from '../model/result';
>>>>>>> b3b1eb44337571faee42ca9e38faf60f1ec69209

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  api:string="http://localhost/backend/announcement/announcement.php";
  
    httpclient = inject(HttpClient);

    getAnnByState(state:string){
      //if(id==undefined)
      return this.httpclient.get<Result>(this.api+"?state="+state);
    //else
     //return this.httpclient.get<any[]>(this.api+"?state="+state+"&donId="+id);
    }

    getAnnByDonorId(donId: number) {
      return 0
    }

    getAnnByDonorIdAndState(donId:number, state:String) {
      return this.httpclient.get<any[]>(`${this.api}?donId=${donId}&state=${state}`);

    }
    createAnnouncement(data: { title: string, content: string, deadline: string, quantity: string, category: string, img?: string | null }): Observable<{ message: string }> {
      return this.httpclient.post<{ message: string }>(`${this.api}createAnnouncement.php`, data);
    }
  
    updateAnnouncement(data: { annCode: string, title: string, content: string, deadline: string, quantity: string, category: string, img?: string | null }): Observable<{ message: string }> {
      return this.httpclient.put<{ message: string }>(`${this.api}updateAnnouncement.php`, data);
    }
  
    deleteAnnouncement(data: { annCode: string }): Observable<{ message: string }> {
      return this.httpclient.delete<{ message: string }>(`${this.api}deleteAnnouncement.php`, { body: data });
    }

    deleteAnnouncement(code:string){
      return this.httpclient.delete<any>(`${this.api}?annCode=${code}`);
    }
}

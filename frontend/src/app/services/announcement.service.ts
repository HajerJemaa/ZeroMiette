import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from '../model/announcement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  api:string="http://localhost/backend/announcement/announcement.php";
  
    httpclient = inject(HttpClient);


    getAnnByState(state:String){
      return this.httpclient.get<any[]>(this.api+"?state="+state);
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

    
   
    
    



}

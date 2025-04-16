import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { AnnouncementService } from '../services/announcement.service';
import {Announcement} from'../model/announcement'
@Component({
  selector: 'app-get-ann-by-state',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './get-ann-by-state.component.html',
  styleUrl: './get-ann-by-state.component.css'
})
export class GetAnnByStateComponent {
   announcement: Announcement[] = [];
   errorMessage: string = '';
  
    constructor(private announcementService: AnnouncementService) {}
  
    GetAnnByState(state: string): void {
      this.errorMessage='';
      this.announcementService.GetAnnByState(state).subscribe({
        next: (response : any) => {
          if (response.message === 'success'&& response.data.length > 0) {
            this.announcement = response.data;
          } else {
            this.announcement = [];
            this.errorMessage = "Aucune demande trouvée.";
          }
        },
        error: (err) => {console.log(err);
          this.errorMessage = "Erreur lors du chargement des annonces.";
          this.announcement = [];
        }
      
      });
    }
  

}

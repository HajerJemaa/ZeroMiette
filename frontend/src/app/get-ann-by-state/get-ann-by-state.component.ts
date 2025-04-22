import { Component,Input,OnInit} from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { AnnouncementService } from '../services/announcement.service';
import {Announcement} from'../model/announcement'
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-get-ann-by-state',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './get-ann-by-state.component.html',
  styleUrl: './get-ann-by-state.component.css'
})
export class GetAnnByStateComponent {
  @Input()  id:number=0; 
   announcement: Announcement[] = [];
   usernames: { [key: number]: string } = {}; // clé = donId, valeur = user_name
   selectedAnnCode: number | null = null;

   errorMessage: string = '';
  
    constructor(private announcementService: AnnouncementService,
      private userService:UsersService
    ) {}
    ngOnInit(): void {
      this.getAnnByState('available'); // Appel automatique au chargement
    }
  
    getAnnByState(state: string): void {
      this.errorMessage='';
      this.announcementService.GetAnnByState(state).subscribe({
        next: (response : any) => {
          if (response.message === 'success'&& response.data.length > 0) {
            this.announcement = response.data;
            // pour chaque annonce, on récupère le user_name
            this.announcement.forEach(ann => {
              this.userService.getOneUser(ann.donId).subscribe({
                next: (res) => {
                  this.usernames[ann.donId] = res.data!.user_name!;
               },
               error: () => {
                this.usernames[ann.donId] = 'Utilisateur inconnu';
               }
             });
          });
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

import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Request } from '../model/request';
import { UsersService } from '../services/users.service';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from '../model/announcement';


@Component({
  selector: 'app-get-user-requests-by-state',
  imports: [],
  templateUrl: './get-user-requests-by-state.component.html',
  styleUrl: './get-user-requests-by-state.component.css'
})
export class GetUserRequestsByStateComponent{
  requests: Request[] = [];
  userId!: number;
  errorMessage: string = '';
  annonces: { [key: string]: Announcement } = {};
  isvisible: { [annCode: string]: boolean | null } = {};

  constructor(
    private requestService: RequestService,
    private usersService:UsersService,
    private announcementService:AnnouncementService) {}
  ngOnInit(){
    this.userId=this.usersService.getCurrentUserId();
  }
  getUserRequestsByState(state: string): void {
    this.errorMessage='';
    this.requestService.getUserRequestsByState(this.userId, state).subscribe({
      next: (response) => {
        console.log("Données des demandes :", response.data);

        if (response.message== 'success') {
          this.requests = response.data as Request[];
          // pour chaque request, on récupère le user_name
          this.requests.forEach(req => {
              //this.isvisible[req.annCode]=null;
              console.log("annCode pour la demande :", req.annCode);

              this.announcementService.getOneAnnouncement(req.annCode).subscribe({
                next: (res) => {
                  console.log("Annonce reçue :", res.data);

                  this.annonces[req.annCode] = (res.data as Announcement);
                },
                error: () => {
                  console.log("erreur lors du chargement de l'annonce")
                }
          })
        });
        } else {
          this.errorMessage = "Aucune demande trouvée.";
        }
      },
      error: (err) => {
        this.errorMessage = "Erreur lors du chargement des demandes.";
      }
    
    });
  }
  deleteRequest(annCode: string){
    this.requestService.deleteRequest(this.userId, annCode).subscribe({
    next: (res) => {
      console.log('Demande supprimée', res.data);

    },
    error: (err) => {
      this.errorMessage='Erreur de suppression';
    }
    })
}
}

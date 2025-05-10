import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Request } from '../model/request';
import { UsersService } from '../services/users.service';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from '../model/announcement';
import { UpdateRequestComponent } from '../update-request/update-request.component'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-user-requests-by-state',
  imports: [],
  templateUrl: './get-user-requests-by-state.component.html',
  styleUrl: './get-user-requests-by-state.component.css'
})
export class GetUserRequestsByStateComponent implements OnInit {
  requests: Request[] = [];
  userId!: number;
  errorMessage: string = '';
  annonces: { [key: string]: Announcement } = {};
  isvisible: { [annCode: string]: boolean | null } = {};
  selectedState!: string;
  editMode: { [key: string]: boolean } = {}; // pour suivre les requêtes en modification

  constructor(
    private requestService: RequestService,
    private usersService:UsersService,
    private announcementService:AnnouncementService) {}
  ngOnInit(){
    this.userId=this.usersService.getCurrentUserId();
  }
  getUserRequestsByState(state: string): void {
      this.selectedState = state;        

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
                  //console.log("Annonce reçue :", (res.data as Announcement).title);
                   console.log("response    ........................... "+response.data);
                  this.annonces[req.annCode] = (res.data as Announcement);
                  console.log("annonce    ........................... "+this.annonces[req.annCode]);
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
      this.getUserRequestsByState(this.selectedState)

    },
    error: (err) => {
      this.errorMessage='Erreur de suppression';
    }
    })
}
selectedRequest: any = null;

editRequest(req: any) {
  this.selectedRequest = { ...req }; // on clone pour éviter les modifs directes
}

cancelUpdate() {
  this.selectedRequest = null;
}

submitUpdate() {
  if (!this.selectedRequest) return;

  this.requestService.updateRequest({
    annCode: this.selectedRequest.annCode,
    userId: this.userId,
    description: this.selectedRequest.description,
    quantity: this.selectedRequest.quantity
  }).subscribe({
    next: () => {
      this.selectedRequest = null;
      this.getUserRequestsByState('pending'); // ou l’état actif
    },
    error: (err) => {
      console.error("Erreur lors de l'update", err);
    }
  });
}



}

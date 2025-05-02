import { Component,Input,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnouncementService } from '../services/announcement.service';
import {Announcement} from'../model/announcement'
import { UsersService } from '../services/users.service';
import { RequestService } from '../services/request.service';
import { User } from '../model/user';

@Component({
  selector: 'app-get-ann-by-state',
  imports: [RouterOutlet],
  templateUrl: './get-ann-by-state.component.html',
  styleUrl: './get-ann-by-state.component.css'
})

export class GetAnnByStateComponent implements OnInit {
   id:number=3; 
   announcement: Announcement[] = [];
   usernames: { [key: number]: string } = {}; // clé = donId, valeur = user_name
   description!:string ;
   quantity!:number;
   isvisible: { [annCode: string]: boolean | null } = {};

  errorMessage!:string;
  
  constructor(
    private announcementService: AnnouncementService,
    private userService: UsersService,
    private requestService: RequestService
  ) {}
  ngOnInit(): void {
    this.getAnnByState('available'); // Appel automatique au chargement
   // this.id=this.userService.getCurrentUserId();
  }
  getAnnByState(state: string): void {
    
    this.errorMessage='';
    this.announcementService.getAnnByState(state).subscribe({
      next: (response) => {
        if (response.message === 'success'&& (response.data as Announcement[]).length > 0) {
          this.announcement = response.data as Announcement[];
          // pour chaque annonce, on récupère le user_name
          this.announcement.forEach(ann => {
            this.isvisible[ann.annCode]=null;
            this.userService.getOneUser(ann.donId).subscribe({
              next: (res) => {
                this.usernames[ann.donId] = (res.data as User).user_name;
              },
              error: () => {
              this.usernames[ann.donId] = 'Utilisateur inconnu';
              }
            });
        });
        } else {
          this.errorMessage = "Aucune annonce trouvée.";
        }
      },
      error: () => {
        this.errorMessage = "Erreur lors du chargement des annonces.";
      }
    
    });
  }
  checkDemandeur(code :string){
    this.requestService.checkIfRequestExists(this.id, code).subscribe({
      next: (exists: boolean)=>{
        this.isvisible[code] = !exists;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la vérification de la demande.';
      }

    });

  }
  addRequest(code :string){
    this.requestService.addRequest( code , this.id, this.description, this.quantity).subscribe({
      next: (res ) => {

        if (res.message == 'success') {
          console.log('Demande ajoutée avec succès', res.data);
          this.isvisible[code] = null; // Pour ne plus afficher le champ après l'ajout

        }
      },
      error: (err) => {
        this.errorMessage = 'Erreur de requête';
        console.error(err);
      }
    });

  } 
}




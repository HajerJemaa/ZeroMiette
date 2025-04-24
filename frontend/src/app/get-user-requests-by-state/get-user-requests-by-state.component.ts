import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Request } from '../model/request';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-get-user-requests-by-state',
  imports: [],
  templateUrl: './get-user-requests-by-state.component.html',
  styleUrl: './get-user-requests-by-state.component.css'
})
export class GetUserRequestsByStateComponent{
  requests: Request[] = [];
  userId: number=3;
  errorMessage: string = '';
  
  constructor(private requestService: RequestService,private usersService:UsersService) {}
  /*ngOnInit(){
    this.userId=this.usersService.getCurrentUserId();
  }*/
  getUserRequestsByState(state: string): void {
    this.errorMessage='';
    this.requestService.getUserRequestsByState(this.userId, state).subscribe({
      next: (response :any ) => {
        console.log("Réponse:", response);
        if (response.message== 'success') {
          this.requests = response.data;
        } else {
          this.errorMessage = "Aucune demande trouvée.";
        }
      },
      error: (err) => {
        this.errorMessage = "Erreur lors du chargement des demandes.";
      }
    
    });
  }
}

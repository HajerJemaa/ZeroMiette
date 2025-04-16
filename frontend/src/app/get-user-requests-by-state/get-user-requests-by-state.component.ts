import { Component } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Request } from '../model/request';
@Component({
  selector: 'app-get-user-requests-by-state',
  imports: [],
  templateUrl: './get-user-requests-by-state.component.html',
  styleUrl: './get-user-requests-by-state.component.css'
})
export class GetUserRequestsByStateComponent {
  requests: Request[] = [];
  userId: number = 3;
  errorMessage: string = '';

  constructor(private requestService: RequestService) {}

  getUserRequestsByState(state: string): void {
    this.errorMessage='';
    this.requestService.getUserRequestsByState(this.userId, state).subscribe({
      next: (response : any) => {
        if (response.message === 'success'&& response.data.length > 0) {
          this.requests = response.data;
        } else {
          this.requests = [];
          this.errorMessage = "Aucune demande trouvée.";
        }
      },
      error: (err) => {
        this.errorMessage = "Erreur lors du chargement des demandes.";
        this.requests = [];
        

      }
    
    });
  }


}

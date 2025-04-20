import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'app-get-announcement-requests',
  imports: [],
  templateUrl: './get-announcement-requests.component.html',
  styleUrl: './get-announcement-requests.component.css'
})
export class GetAnnouncementRequestsComponent implements OnInit  {
  requests: Request[] = [];
  errorMessage: string = '';
  currentState: string = 'pending'; 
  annCode: string = '';
  donId: string = '';

  constructor(private requestService : RequestService, announcementService: AnnouncementService){}
  ngOnInit(): void {
    this.annCode = localStorage.getItem('annCode') || '';
    this.donId = localStorage.getItem('donId') || '';

    this.getRequestsByState(this.currentState); 
  }
  getRequestsByState(state: string): void {
    this.currentState = state;
    this.errorMessage = '';

    this.announcementService.getRequests(this.annCode, state).subscribe({
      next: (response: any) => {
        if (response.message === 'success') {
          this.requests = response.data;
        } else {
          this.requests = [];
          this.errorMessage = 'Aucune demande trouvée.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des demandes.';
        this.requests = [];
      }
    });
  }




}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAnnByStateComponent } from '../get-ann-by-state/get-ann-by-state.component';
import { GetUserRequestsByStateComponent } from '../get-user-requests-by-state/get-user-requests-by-state.component';
import { UpdateUserComponent } from "../update-user/update-user.component";

@Component({
  selector: 'app-dashbord-demandeur',
  standalone: true,
  imports: [CommonModule, GetAnnByStateComponent, GetUserRequestsByStateComponent, UpdateUserComponent],
  templateUrl: './dashbord-demandeur.component.html',
  styleUrl: './dashbord-demandeur.component.css'
})
export class DashbordDemandeurComponent {
  activeTab: string = 'home';

  setTab(tab: string) {
    this.activeTab = tab;
  }

}

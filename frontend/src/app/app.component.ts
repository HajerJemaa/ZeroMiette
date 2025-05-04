import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';
import { UsersService } from './services/users.service';
import { AdministratorComponent } from "./administrator/administrator.component";
import { DonorDashboardComponent } from "./donor-dashboard/donor-dashboard.component";
import { DashbordDemandeurComponent } from "./dashbord-demandeur/dashbord-demandeur.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AdministratorComponent, DonorDashboardComponent, DashbordDemandeurComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  state: boolean = false;
  role?: string;
  as = inject(AuthenticateService);
  us = inject(UsersService);
  title='ZeroMiette'
  ngOnInit() {
    this.state = this.as.isSignedIn();
    if (this.state){
      this.role=this.us.getCurrentUserRole();
    }
  }

}
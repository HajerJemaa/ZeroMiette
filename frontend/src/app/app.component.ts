import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  state: boolean = false;
  role: string = '';
  isSidebarOpen: boolean = false;
  title = 'ZeroMiette';
  as = inject(AuthenticateService);
  us = inject(UsersService);

  ngOnInit() {
    this.state = this.as.isSignedIn();
    if (this.state) {
      this.role = this.us.getCurrentUserRole() || '';
    }
  }

}
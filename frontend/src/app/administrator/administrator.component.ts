import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-administrator',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css'
})
export class AdministratorComponent {
  state: boolean = false;
  as = inject(AuthenticateService);
  ngOnInit() {
    this.state = this.as.isSignedIn();
  }
}

import { Component, inject } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticateService } from './services/authenticate.service';
import { UsersService } from './services/users.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  state!:boolean;
  role:string|undefined;
  title = 'ZeroMiette';
  as = inject(AuthenticateService);
  us = inject(UsersService);
  ngOnInit(){
    this.state=this.as.isSignedIn()
    if (this.state){
      this.role = this.us.getCurrentUserRole();
    }
  }
  
}

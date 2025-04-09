import { Component } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-create-account',
  imports: [],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  data!:User;
  
}

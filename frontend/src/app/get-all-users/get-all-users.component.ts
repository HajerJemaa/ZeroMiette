import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-all-users',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './get-all-users.component.html',
  styleUrl: './get-all-users.component.css'
})
export class GetAllUsersComponent implements OnInit{
  users:User[]|undefined;
  constructor(public us:UsersService,private route:ActivatedRoute){}
  ngOnInit(): void {
    const state=this.route.snapshot.paramMap.get('state')!;
    this.us.getAllUsers(state).subscribe({
      next: (data)=>this.users=data,
      error: (error)=>{alert("Api Error")}
    })
  }
}

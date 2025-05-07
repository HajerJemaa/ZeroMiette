import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-all-users',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './get-all-users.component.html',
  styleUrl: './get-all-users.component.css'
})
export class GetAllUsersComponent implements OnInit,OnDestroy{

  users:User[]|undefined|null;
  state!:string;
  routeSub!:Subscription

  constructor(public us:UsersService,private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.routeSub=this.route.paramMap.subscribe(
      parameter=>{
        this.state=parameter.get('state')!;
        this.getUser(this.state);
      }
    );
  }
  getUser(state:string){
    this.us.getAllUsers(state).subscribe({
      next: (res)=>this.users=res.data as User[],
      error: (error)=>alert("Api Error")
    });
  };
  
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}

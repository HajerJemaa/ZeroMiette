import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl,FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-authenticate',
  imports: [ReactiveFormsModule],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {
  action!:string;
  user:User|undefined;

  constructor (public as:AuthenticateService,public us:UsersService,private router:Router,private r:ActivatedRoute){}


  error:string | null | undefined;
  

  signInForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  ngOnInit(){
    this.action=this.r.snapshot.paramMap.get("action")!;
    if (this.action=="SignOut"){
      this.us.getOneUser(this.us.getCurrentUserId()).subscribe({
        next: (res)=>this.user=res.data!,
        error: (err)=>{this.error=err}
      });
    }
  }

  signIn(){
    this.as.signIn({email:this.signInForm.value.email!,password:this.signInForm.value.password!}).subscribe({
      next: (res)=>{
        if(res.role=="donor"){
          this.router.navigate(['/Donor']);
        }else if (res.role=="reciever"){
          this.router.navigate(['/Reciever']);
        }else if (res.role=="administrator"){
          this.router.navigate(['/Administrator']);
        }
      },
      error:(err)=>this.error ="Invalid email or password" 
    });
  }

  SignOut(){
    this.as.signOut();
  }
}

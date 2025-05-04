import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl,FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-authenticate',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {
  action!:string;
  user:User|undefined;
  error:string | null | undefined;
  formValidated: boolean = false;
  signInForm= new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      rememberMe:new FormControl(false)
  })
  constructor (public as:AuthenticateService,public us:UsersService,private router:Router,private r:ActivatedRoute){}

  
  ngOnInit(){
    this.action=this.r.snapshot.paramMap.get("action")!;
    if (this.action=="SignOut"){
      this.us.getOneUser(this.us.getCurrentUserId()).subscribe({
        next: (res)=>this.user=res.data as User,
        error: (err)=>alert(err)
      });
    }
  }

  signIn(){
    this.formValidated = true;
    this.error=null;

    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    
    this.as.signIn({email:this.signInForm.value.email!,password:this.signInForm.value.password!}).subscribe({
      next: (res)=>{
        if (res.error){
          this.error=res.error;
        }else{
          if(res.user.role=="donor"){
            this.router.navigate(['/donor-dashboard']).then(() => {
              window.location.reload();
            });
          }else if (res.user.role=="reciever"){
            this.router.navigate(['/app-dashbord-demandeur']).then(() => {
              window.location.reload();
            });
          }else if (res.user.role=="administrator"){
            this.router.navigate(['/Administrator/ProcessAccount/getAllUsers/accepted']).then(() => {
              window.location.reload();
            });
          }
        }
      },
      error:(err)=>this.error=err
    });
  }
  

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }

  SignOut(){
    this.as.signOut();
  }
}

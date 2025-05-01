
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  error?:string;
  file!:File;
  signUpForm= new FormGroup({
    ln: new FormControl('',Validators.required),
    fn: new FormControl('',Validators.required),
    mai: new FormControl('',[Validators.required,Validators.email]),
    region: new FormControl('',Validators.required),
    add: new FormControl('',Validators.required),
    num: new FormControl('',[Validators.required,Validators.pattern('[1-9]{1}[0-9]{7}')]),
    rad: new FormControl('',Validators.required),
    desc: new FormControl(''),
  })
   getFile(event:Event){
    const inputFile=event.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0){
      this.file=inputFile.files[0];
    }
   }

  constructor(private us:UsersService,private route:Router){}

  signUp(){
    if (this.signUpForm.invalid){
      this.signUpForm.markAllAsTouched();
      return;
    }
    const user= new FormData();
    user.append('ln', this.signUpForm.value.ln!);
    user.append('fn', this.signUpForm.value.fn!);
    user.append('mai', this.signUpForm.value.mai!);
    user.append('region', this.signUpForm.value.region!);
    user.append('add', this.signUpForm.value.add!);
    user.append('num', this.signUpForm.value.num!);
    user.append('rad', this.signUpForm.value.rad!);
    if (this.signUpForm.value.desc!=null && this.signUpForm.value.desc!=undefined){
      user.append('desc', this.signUpForm.value.desc);
    }
    user.append('proof',this.file);

    this.us.addUser(user).subscribe({
      next: (mess)=>{
        if (mess.message!="success"){
          this.error=mess.message;
        }else{
          this.error="Would you please wait till your account creation get accepted by the admin";
        }
      },
      error:(err)=>this.error="Api ERROR!!"
    })
  }

  signUpAgain(){
    this.route.navigate(["/User/SignUp"]).then(() => {
      window.location.reload();
    });
  }

  redir(){
    this.route.navigate(["/"]);
  }
}


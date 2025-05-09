
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  error:string|null|undefined;
  mess:string|null|undefined;
  file!:File;
  formValidated:boolean=false;
  signUpForm!: FormGroup;
  
   getFile(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.file = file; 
    this.signUpForm.get('proof')?.setValue(file); // Update form control
  }
}

  constructor(private us:UsersService, private route:Router, private fb: FormBuilder){
    this.signUpForm= this.fb.group({
      ln: ['',[Validators.required,Validators.minLength(2)]],
      fn: ['',[Validators.required,Validators.minLength(2)]],
      mai: ['',[Validators.required,Validators.email]],
      region: ['',Validators.required],
      add: ['',Validators.required],
      num: ['',[Validators.required,Validators.pattern(/^(2|4|5|9)\d{7}$/)]],
      rad: ['',Validators.required],
      desc: [''],
      proof: [null, Validators.required]
    })
  }

  
  signUp(){
    this.formValidated = true;

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.error = null;

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
      next: (res)=>{
        if (res.message!="success"){
          this.error=res.message;
        }else{
          this.mess="Would you please wait till your account creation get accepted by the admin";
        }
      },
      error:(err)=>this.error="Api ERROR!! : "+err
    })
  }


  get lastName() { return this.signUpForm.get('ln'); }
  get firstName() { return this.signUpForm.get('fn'); }
  get email() { return this.signUpForm.get('mai'); }
  get region() { return this.signUpForm.get('region'); }
  get address() { return this.signUpForm.get('add'); }
  get number() { return this.signUpForm.get('num'); }
  get role() { return this.signUpForm.get('rad'); }
  get proof() { return this.signUpForm.get('proof'); }
}


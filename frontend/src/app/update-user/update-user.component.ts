import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service'; 
import { AuthenticateService } from '../services/authenticate.service'; // Adjust path
import { User } from '../model/user';
  

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  userDataForm: FormGroup;
  passwordForm: FormGroup;
  proofForm: FormGroup;
  loading: { user: boolean; password: boolean; proof: boolean } = { user: false, password: false, proof: false };
  error: { user: string | null; password: string | null; proof: string | null } = { user: null, password: null, proof: null };
  formValidated: { user: boolean; password: boolean; proof: boolean } = { user: false, password: false, proof: false };
  userData: { fn : string | null,ln : string | null,un : string | null,mai : string | null,num : string | null,region : string | null,add : string | null } = { fn : null,ln : null ,un : null,mai : null,num : null,region : null,add : null };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private us: UsersService,
    private as: AuthenticateService
  ) {
    this.userDataForm = this.fb.group({
      fn: ['', Validators.minLength(2)],
      ln: ['', Validators.minLength(2)],
      un: ['', Validators.minLength(3)],
      mai:['', Validators.email],
      num: ['', Validators.pattern(/^(2|4|5|9)\d{7}$/)],
      region: [''],
      add: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.proofForm = this.fb.group({
      proof: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.us.getOneUser(this.us.getCurrentUserId()).subscribe({
      next: (res)=>{
        if(res.message=="success"){
          this.userData["fn"]=(res.data as User).first_name;
          this.userData["ln"]=(res.data as User).last_name;
          this.userData["un"]=(res.data as User).user_name;
          this.userData["mai"]=(res.data as User).email;
          this.userData["num"]=(res.data as User).number;
          this.userData["region"]=(res.data as User).region;
          this.userData["add"]=(res.data as User).address;
          this.userDataForm.patchValue(this.userData);
        }else{
          alert(res.message+" to get user!!");
        }
              },
      error: (err)=> alert("Api Error: "+err+"!!")
    });
  }

  // Custom validator for password matching
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmitUser(): void {
    this.formValidated.user = true;
    if (this.userDataForm.invalid) {
      this.userDataForm.markAllAsTouched();
      return;
    }
    this.loading.user = true;
    this.error.user = null;

    const formData = this.userDataForm.value;
      this.loading.user = false;
      this.us.updateUser({userId : this.us.getCurrentUserId(), fn: formData.fn ,ln: formData.ln,mai : formData.mai,un : formData.un,num : formData.num,add : formData.add,region : formData.region}).subscribe({
        next: () => {
          this.error.user = 'Profile updated successfully.';
          setTimeout(() => this.router.navigate(['/User/Profile']), 4000); 
        },
        error: (error) => {
          this.error.user = error.message || 'An error occurred. Please try again.';
        }
      });
  }

  onSubmitPassword(): void {
    this.formValidated.password = true;
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.loading.password = true;
    this.error.password = null;

    const formData = this.passwordForm.value;
    console.log('Change password attempt:', formData);
    formData['userId'] = this.us.getCurrentUserId(); // Add userId to formData
    this.loading.password = false;
    if (this.as.passwordVerif({ userId : this.us.getCurrentUserId(), pwd : formData.password })) { 
      this.error.password = 'Current password is incorrect.';
    } else {
      this.us.changePassword({ userId : this.us.getCurrentUserId(), pwd : formData.newPassword }).subscribe({
        next: () => {
          this.error.password = 'Password changed successfully.';
          setTimeout(() => this.passwordForm.reset(), 2000); // Reset after 2s
        },
        error: (error) => {
          this.error.password = error.message || 'An error occurred. Please try again.';
        }
      });
    }
  
  }

  onSubmitProof(): void {
    this.formValidated.proof = true;
    if (this.proofForm.invalid) {
      return;
    }
    this.loading.proof = true;
    this.error.proof = null;

    const formData = new FormData();    
    formData.append('userId', String(this.us.getCurrentUserId()));
    formData.append('proof', this.proofForm.get('proof')?.value);

    console.log('Update proof attempt:', formData);
      this.loading.proof = false;
      this.us.updateProof(formData).subscribe({
        next: () => {
          this.error.proof = 'Proof updated successfully.';
          setTimeout(() => this.proofForm.reset(), 4000);
        },
        error: (error) => {
          this.error.proof = error.message || 'An error occurred. Please try again.';
        }
      });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.proofForm.get('proof')?.setValue(file);
    }
  }

  get firstName() { return this.userDataForm.get('fn'); }
  get lastName() { return this.userDataForm.get('ln'); }
  get username() { return this.userDataForm.get('un'); }
  get number() { return this.userDataForm.get('num'); }
  get region() { return this.userDataForm.get('region'); }
  get address() { return this.userDataForm.get('add'); }
  get email() { return this.userDataForm.get('mai')}
  get currentPassword() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
  get proof() { return this.proofForm.get('proof'); }

}

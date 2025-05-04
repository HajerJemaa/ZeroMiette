import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service'; // Adjust path
import { AuthenticateService } from '../services/authenticate.service'; // Adjust path
import { User } from '../model/user';
  

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  userDataForm: FormGroup;
  passwordForm: FormGroup;
  proofForm: FormGroup;
  loading: { user: boolean; password: boolean; proof: boolean } = { user: false, password: false, proof: false };
  error: { user: string | null; password: string | null; proof: string | null } = { user: null, password: null, proof: null };
  formValidated: { user: boolean; password: boolean; proof: boolean } = { user: false, password: false, proof: false };
  userData: any = { firstName: '', lastName: '', username: '', number: '', region: '', address: '' };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private as: AuthenticateService
  ) {
    this.userDataForm = this.fb.group({
      fn: ['', [Validators.required, Validators.minLength(2)]],
      ln: ['', [Validators.required, Validators.minLength(2)]],
      un: ['', [Validators.required, Validators.minLength(3)]],
      mai:['',Validators.email],
      num: ['', [Validators.required, Validators.pattern(/^(2|4|5|9)\d{7}$/)]],
      region: ['', Validators.required],
      add: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.proofForm = this.fb.group({
      proof: [null, Validators.required]
    });
    this.loadUserData();
  }

  // Custom validator for password matching
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  loadUserData(): void {
    this.usersService.getOneUser(this.usersService.getCurrentUserId()).subscribe({
      next: (res)=>{
        if(res.message=="success"){
          this.userData=res.data as User;
        }else{
          alert(res.message+" to get user!!");
        }
              },
      error: (err)=> alert("Api Error: "+err+"!!")
    });
    this.userDataForm.patchValue(this.userData);
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
    console.log('Update user attempt:', formData);

    // Simulate an API call
    setTimeout(() => {
      this.loading.user = false;
      this.usersService.updateUser(formData).subscribe({
        next: () => {
          this.error.user = 'Profile updated successfully.';
          setTimeout(() => this.router.navigate(['/User/Profile']), 2000); // Redirect after 2s
        },
        error: (error) => {
          this.error.user = error.message || 'An error occurred. Please try again.';
        }
      });
    }, 1000);
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

    // Simulate an API call
    setTimeout(() => {
      this.loading.password = false;
      if (formData.currentPassword !== 'oldpassword123') { // Mock current password check
        this.error.password = 'Current password is incorrect.';
      } else {
        this.as.changePassword(formData.newPassword).subscribe({
          next: () => {
            this.error.password = 'Password changed successfully.';
            setTimeout(() => this.passwordForm.reset(), 2000); // Reset after 2s
          },
          error: (error) => {
            this.error.password = error.message || 'An error occurred. Please try again.';
          }
        });
      }
    }, 1000);
  }

  onSubmitProof(): void {
    this.formValidated.proof = true;
    if (this.proofForm.invalid) {
      return;
    }
    this.loading.proof = true;
    this.error.proof = null;

    const formData = new FormData();
    formData.append('proof', this.proofForm.get('proof')?.value);

    console.log('Update proof attempt:', formData);

    // Simulate an API call
    setTimeout(() => {
      this.loading.proof = false;
      this.usersService.updateProof(formData).subscribe({
        next: () => {
          this.error.proof = 'Proof updated successfully.';
          setTimeout(() => this.proofForm.reset(), 2000); // Reset after 2s
        },
        error: (error) => {
          this.error.proof = error.message || 'An error occurred. Please try again.';
        }
      });
    }, 1000);
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
  get currentPassword() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
  get proof() { return this.proofForm.get('proof'); }

}

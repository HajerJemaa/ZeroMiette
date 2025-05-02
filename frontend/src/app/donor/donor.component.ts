import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-donor',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterLink],
  templateUrl: './donor.component.html',
  styleUrl: './donor.component.css'
})

export class DonorComponent {
 
  userDataForm: FormGroup;
  passwordForm: FormGroup;
  proofForm: FormGroup;
  loading: { user: boolean; password: boolean; proof: boolean } = { user: false, password: false, proof: false };
  errorMessage: { user: string | null; password: string | null; proof: string | null } = { user: null, password: null, proof: null };
  formValidated: { user: boolean; password: boolean; proof: boolean } = { user: false, password: false, proof: false };
  regions: string[] = ['North', 'South', 'East', 'West', 'Central'];
  userData: any = { firstName: '', lastName: '', username: '', number: '', region: '', address: '' };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private authService: AuthenticateService
  ) {
    this.userDataForm = this.fb.group({
      firstName: ['', Validators.minLength(2)],
      lastName: ['', Validators.minLength(2)],
      username: ['', Validators.minLength(3)],
      number: ['', Validators.pattern(/^\d{10}$/)],
      region: [''],
      address: ['']
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

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  loadUserData(): void {
    this.userData = this.usersService.getCurrentUserId() || this.userData;
    this.userDataForm.patchValue(this.userData);
  }

  onSubmitUser(): void {
    this.formValidated.user = true;

    // Since fields are optional, we only validate the fields that are filled
    const formData = this.userDataForm.value;
    const controls = this.userDataForm.controls;

    // Check for validation errors on filled fields
    let hasErrors = false;
    for (const key in controls) {
      const control = controls[key];
      if (control.value && control.invalid) {
        hasErrors = true;
        control.markAsTouched();
      }
    }

    if (hasErrors) {
      return;
    }

    this.loading.user = true;
    this.errorMessage.user = null;

    console.log('Update user attempt:', formData);

    setTimeout(() => {
      this.loading.user = false;
      this.usersService.updateUser(formData).subscribe({
        next: () => {
          this.errorMessage.user = 'Profile updated successfully.';
          setTimeout(() => this.router.navigate(['/User/Profile']), 2000);
        },
        error: (error) => {
          this.errorMessage.user = error.message || 'An error occurred. Please try again.';
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
    this.errorMessage.password = null;

    const formData = this.passwordForm.value;
    console.log('Change password attempt:', formData);

    setTimeout(() => {
      this.loading.password = false;
      if (formData.currentPassword !== 'oldpassword123') {
        this.errorMessage.password = 'Current password is incorrect.';
      } else {
        this.authService.changePassword(formData.newPassword).subscribe({
          next: () => {
            this.errorMessage.password = 'Password changed successfully.';
            setTimeout(() => this.passwordForm.reset(), 2000);
          },
          error: (error) => {
            this.errorMessage.password = error.message || 'An error occurred. Please try again.';
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
    this.errorMessage.proof = null;

    const formData = new FormData();
    formData.append('proof', this.proofForm.get('proof')?.value);

    console.log('Update proof attempt:', formData);

    setTimeout(() => {
      this.loading.proof = false;
      this.usersService.updateProof(formData).subscribe({
        next: () => {
          this.errorMessage.proof = 'Proof updated successfully.';
          setTimeout(() => this.proofForm.reset(), 2000);
        },
        error: (error) => {
          this.errorMessage.proof = error.message || 'An error occurred. Please try again.';
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

  get firstName() { return this.userDataForm.get('firstName'); }
  get lastName() { return this.userDataForm.get('lastName'); }
  get username() { return this.userDataForm.get('username'); }
  get number() { return this.userDataForm.get('number'); }
  get region() { return this.userDataForm.get('region'); }
  get address() { return this.userDataForm.get('address'); }
  get currentPassword() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
  get proof() { return this.proofForm.get('proof'); }

  
}


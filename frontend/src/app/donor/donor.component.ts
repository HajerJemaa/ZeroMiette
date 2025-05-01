import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-donor',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterLink],
  templateUrl: './donor.component.html',
  styleUrl: './donor.component.css'
})

export class DonorComponent {
  signUpForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;
  formValidated: boolean = false;
  regions: string[] = ['North', 'South', 'East', 'West', 'Central']; // Example regions
  roles: string[] = ['donor', 'receiver']; // Exclude 'administrator'

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      region: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['', Validators.required],
      description: [''] // Optional field
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator for password matching
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    this.formValidated = true;

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    // Simulate an API call (replace with your actual service)
    const formData = this.signUpForm.value;
    console.log('Sign Up attempt:', formData);

    // Mock API call
    setTimeout(() => {
      this.loading = false;
      // Simulate success (replace with actual API logic)
      if (formData.email === 'test@example.com') {
        this.errorMessage = 'Email already exists. Please use a different email.';
      } else {
        // On success, redirect to Sign In page
        this.router.navigate(['/User/Authenticate/SignIn']);
      }
    }, 1000);
  }

  // Helper methods to access form controls
  get name() { return this.signUpForm.get('name'); }
  get username() { return this.signUpForm.get('username'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get confirmPassword() { return this.signUpForm.get('confirmPassword'); }
  get region() { return this.signUpForm.get('region'); }
  get address() { return this.signUpForm.get('address'); }
  get number() { return this.signUpForm.get('number'); }
  get role() { return this.signUpForm.get('role'); }
  
}


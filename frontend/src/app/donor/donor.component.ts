import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  signInForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    // Simulate an API call (replace with your actual authentication service)
    const { email, password, rememberMe } = this.signInForm.value;
    console.log('Sign In attempt:', { email, password, rememberMe });

    // Mock API call (replace with your actual service)
    setTimeout(() => {
      this.loading = false;
      if (email === 'test@example.com' && password === 'password123') {
        // Successful sign-in
        this.router.navigate(['/Administrator/ProcessAccount/getAllUsers/pending']);
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    }, 1000);
  }

  // Helper methods to access form controls
  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }
}

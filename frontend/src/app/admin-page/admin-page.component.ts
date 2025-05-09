import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AdminDashbord } from '../model/admin-dashbord';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  dashboardData: AdminDashbord | null = null;
  error: string | null = null;

  constructor(private us: UsersService) {}

  ngOnInit() {
    this.us.getAdminDash(this.us.getCurrentUserId()).subscribe({
        next: (data) => this.dashboardData = data,
        error: (err) => {
          this.error = 'Failed to load dashboard data';
          console.error(err);
        }
      });
  }
}

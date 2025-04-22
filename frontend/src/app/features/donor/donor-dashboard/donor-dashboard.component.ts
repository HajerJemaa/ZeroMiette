import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { UsersService } from '../../../services/users.service';
import { Announcement } from '../../../model/announcement';

@Component({
  selector: 'app-donor-dashboard',
  imports: [],
  templateUrl: './donor-dashboard.component.html',
  styleUrl: './donor-dashboard.component.css'
})
export class DonorDashboardComponent implements OnInit{
  isCreating=false;
  announcements : Announcement[]| undefined;
  constructor(private announcementService: AnnouncementService,private userService:UsersService){}
  ngOnInit() {
    this.loadAvailableAnnouncements();
  }
  loadAvailableAnnouncements(){
    this.announcementService.

    
  }

  

}

import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announcement } from '../../../model/announcement';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-get-donor-announcements',
  imports: [],
  templateUrl: './get-donor-announcements.component.html',
  styleUrl: './get-donor-announcements.component.css'
})
export class GetDonorAnnouncementsComponent implements OnInit {
  announcements : Announcement[]| undefined;
  constructor(private announcementService: AnnouncementService,private userService:UsersService){}
  ngOnInit(): void {
    this.announcementService.getAnnByDonorId(this.userService.getCurrentUserId()).subscribe(
      {
        next: (data)=>this.announcements=data,
      error: (error)=> alert("Erreur loading announcements")     }
    );
  }

  

}

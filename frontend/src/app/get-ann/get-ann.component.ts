import { Component, OnInit } from '@angular/core';
import { Announcement } from '../model/announcement';
import { RouterOutlet } from '@angular/router';
import { AnnouncementService } from '../services/announcement.service';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-get-ann',
  imports: [RouterOutlet],
  templateUrl: './get-ann.component.html',
  styleUrl: './get-ann.component.css'
})
export class GetAnnComponent implements OnInit{
  ann:Announcement[]|undefined;
  usernames!: { [key: number]: string }

  constructor(private as:AnnouncementService,private us:UsersService){};

  ngOnInit(): void {
    this.usernames={};
    this.as.getAnnByState('available').subscribe({
      next:(res)=>{
        if (res.message=="success"){
          this.ann=res.data as Announcement[],
          this.ann.forEach(an=>
            this.us.getOneUser(an.donId).subscribe({
              next: (res) => {
                this.usernames[an.donId] = (res.data! as User).user_name!;
              },
              error: (erreur) => alert(erreur)
            })
          )
        }else alert("failure")
      },
      error:(err)=>alert(err)
    });
  }

  deleteAnn(code:string){
    this.as.deleteAnnouncement(code).subscribe({
      next:(res)=>{
        alert(res.message);
        this.ngOnInit;
      },
      error:(err)=>alert(err)
    });

  }
}

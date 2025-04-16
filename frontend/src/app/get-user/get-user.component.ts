import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-user',
  imports: [],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.css'
})
export class GetUserComponent implements OnInit{
user:User|undefined;

constructor (public us:UsersService,private route:ActivatedRoute){}

ngOnInit(): void {
    const id=+this.route.snapshot.paramMap.get('id')!;
    this.us.getOneUser(id).subscribe({
      next: (data)=>this.user=data,
      error: (error)=>{alert("Api Error")}
    })
}
getExtension(mime:string):string{
  const map: { [key:string]: string}={
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
  'image/gif': 'gif',
  'image/svg+xml': 'svg'
  };
  return map[mime];
}
}

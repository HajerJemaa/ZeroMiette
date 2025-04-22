import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-get-user',
  imports: [],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.css'
})
export class GetUserComponent implements OnInit{
user:User|undefined|null;
fileName?:string
fileUrl?:string | SafeResourceUrl
constructor (public us:UsersService,private route:ActivatedRoute,private r:Router,private trustUrl: DomSanitizer){}

ngOnInit(): void {
    const id=+this.route.snapshot.paramMap.get('id')!;
    this.us.getOneUser(id).subscribe({
      next: (res)=>{
        if(res.data!=null && res.message=="success"){
          this.user=res.data;
          if (this.user.proof)
            this.fileUrl=this.getFileUrl();
        }else{
          alert(res.message+" to get user!!");
        }
      },
      error: (error)=>alert("Api Error!!")
    })
}

getFileUrl(act?:string){
  this.fileName=this.user!.proof.split("/").pop();
  if (act){
    return this.trustUrl.bypassSecurityTrustResourceUrl(`http://localhost/backend/Proofs/${this.fileName}`);
  }else{
    return`http://localhost/backend/Proofs/${this.fileName}`
  }
}

getExtension(extention:string):string{
  const map: { [key:string]: string}={
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
  'image/gif': 'gif',
  'image/svg+xml': 'svg'
  };
  return map[extention];
}

acceptUser(id:number){
  this.us.changeUserState({userId:id}).subscribe({
    next: (res)=>{
      if(res.message="failure"){
        alert("Failure to update user!!!");
      }
    },
    error: (err)=>{
      alert("Api ERROR!!")
      this.r.navigate(["/Administrator/getAllUsers/pending"]);
    }
  })
}

deleteUser(id:number){
  this.us.deleteUser(id).subscribe({
    next:(res)=>{
      if (res.message=="success"){
        alert("user "+res.data?.first_name+" "+res.data?.last_name+" was deleted successfully!!");
      }else if(res.message="failure"){
        alert("failed to delete user "+res.data?.first_name+" "+res.data?.last_name+"!!");
      }
    },
    error:(err)=>{
      alert("Api ERROR!!");
      this.r.navigate(["/Administrator/getAllUsers/accepted"]);
    }
  })
}

redir(){
  this.r.navigate([`/Administrator/getAllUsers/${this.user?.state}`])
}
}

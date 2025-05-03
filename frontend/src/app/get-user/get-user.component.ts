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
fileUrl!:SafeResourceUrl;
loading:boolean = true;
proofError:boolean = false;

constructor (public us:UsersService,private route:ActivatedRoute,private r:Router,private trustUrl: DomSanitizer){}

  ngOnInit(): void {
      const id=+this.route.snapshot.paramMap.get('id')!;
      this.us.getOneUser(id).subscribe({
        next: (res)=>{
          if(res.message=="success"){
            this.user=res.data as User;
            this.loading=false;
            if (this.user.proof)
              this.fileUrl = this.getFileUrl();
          }else{
            alert(res.message+" to get user!!");
          }
        },
        error: (err)=>{
          alert("Api Error: "+err+"!!");
          this.loading=false;
        }
      });
  }

  onProofError(event: Event): void {
    console.error('Failed to load proof:', this.user?.proof, event);
    this.proofError = true;
  }

  openProofModal(): void {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('proofModal'));
    modal.show();
  }

  getFileUrl(){
    return this.trustUrl.bypassSecurityTrustResourceUrl(this.user!.proof);
  }

  acceptUser(){
    if (this.user && confirm(`Are you sure you want to approve ${this.user.first_name} ${this.user.last_name}?`)) {

      this.us.updateUserState({userId:this.user?.userId!, pwd:"myscrete", state:"accepted"}).subscribe({
        next: (res)=>{
          if(res.message=="failure"){

            alert("Failure to accept user!!!");

          }else{ 
            this.r.navigate([`${this.user?.userId!}`]).then(() => {
              window.location.reload();
            });
          }
        },
        error: (err)=>alert(err+"!!")
      });
      
    }
  }

  deleteUser(act:string){
    if (this.user && confirm(`Are you sure you want to ${act} ${this.user.first_name} ${this.user.last_name}?`)) {
      this.us.deleteUser(this.user.userId!).subscribe({
        next:(res)=>{
          if (res.message=="success"){
            alert("user "+this.user!.first_name+" "+this.user!.last_name+" was "+act+" successfully!!");
            this.redir();
          }else if(res.message=="failure"){
            alert("failed to "+act+" user "+this.user!.first_name+" "+this.user!.last_name+"!!");
          }
        },
        error:(err)=> alert("Api ERROR:"+err+"!!")
      });
    }
  }

  redir(){
    this.r.navigate([`/Administrator/ProcessAccount/getAllUsers/${this.user?.state}`]);
  }
}

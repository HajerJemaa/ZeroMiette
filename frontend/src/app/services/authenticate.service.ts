import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  api:string="http://localhost/backend/authenticate/";

  httpclient = inject(HttpClient);
  
  router = inject(Router);

  signIn(creds :{email:string,password:string}){
    if (this.isSignedIn()){
      localStorage.removeItem("token");
    }

    return this.httpclient.post<any>(this.api+"signIn.php", creds).pipe(
      tap((res)=>{
        if (res.token){
          localStorage.setItem("token", res.token);
        }
      })
    );
  }


  signOut():void{
    localStorage.removeItem("token");
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }


  isSignedIn():boolean {
    return !!localStorage.getItem('token');
  }

  changePassword(cred:{ userId : number, pwd : string }){
    return this.httpclient.put(this.api+"signIn.php",cred)
  }

  passwordVerif(cred:{ userId : number, pwd : string }){
    return this.httpclient.post<boolean>(this.api+"passwordVerif.php",cred)
  }

  getToken():string|null{
    return localStorage.getItem('token');
  }
}


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  api:string="http://localhost/backend/authenticate/signIn.php";

  httpclient = inject(HttpClient);
  
  router =inject(Router);

  signIn(creds :{email:string,password:string}){
    return this.httpclient.post<any>(this.api, creds).pipe(
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

  changePassword(cred:any){
    return this.httpclient.put(this.api,cred)
  }

  getToken():string|null{
    return localStorage.getItem('token');
  }
}


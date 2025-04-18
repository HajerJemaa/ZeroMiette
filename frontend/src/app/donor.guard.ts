import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Mytoken } from './model/mytoken';
import { jwtDecode } from 'jwt-decode';

export const donorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
    const token = localStorage.getItem('token');
  
    if (token){
      try{
        const decoded:Mytoken=jwtDecode(token);
        const now = Math.floor(Date.now()/1000);
  
        if(decoded.exp>now && decoded.role=="donor"){
          return true;
        }else{
          localStorage.removeItem('token');
        }
      }catch (e){
        console.error('Invalid token', e)
      }
    }  
    router.navigate(['Authentificate/SignIn']);
    return false;
};

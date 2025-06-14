import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Mytoken } from './model/mytoken';
import { inject } from '@angular/core';

export const recieverGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token){
    try{
      const decoded:Mytoken=jwtDecode(token);
      const now = Math.floor(Date.now()/1000);

      if(decoded.exp>now && decoded.role=="reciever"){
        return true;
      }else{
        localStorage.removeItem('token');
      }
    }catch (e){
      console.error('Invalid token', e)
    }
  }  
  router.navigate(['Authentificate/SignIn']).then(()=>{
    window.location.reload();
  });
  return false;
};

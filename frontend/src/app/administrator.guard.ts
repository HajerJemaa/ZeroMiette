import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Mytoken } from './model/mytoken';

export const administratorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded: Mytoken = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp > now && decoded.role === 'administrator') {
        return true;
      }
      localStorage.removeItem('token');
      router.navigate(['Authentificate/SignIn']);
      return false;
    } catch (e) {
      console.error('Invalid token', e);
      localStorage.removeItem('token');
    }
  }
  router.navigate(['User/Authenticate/SignIn']).then(() => {
    window.location.reload();
  });
  return false;
};
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';
import { Result } from '../model/result';
import { Results } from '../model/results';
import { jwtDecode } from 'jwt-decode';
import { Mytoken } from '../model/mytoken';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api:string="http://localhost/backend/users/user.php";

  httpclient = inject(HttpClient);

  getAllUsers(state:String){
    return this.httpclient.get<Results>(this.api+"?state="+state);
  }

  getOneUser(id:number){
    return this.httpclient.get<Result>(this.api+"?id="+id);
  }

  deleteUser(id:number){
    return this.httpclient.delete<Result>(this.api+"?id="+id);
  }
  
  addUser(us:User){
    return this.httpclient.post<Result>(this.api,us);
  }
  
  changeUserState(userId:number){
    return this.httpclient.put<Result>(this.api,userId);
  }

  getCurrentUserRole(){
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<Mytoken>(token);
      return decoded.role
    }else{
      throw new Error("No user is signed in please try again after signing in!!")
    }
  }

  getCurrentUserId(){
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<Mytoken>(token);
      return decoded.userId
    }else{
      throw new Error("No user is signed in please try again after signing in!!")
    }
  }
}

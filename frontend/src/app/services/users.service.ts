import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';
import { Result } from '../model/result';
import { Results } from '../model/results';

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
}

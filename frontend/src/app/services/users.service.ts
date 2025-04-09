import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api:string="http://localhost/backend/backend/users/user.php";

  httpclient = inject(HttpClient);

  getAllUsers(state:String){
    return this.httpclient.get<any[]>(this.api+"?state="+state);
  }

  getOneUser(id:number){
    return this.httpclient.get<any>(this.api+"?id="+id);
  }

  deleteUser(id:number){
    return this.httpclient.delete<any>(this.api+"?id="+id);
  }
  
  addUser(us:User){
    return this.httpclient.post<any>(this.api,us);
  }
}

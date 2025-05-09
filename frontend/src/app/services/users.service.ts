import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '../model/result';
import { jwtDecode } from 'jwt-decode';
import { Mytoken } from '../model/mytoken';
import { AdminDashbord } from '../model/admin-dashbord';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api:string="http://localhost/backend/users/user.php";

  httpclient = inject(HttpClient);

  getAllUsers(state:String){
    return this.httpclient.get<Result>(this.api+"?state="+state);
  }

  getOneUser(id:number){
    return this.httpclient.get<Result>(this.api+"?id="+id);
  }

  deleteUser(id:number){
    return this.httpclient.delete<Result>(this.api+"?id="+id);
  }
  
  addUser(us:any){
    return this.httpclient.post<Result>(this.api,us);
  }

  updateUserState(cred:{ userId :number, pwd:string, state:string}){
    return this.httpclient.put<Result>(this.api,cred);
  }

  updateAdmin(data:any){
    return this.httpclient.put("http://localhost/backend/updateUser/updateAdmin.php",data);
  }

  updateUser(data:any){
    return this.httpclient.put("http://localhost/backend/updateUser/updateUser.php",data);
  }

  updateProof(data:any){
    return this.httpclient.post("http://localhost/backend/updateUser/updateProof.php",data);
  }

  getAdminDash(id:number){
    return this.httpclient.get<AdminDashbord>(this.api+"?userId="+id);
  }

  changePassword(cred:{ userId : number, pwd : string }){
    return this.httpclient.put(this.api,cred);
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
  

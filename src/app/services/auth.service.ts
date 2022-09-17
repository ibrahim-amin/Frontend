import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserForRegister, UserForLogin } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
base_url=environment.baseUrl;
constructor(private _http:HttpClient) { }

auth(user:UserForLogin){

  return this._http.post(this.base_url+'/User/Login',user);

//   let UserArray=[];
//   if(localStorage.getItem('Users')){
//     UserArray=JSON.parse(localStorage.getItem('Users'));
//   }
//   return UserArray.find(p=> p.userName === user.userName && p.password === user.password);
// }
}

addUser(user:UserForRegister){
  return this._http.post(this.base_url+'/User/Register',user);

}
}

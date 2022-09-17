import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForLogin } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private _auth:AuthService,private _toaster:ToastrService,private router:Router) { }

  ngOnInit() {
  }

  onLogin(loginform:NgForm){

         //console.log(loginform.value);
     this._auth.auth(loginform.value).subscribe(
      (res:UserForLogin) => {
        //console.log(res);
        const user = res;
        console.log(user);
        localStorage.setItem('Token',user.token);
        localStorage.setItem('userName',user.username);
        this._toaster.success('Login Succesfully');
        this.router.navigate(['/']);
      }

     )

      //    if(user){
      //      this._toaster.success('Login Succesfully');
      //      localStorage.setItem('Token',user.userName)
      //      this.router.navigate(['/']);

      // }
      // else{
      //   this._toaster.error('UnSuccesful Login');
      // }
  }

}

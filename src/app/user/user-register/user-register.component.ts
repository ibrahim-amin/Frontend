import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormControl,ValidationErrors, FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { min } from 'rxjs';
import { UserForRegister } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { mustMach } from './Password-Match';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm!:FormGroup;
  FormSubmitted:boolean=false;
  constructor(private fb:FormBuilder,
             private _authService:AuthService,
            private _toaster:ToastrService,

    ) { }

  ngOnInit() {
    // this.registerForm=new FormGroup({
    //   userName:new FormControl(null,Validators.required),
    //   email:new FormControl(null,[Validators.required,Validators.email]),
    //   password:new FormControl(null,Validators.compose([Validators.required,Validators.minLength(8)])),
    //   confirmPassword:new FormControl(null,Validators.required),
    //   mobile:new FormControl(null,[Validators.required,Validators.maxLength(10)])
    // },mustMach()
    // );

    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registerForm=this.fb.group({
      userName:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,Validators.compose([Validators.required,Validators.minLength(8)])],
      confirmPassword:[null,Validators.required],
      mobile:[null,[Validators.required,Validators.maxLength(10)]]

    },{validators:mustMach()})
  }



get f(){
  return this.registerForm.controls;
}

user:UserForRegister;
  onSubmit(){
    this.FormSubmitted=true;
    if(this.registerForm.valid){
      // console.log(this.registerForm.value);
    console.log(this.registerForm.get('userName').value);

    // this.user = Object.assign(this.user,this.registerForm.value);
    this._authService.addUser(this.userData()).subscribe(()=>{
      this._toaster.success("Record Succesfuly Added");
    }
    )
    this.registerForm.reset();
    this.FormSubmitted=false;
  }
}

userData():UserForRegister{
  return this.user={
    userName:this.registerForm.get('userName').value,
    email:this.registerForm.get('email').value,
    password:this.registerForm.get('password').value,
    mobile:this.registerForm.get('mobile').value,
  }
}

}

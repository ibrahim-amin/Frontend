import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private _toaster:ToastrService) { }

  ngOnInit() {
  }
  Logedinuser:string;
  IsLogin(){
  this.Logedinuser= localStorage.getItem('userName');
  return this.Logedinuser;
  }

  Logout(){
       localStorage.removeItem('userName');
       localStorage.removeItem('Token');
       this._toaster.success("logout Succesfuly")
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/tabset.component';
import { ToastrService } from 'ngx-toastr';
import { IPropertyBase } from 'src/app/model/IPropertyBase';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/services/housing.service';
import {IKeyValuePair} from 'src/app/model/IKeyValuePair'

@Component({
  selector: 'app-AddProperty',
  templateUrl: './AddProperty.component.html',
  styleUrls: ['./AddProperty.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Formtab') Formtab?: TabsetComponent;
// PropertyType=['House','Apartment','Duplex'];
// FurneshType:Array<string>=['fully','semi','Unfurnished'];
PropertyType:IKeyValuePair[];
FurneshType:IKeyValuePair[] ;
addPropertyForm:FormGroup;
NextButtonClick:boolean;
CityList:any[];


property= new Property();

fileToUpload: File | null = null;

PropertyView :IPropertyBase={
  id:null,
  name:null,
  price:null,
  propertyType:null,
  photo:null,
  sellRent:null,
  furnishType:null,
  bhk:null,
  builtArea:null,
  cityName:'',
  readyToMove:null,
  estPossessionOn:null,
}

  constructor(private router:Router, private _Fb:FormBuilder,private _housingService:HousingService, private _toasterservice:ToastrService) { }

  ngOnInit() {
     if(!localStorage.getItem('userName')){
      this._toasterservice.error("please login First");
      this.router.navigate(['/user/login']);
     }




    this.CreatAddPropertyForm();
    this._housingService.getAllCity().subscribe(res=>{
      this.CityList=res;
      console.log(res);
    })
    this._housingService.getAllFurnishingType().subscribe(res=>
      this.FurneshType=res);

      this._housingService.getAllPropertyType().subscribe(res=>
      this.PropertyType=res);
  }


  handleFileInput(event:any) {
    console.log(event);
    this.fileToUpload = event.target.files[0];
}

uploadFileToActivity() {


  this._housingService.postFile(this.fileToUpload).subscribe(data => {
     console.log(data);
    // do something, if upload success
    }, error => {
      console.log(error);
    });
}

CreatAddPropertyForm(){
  this.addPropertyForm = this._Fb.group({
    BasicInfo:this._Fb.group({

      SellRent: ['1' , Validators.required],
      BHK: [null, Validators.required],
      PType: [null, Validators.required],
      FType: [null, Validators.required],
      Name: [null, Validators.required],
      City: [null, Validators.required]
    }),
    PriceInfo:this._Fb.group({

        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [0],
        Maintenance: [0],
    }),

    AddressInfo: this._Fb.group({
      FloorNo: [null],
      TotalFloor: [null],
      Address: [null, Validators.required],
      LandMark: [null],
    }),

    OtherInfo: this._Fb.group({
      RTM: [null, Validators.required],
      PossessionOn: [null,Validators.required],
      AOP: [null],
      gated: [null],
      MainEntrance: [null],
      Description: [null]
    })

  })
}

 OnBack(){
  this.router.navigate(['/']);
 }

 onSubmit(){
  this.NextButtonClick=true;
  //  if(this.BasicInfo.invalid){
  //   this.Formtab.tabs[0].active = true;

  //   return;
  //  }
  //  if(this.PriceInfo.invalid){
  //   this.Formtab.tabs[1].active = true;

  //   return;
  //  }
  //  if(this.AddressInfo.invalid){
  //   this.Formtab.tabs[2].active = true;

  //   return;
  //  }
  //  if(this.OtherInfo.invalid){
  //   this.Formtab.tabs[3].active = true;

  //   return;
  //  }
  if(this.AllTabsValid()){
    this.PropertyMap();

     this._housingService.AddProperty(this.property,this.fileToUpload).subscribe(()=>{
      this._toasterservice.success("Property Added Succesfuly")
          if(this.property.sellRent==2){
            this.router.navigate(['/Rent-property']);
          }
          else{
            this.router.navigate(['']);

          }
        })

    console.log(this.addPropertyForm);
     }
  else{
    this._toasterservice.error("please fill your Form Correctly");
  }
}

selectTab(tabId: number, isValid:boolean) {
  this.NextButtonClick=true;

  if(isValid){
  if (this.Formtab?.tabs[tabId]) {
    this.Formtab.tabs[tabId].active = true;
  }
}

}

AllTabsValid():boolean{
  if(this.BasicInfo.invalid){
    this.Formtab.tabs[0].active = true;
    return false;
   }
   if(this.PriceInfo.invalid){
    this.Formtab.tabs[1].active = true;

    return false;
   }
   if(this.AddressInfo.invalid){
    this.Formtab.tabs[2].active = true;

    return false;
   }
   if(this.OtherInfo.invalid){
    this.Formtab.tabs[3].active = true;

    return false;
   }
   return true;
}
// Getter Method

get BasicInfo(){
  return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
}

get PriceInfo(){
  return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
}

get AddressInfo() {
  return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
}

get OtherInfo() {
  return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
}

get FloorNo() {
  return this.AddressInfo.controls['FloorNo'] as FormControl;

}




PropertyMap():void{
  //this.property.id= +this._housingService.newPropID();
  this.property.sellRent = +this.BasicInfo.controls['SellRent'].value;
  this.property.bhk = +this.BasicInfo.controls['BHK'].value;
  this.property.PropertyTypeId = +this.BasicInfo.controls['PType'].value;
  this.property.name = this.BasicInfo.controls['Name'].value;
  this.property.CityId = +this.BasicInfo.controls['City'].value;
  this.property.furnishingTypeId = +this.BasicInfo.controls['FType'].value;
  this.property.price = +this.PriceInfo.controls['Price'].value;
  this.property.security = +this.PriceInfo.controls['Security'].value;
  this.property.maintenance = +this.PriceInfo.controls['Maintenance'].value;
  this.property.builtArea = +this.PriceInfo.controls['BuiltArea'].value;
  this.property.carpetArea = +this.PriceInfo.controls['CarpetArea'].value;
 // this.property.floorNo = +this.AddressInfo.controls['FloorNo'].value;
  this.property.floorNo = +this.FloorNo.value;
  this.property.totalFloors = +this.AddressInfo.controls['TotalFloor'].value;
  this.property.address = this.AddressInfo.controls['Address'].value;
  this.property.address2 = this.AddressInfo.controls['LandMark'].value;
  this.property.readyToMove =  (this.OtherInfo.controls['RTM'].value=="true")? true : false;
  //this.property.age = this.OtherInfo.controls['AOP'].value;
   this.property.gated = (this.OtherInfo.controls['gated'].value=="true")? true : false;
   console.log(this.property.gated);
  this.property.mainEntrance = this.OtherInfo.controls['MainEntrance'].value;
  this.property.estPossessionOn = this.OtherInfo.controls['PossessionOn'].value;
  this.property.description = this.OtherInfo.controls['Description'].value;
  //this.property.PostedOn = new Date().toString();
}

SetPosessionOn(value:any):any{
  console.log(value);
  if(value!="" && value!=null){
    return this.PropertyView.estPossessionOn=new Date(value);

  }
}

}

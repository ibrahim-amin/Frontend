import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/IPropertyBase';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  // Properties!:any;
  Properties:Array<IPropertyBase>=[];


  SellRent=1;
  City= '';
  SearchCity= '';
  SortBy= '';
  SortDirection = 'asc';
  constructor(private _housingservice:HousingService,private route:ActivatedRoute) { }


  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.SellRent=2;
    }
    console.log(this.route.snapshot.url.toString());
    this._housingservice.getallProperties(this.SellRent).subscribe(res=>{
     // console.log(res);
      this.Properties=res;
      // const newProperty=JSON.parse(localStorage.getItem('newProp'));
      // if(newProperty.SellRent==this.SellRent){
      //   this.Properties=[newProperty, ...this.Properties];
      // }
    },error=>{
      console.log(error);
    }


    )
  }

  onCityFilter(){
    this.SearchCity=this.City;
  }

  onCityFilterClear(){
    this.City = '';
    this.SearchCity = '';
  }

  SetSortDirection(){
    if(this.SortDirection === 'asc'){
      this.SortDirection = 'desc';
    }
    else{
      this.SortDirection = 'asc';
    }
  }
}

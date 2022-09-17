import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import {map}   from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IKeyValuePair } from '../model/IKeyValuePair';
import { IPropertyBase } from '../model/IPropertyBase';
import { Property } from '../model/Property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  base_url=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getallProperties(ser?:number):Observable<Property[]>{
    // return this.http.get('data/properties.json').pipe(
    //   map(res => {
    //     const ArrayProperties:Array<Property>=[];
    //     let newProperty=  JSON.parse(localStorage.getItem('newProp'));
    //       if(newProperty){

    //         for(const Id in newProperty){
    //           if(ser){
    //           if(newProperty.hasOwnProperty(Id) && (newProperty as any)[Id].SellRent===ser){
    //              ArrayProperties.push((newProperty as any) [Id]);
    //              }
    //           }
    //         else{

    //           ArrayProperties.push((newProperty as any) [Id]);
    //         }
    //          }

    //       }
    //       for(const Id in res){
    //         if(ser){
    //        if(res.hasOwnProperty(Id) && (res as any)[Id].SellRent===ser){
    //           ArrayProperties.push((res as any) [Id]);
    //        }
    //       }
    //       else{
    //         ArrayProperties.push((res as any) [Id]);
    //       }
    //       }
    //       return ArrayProperties;
    //   })
    // )
    return this.http.get<Property[]>(this.base_url+'/Property/list/'+ ser.toString());


  }

  // getallprop(ser?:number){
  //   return this.http.get(this.base_url+'/Property/list/'+ ser.toString());

  // }



  // AddProperty(property:Property){
  //   let newProp=[property];
  //   if(localStorage.getItem('newProp')){
  //      newProp=[property, ...JSON.parse(localStorage.getItem('newProp'))]
  //     }
  //     localStorage.setItem('newProp',JSON.stringify(newProp));
  // }
  AddProperty(property:Property,fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('sellRent',property.sellRent.toString());
    formData.append('bhk',property.bhk.toString());
    formData.append('PropertyTypeId',property.PropertyTypeId.toString());
    formData.append('name',property.name);
    formData.append('CityID',property.CityId.toString());
    formData.append('furnishingTypeId',property.furnishingTypeId.toString());
    formData.append('price',property.price.toString());
    formData.append('security',property.security.toString());
    formData.append('maintenance',property.maintenance.toString());
    formData.append('builtArea',property.builtArea.toString());
    formData.append('carpetArea',property.carpetArea.toString());
    formData.append('floorNo',property.floorNo.toString());
    formData.append('totalFloors',property.totalFloors.toString());
    formData.append('address',property.address.toString());
    formData.append('address2',property.address2.toString());
    formData.append('readyToMove',property.readyToMove.toString());
    formData.append('gated',property.gated.toString());
    formData.append('mainEntrance',property.mainEntrance.toString());
    formData.append('estPossessionOn',property.estPossessionOn.toDateString());
    formData.append('description',property.description.toString());
    const httpOptions ={
      headers: new HttpHeaders({
        Authorization: 'Bearer '+localStorage.getItem('Token')
      })
    }
    return this.http.post(this.base_url+'/Property/AddProperty/',formData,httpOptions);

  }

  newPropID(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',String(+localStorage.getItem('PID')+1))
      return localStorage.getItem('PID');
    }
    else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }

  getProperty(Id:number){
    // return this.getallProperties(Id).pipe(map(PropertyArray=>{
    //   // throw new console.error('Some Error Occured');

    //   return PropertyArray.find(p=>p.id===Id);
    // }))

 //alter native way

    return this.http.get<Property>(this.base_url+'/Property/GetPropertyDetail/'+Id);


  }

  getAllCity():Observable<string[]>{
    return this.http.get<string[]>('http://localhost:62594/api/city/');
  }

  getAllPropertyType():Observable<IKeyValuePair[]>{
    return this.http.get<IKeyValuePair[]>(this.base_url+'/PropertyType/list');
  }
  getAllFurnishingType():Observable<IKeyValuePair[]>{
    return this.http.get<IKeyValuePair[]>(this.base_url+'/FurnishingType/list');
  }

getPropertyAge(dateofEstablishment: Date): string{
  const today = new Date();
  const estdate = new Date (dateofEstablishment);
  let age = today.getFullYear()-estdate.getFullYear();
  const m= today.getMonth()-estdate.getMonth();
  if(m<0 || (m===0 && today.getDate()<estdate.getDate())){
    age --;
  }
  if(today<estdate){
    return '0';
  }

  if(age===0){
    return 'Less then a year'
  }

  return age.toString();
}

postFile(fileToUpload: File) {
//   const endpoint = 'your-destination-url';
  const formData: FormData = new FormData();
 formData.append('fileKey', fileToUpload, fileToUpload.name);

//   return this.http
//     .post(endpoint, formData, { headers: yourHeadersConfig })
//     .map(() => { return true; })
//     .catch((e) => this.handleError(e));
// }

const httpOptions ={
  headers: new HttpHeaders({
    Authorization: 'Bearer '+localStorage.getItem('Token')
  })
}
return this.http.post(this.base_url+'/Property/add/photo/'+1,formData,httpOptions);

}

}

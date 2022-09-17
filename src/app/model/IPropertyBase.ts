export interface IPropertyBase {
  id:number;
  sellRent:number;
  name:string;
  propertyType:string;
  furnishType:string;
  price:number;
  bhk:number;
  builtArea:number;
  cityName:string;
  readyToMove?:boolean;
  estPossessionOn?: Date;
  photo?:string;

}

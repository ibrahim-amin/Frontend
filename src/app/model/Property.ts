import { IPropertyBase } from "./IPropertyBase";
import { Photo } from "./photo";

export class Property implements IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  PropertyTypeId:number;
  bhk: number;
  furnishType: string;
  furnishingTypeId:number;
  price: number;
  builtArea: number;
  carpetArea?: number;
  address: string;
  address2?: string;
  cityName: string;
  CityId:number;
  floorNo?: number;
  totalFloors?: number;
  readyToMove?: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn?: Date;
  photo?: string;
  description?: string;
  photos?:Photo[];


}


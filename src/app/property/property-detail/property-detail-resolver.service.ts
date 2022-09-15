import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private router:Router, private _housingservice:HousingService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Property | Observable<Property> | Promise<Property> {
  const propId=route.params['id'];
  return this._housingservice.getProperty(+propId).pipe(catchError(error=>{

    this.router.navigate([''])
    return of(null)
  }))
}
}

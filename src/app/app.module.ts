import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AddPropertyComponent } from './property/AddProperty/AddProperty.component';
import { Routes,RouterModule } from '@angular/router';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { identifierName } from '@angular/compiler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';
const AppRoute:Routes=[
        {path:'Add_property',component: AddPropertyComponent},
        {path:'',component: PropertyListComponent},
        {path:'Rent-property',component: PropertyListComponent},
        {path:'user/register',component: UserRegisterComponent},
        {path:'user/login',component: UserLoginComponent},
       {path:'Property-detail/:id',component: PropertyDetailComponent,resolve:{prp:PropertyDetailResolverService}},
       // {path:'Property-detail/:id',component: PropertyDetailComponent},
        {path:'**',component: PropertyListComponent}
   ]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
      NavBarComponent,
      AddPropertyComponent,
      PropertyDetailComponent,
      UserLoginComponent,
      UserRegisterComponent,
      FilterPipe,
      SortPipe

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoute),
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxGalleryModule,


  ],
  providers: [
  {
    provide:HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptorService,
    multi:true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

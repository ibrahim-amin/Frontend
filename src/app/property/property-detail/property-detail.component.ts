import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
public PropertyId!:number;
property=new  Property;
mainPhotoUrl:string=null;

  constructor( private route:ActivatedRoute,private router:Router,private _housingservice:HousingService) { }

  ngOnInit() {
    this.PropertyId= +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (res:Property) =>{
        this.property=res['prp'];
      }
      )
      this.property.age=this._housingservice.getPropertyAge(this.property.estPossessionOn);
      console.log(this.property.photos);

// alter way

  // this._housingservice.getProperty(this.PropertyId).subscribe(res=>{
  //   this.property=res;
  // })



  //   this.route.params.subscribe(params=>{
  //     this.PropertyId=+params['id'];
  //     this._housingservice.getProperty(this.PropertyId).subscribe((res:Property)=>{
  //       this.property=res;
  //     }), console.error(this.router.navigate(['/']));

  //   })

  this.galleryOptions = [
    {
      width: '100%',
      height: '465px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide
    },

  ];

  this.galleryImages = this.getPropertyPhotos();
  // [
  //   {
  //     small: 'assets/images/1.jpg',
  //     medium: 'assets/images/1.jpg',
  //     big: 'assets/images/1.jpg'
  //   },
  //   {
  //     small: 'assets/images/2.jpg',
  //     medium: 'assets/images/2.jpg',
  //     big: 'assets/images/2.jpg'
  //   },
  //   {
  //     small: 'assets/images/3.jpg',
  //     medium: 'assets/images/3.jpg',
  //     big: 'assets/images/3.jpg'
  //   },
  //   {
  //     small: 'assets/images/4.jpg',
  //     medium: 'assets/images/4.jpg',
  //     big: 'assets/images/4.jpg'
  //   },


  // ];


   }

  OnSelectnext(){
    this.PropertyId+=1;
    this.router.navigate(['/Property-detail',this.PropertyId]);
  }

  getPropertyPhotos():NgxGalleryImage[]{
    const photoImages:NgxGalleryImage[]=[];
    for(var photo of this.property.photos){
      if(photo.isPrimary){
        this.mainPhotoUrl='http://localhost:62594/Resources/Images/'+photo.imageUrl;
      }
      else{

        photoImages.push({
          small:'http://localhost:62594/Resources/Images/'+photo.imageUrl,
          medium:'http://localhost:62594/Resources/Images/'+photo.imageUrl,
          big:'http://localhost:62594/api/Resources/images/'+photo.imageUrl,
        })
      }
    }
    return photoImages;
  }
}

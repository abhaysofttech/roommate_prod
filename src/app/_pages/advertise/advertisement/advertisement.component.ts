import { Component, OnInit } from '@angular/core';
import { advertiseService } from 'src/app/_service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pager: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  Ads: any;
  reqGender = '';
  foo: any;
  public loading:boolean=true;
  constructor(
    private _advertiseService: advertiseService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,

  ) {
    debugger
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Ads = this.router.getCurrentNavigation().extras.state.id;
        console.log(this.Ads);
        this.Ads.forEach(col => {
          col.visitedContact = false;
        });
        this.storage.get('phonenumber').then((phonenumber) => {
          this.Ads.map(adsData => {
            adsData.adsvisits.filter(visitData => {
              if(visitData.phonenumber == phonenumber) return adsData.visitedContact = true 
            })
          })
        })
       
     

        this.loading = false;

      }
    });
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {this.reqGender = JSON.parse(params.id)});
    // this._advertiseService.getAllAds(this.reqGender)
    // .subscribe(
    //   res =>{
    //     this.Ads=res;
    //     console.log(res);
    //   })
  }
  viewContact(adsDetails){
    this.storage.get('phonenumber').then((phonenumber) => {
      this._advertiseService.adsVisits(adsDetails.id,phonenumber)
      .subscribe(
       (res:any) =>{
        this.Ads.filter(x => { return x.id == res.adsId; }).map(data => { 
          return data.visitedContact = true 
        });
       })
    })
  
  }
}

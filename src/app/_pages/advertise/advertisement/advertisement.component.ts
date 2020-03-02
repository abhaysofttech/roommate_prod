import { Component, OnInit } from '@angular/core';
import { advertiseService } from 'src/app/_service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router

  ) {
    debugger
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Ads = this.router.getCurrentNavigation().extras.state.id;
        console.log(this.Ads);
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
}

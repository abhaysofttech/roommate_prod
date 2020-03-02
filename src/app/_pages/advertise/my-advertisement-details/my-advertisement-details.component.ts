import { Component, OnInit } from '@angular/core';
import { advertiseService } from 'src/app/_service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-advertisement-details',
  templateUrl: './my-advertisement-details.component.html',
  styleUrls: ['./my-advertisement-details.component.scss'],
})
export class MyAdvertisementDetailsComponent implements OnInit {
  adsId = '';
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pager:true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  Ads:any;

  constructor(
    private _advertiseService: advertiseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.adsId = params.id);

    this._advertiseService.getAdsDetails(this.adsId)
    .subscribe(
      res =>{
        this.Ads=res;
        console.log(res);
      })
  }

}

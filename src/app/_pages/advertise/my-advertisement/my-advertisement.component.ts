import { Component, OnInit } from '@angular/core';
import { advertiseService, SharedService } from 'src/app/_service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-my-advertisement',
  templateUrl: './my-advertisement.component.html',
  styleUrls: ['../advertisement/advertisement.component.scss'],
})
export class MyAdvertisementComponent implements OnInit {
  myAds: any;
  adsId = '';
  userData: any;
  constructor(
    private _advertiseService: advertiseService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private _sharedService: SharedService
  ) { }
  ionRefresh(event) {

    setTimeout(() => {
      this._advertiseService.getMyAds(this.userData.phonenumber)
      .subscribe(
        (res: any) => {
          this.myAds = res;
          let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
          // if(myAdsWithNoAddress.length > 0 ){
          //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
          // }
        })
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {
    this._sharedService.getUserData.subscribe(
      (userData: any) => {
        this.userData = userData;
        this._advertiseService.getMyAds(userData.phonenumber)
          .subscribe(
            (res: any) => {
              this.myAds = res;
              let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
              // if(myAdsWithNoAddress.length > 0 ){
              //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
              // }
            })
      })
  }

}

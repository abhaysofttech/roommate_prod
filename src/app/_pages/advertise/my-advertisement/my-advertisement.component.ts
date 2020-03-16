import { Component, OnInit } from '@angular/core';
import { advertiseService } from 'src/app/_service';
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
  constructor(
    private _advertiseService: advertiseService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.storage.get('phonenumber').then((phonenumber) => {
      //  this.route.params.subscribe(params => this.adsId = params.id);
      this._advertiseService.getMyAds(phonenumber)
        .subscribe(
          (res: any) => {
            this.myAds = res;
            let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
            // if(myAdsWithNoAddress.length > 0 ){
            //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
            // }
          })
    });
  }

}

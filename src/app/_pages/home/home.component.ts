import { Component, OnInit } from '@angular/core';
import { advertiseService } from 'src/app/_service';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myAds: any;
  myRecentAdsVisit:any;
  message:string = null;
  file:string= null;
  link:string = null;
  subject:string = null;
  constructor(
    private _advertiseService: advertiseService,
    private storage: Storage,
    private socialSharing:SocialSharing ) { }

  ngOnInit() {
    this.storage.get('phonenumber').then((phonenumber) => {
      this._advertiseService.getRecentAdsVisit(phonenumber)
      .subscribe(
        (res: any) => {
          this.myRecentAdsVisit = res;
          console.log(res);
          // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
          // if(myAdsWithNoAddress.length > 0 ){
          //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
          // }
        })
      //  this.route.params.subscribe(params => this.adsId = params.id);
      this._advertiseService.getMyAds(phonenumber)
        .subscribe(
          (res: any) => {
            this.myAds = res;
            console.log(res);
            // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
            // if(myAdsWithNoAddress.length > 0 ){
            //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
            // }
          })
    });
  }

  inviteFriend() {
    this.socialSharing.share("This is test with love of Kanchan", this.subject, this.file, this.link)
    .then((res:any) => {
      console.log(res);
    }).catch((err:any) => {
      console.log(err);
    })
  }

}

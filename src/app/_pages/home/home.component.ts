import { Component, OnInit } from '@angular/core';
import { advertiseService } from 'src/app/_service';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Router } from '@angular/router';

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
  userData:any;
  profileImage:string;
  constructor(
    private _advertiseService: advertiseService,
    private storage: Storage,
    private socialSharing:SocialSharing,
    private router: Router,
    ) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('roommate')));
    if(localStorage.getItem('roommate') != null){
      this.userData = JSON.parse(localStorage.getItem('roommate'))
      if(this.userData.profileimages.length > 0){
        this.profileImage = 'https://aklogical.com/api/profileImage/'+this.userData.id+ this.userData.profileimages[0].mimeType;
      }
      else{
        this.profileImage = '../../../../assets/images/user.png';
      }
      this._advertiseService.getRecentAdsVisit(this.userData.phonenumber)
      .subscribe(
        (res: any) => {
          this.myRecentAdsVisit = res;
          // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
          // if(myAdsWithNoAddress.length > 0 ){
          //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
          // }
        })
      //  this.route.params.subscribe(params => this.adsId = params.id);
      this._advertiseService.getMyAds(this.userData.phonenumber)
        .subscribe(
          (res: any) => {
            this.myAds = res;
            // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
            // if(myAdsWithNoAddress.length > 0 ){
            //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
            // }
          })
    }
    else{
      this.router.navigate(['/login'])
    }
   // this.storage.get('phonenumber').then((phonenumber) => {
      // this._advertiseService.getRecentAdsVisit(phonenumber)
      // .subscribe(
      //   (res: any) => {
      //     this.myRecentAdsVisit = res;
      //     console.log(res);
      //     // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
      //     // if(myAdsWithNoAddress.length > 0 ){
      //     //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
      //     // }
      //   })
      //  this.route.params.subscribe(params => this.adsId = params.id);
      // this._advertiseService.getMyAds(phonenumber)
      //   .subscribe(
      //     (res: any) => {
      //       this.myAds = res;
      //       console.log(res);
      //       // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
      //       // if(myAdsWithNoAddress.length > 0 ){
      //       //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
      //       // }
      //     })
   // });
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

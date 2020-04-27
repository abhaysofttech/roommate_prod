import { Component, OnInit } from '@angular/core';
import { advertiseService, NetworkService, SharedService } from 'src/app/_service';
import { Router, NavigationExtras } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    pager: false,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    autoplay:false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  myAds: any;
  notification:any;
  myRecentAdsVisit: any;
  message: string = null;
  file: string = null;
  link: string = null;
  subject: string = null;
  userData: any;
  profileImage: string;
  networkStatus: boolean;
  public loading: boolean = false;
  constructor(
    private _advertiseService: advertiseService,
    private socialSharing: SocialSharing,
    private router: Router,
    private network: Network,
    private networkService: NetworkService,
    private _sharedService: SharedService

  ) {
    this.loading = true;
    this._sharedService.networkDataStatus.subscribe(
      networkStatus => {
        this.networkStatus = networkStatus;
        if (localStorage.getItem('roommate') != null) {
          this.userData = JSON.parse(localStorage.getItem('roommate'))
          this._sharedService.setUserData(this.userData); // Set the user data to the shared service
          if (this.userData.profileimages.length > 0 && networkStatus) {
            this.profileImage = 'https://aklogical.com/api/profileImage/' + this.userData.id + this.userData.profileimages[0].mimeType;
          }
          else {
            this.profileImage = '../../../../assets/images/user.png';
          }


          if (networkStatus) {
            setInterval(() => {
              this.loading = false;
            }, 1000);
            this._advertiseService.getRecentAdsVisit(this.userData.phonenumber)
              .subscribe(
                (res: any) => {
                  this.myRecentAdsVisit = res;
                })
            this._advertiseService.getMyAds(this.userData.phonenumber)
              .subscribe(
                (res: any) => {
                  this.myAds = res;
                })
            this._advertiseService.getNotification(this.userData.id, 'Active')
              .subscribe(
                (res: any) => {
                  res ! == 'No record' ? this.notification = [] : this.notification = res.requestData;
                })
          }
        }
        else {
          this.loading = false;
          this.router.navigate(['/login'])
        }
      })
  }

  inviteFriend() {
    this.socialSharing.share("This is test with love of Kanchan", this.subject, this.file, this.link)
      .then((res: any) => {
        console.log(res);
      }).catch((err: any) => {
        console.log(err);
      })
  }

  notificationFn(){
    let navigationExtras: NavigationExtras = { state: { userId: this.userData.id } };
    this.router.navigate(['/pages/profile/notification'], navigationExtras);
  }
}

import { Component, OnInit } from '@angular/core';
import { advertiseService, NetworkService, ConnectionStatus, SharedService } from 'src/app/_service';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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
    private storage: Storage,
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
                  debugger
                  this.myAds = res;
                })
            this._advertiseService.getNotification(this.userData.id, 'Active')
              .subscribe(
                (res: any) => {
                  console.log(res);
                  this.notification = res.requestData;
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

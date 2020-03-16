import { Component, OnInit } from '@angular/core';
import { advertiseService, NetworkService, ConnectionStatus, SharedService } from 'src/app/_service';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myAds: any;
  myRecentAdsVisit: any;
  message: string = null;
  file: string = null;
  link: string = null;
  subject: string = null;
  userData: any;
  profileImage: string;
  networkStatus: boolean;
  constructor(
    private _advertiseService: advertiseService,
    private storage: Storage,
    private socialSharing: SocialSharing,
    private router: Router,
    private network: Network,
    private networkService: NetworkService,
    private _sharedService: SharedService

  ) {
    this._sharedService.networkDataStatus.subscribe(
      networkStatus => {
        this.networkStatus = networkStatus;
        if (localStorage.getItem('roommate') != null) {
          this.userData = JSON.parse(localStorage.getItem('roommate'))
          if (this.userData.profileimages.length > 0 && networkStatus) {
            this.profileImage = 'https://aklogical.com/api/profileImage/' + this.userData.id + this.userData.profileimages[0].mimeType;
          }
          else {
            this.profileImage = '../../../../assets/images/user.png';
          }

         
          if (networkStatus) {
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
          }
        }
        else {
          this.router.navigate(['/login'])
        }
      })
  }
  ngOnInit(){
    // this._sharedService.networkDataStatus.subscribe(
    //   networkStatus => {
    //     this.networkStatus = networkStatus;
    //     if (localStorage.getItem('roommate') != null) {
    //       this.userData = JSON.parse(localStorage.getItem('roommate'))
    //       if (this.userData.profileimages.length > 0 && networkStatus) {
    //         this.profileImage = 'https://aklogical.com/api/profileImage/' + this.userData.id + this.userData.profileimages[0].mimeType;
    //       }
    //       else {
    //         this.profileImage = '../../../../assets/images/user.png';
    //       }

         
    //       if (networkStatus) {
    //         this._advertiseService.getRecentAdsVisit(this.userData.phonenumber)
    //         .subscribe(
    //           (res: any) => {
    //             this.myRecentAdsVisit = res;

    //           })
    //         this._advertiseService.getMyAds(this.userData.phonenumber)
    //           .subscribe(
    //             (res: any) => {
    //               this.myAds = res;
    //             })
    //       }
    //     }
    //     else {
    //       this.router.navigate(['/login'])
    //     }
    //   })
  }

  initAPP() {
  
    
    if (localStorage.getItem('roommate') != null) {
      this.userData = JSON.parse(localStorage.getItem('roommate'))
      if (this.userData.profileimages.length > 0 && this.networkStatus) {
        this.profileImage = 'https://aklogical.com/api/profileImage/' + this.userData.id + this.userData.profileimages[0].mimeType;
      }
      else {
        this.profileImage = '../../../../assets/images/user.png';
      }
      this._advertiseService.getRecentAdsVisit(this.userData.phonenumber)
        .subscribe(
          (res: any) => {
            this.myRecentAdsVisit = res;

          })
      if (this.networkStatus) {
        this._advertiseService.getMyAds(this.userData.phonenumber)
          .subscribe(
            (res: any) => {
              this.myAds = res;
            })
      }
    }
    else {
      this.router.navigate(['/login'])
    }
  }
  inviteFriend() {
    this.socialSharing.share("This is test with love of Kanchan", this.subject, this.file, this.link)
      .then((res: any) => {
        console.log(res);
      }).catch((err: any) => {
        console.log(err);
      })
  }

}

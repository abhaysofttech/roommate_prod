import { Component, OnInit } from '@angular/core';
import { advertiseService, SharedService } from 'src/app/_service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.scss'],
})
export class AdvertisementDetailsComponent implements OnInit {
  adsId = '';
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
  userData: any;

  constructor(
    private _advertiseService: advertiseService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private callNumber: CallNumber,
    public alertController: AlertController,
    private _sharedService: SharedService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.adsId = params.id);
    this._advertiseService.getAdsDetails(this.adsId)
      .subscribe(
        res => {
          this.Ads = res;
          this.Ads.visitedContact = false;
          this._sharedService.getUserData.subscribe(
            (userData: any) => {
              this.userData = userData;
              this.Ads.adsvisits.filter(visitData => {
                if (visitData.phonenumber == this.userData.phonenumber) return this.Ads.visitedContact = true
              })
            })

        })
  }

  viewContact(adsDetails) {
    this._advertiseService.adsVisits(adsDetails.id, this.userData.phonenumber)
      .subscribe(
        (res: any) => {
          this.Ads.filter(x => { return x.id == res.adsId; }).map(data => {
            return data.visitedContact = true
          });
        })

  }
  callJoint(telephoneNumber) {
    this.callNumber.callNumber(telephoneNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  viewGallary() {
    this.router.navigate(['/pages/advertise/imageGallery', this.adsId]);
  }



  async requestImage() {
    const alert = await this.alertController.create({
      header: 'Requested Successfully !',
      message: 'Nice to have interest, Share your photos request with Owner',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // this.router.navigate(['/pages']);
          }
        }
      ]
    });

    await alert.present();
  }
}

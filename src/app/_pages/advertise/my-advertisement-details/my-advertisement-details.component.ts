import { Component, OnInit } from '@angular/core';
import { advertiseService } from 'src/app/_service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private _advertiseService: advertiseService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.adsId = params.id);
    this._advertiseService.getAdsDetails(this.adsId)
      .subscribe(
        res => {
          this.Ads = res;
        })
  }

  viewGallary() {
    this.router.navigate(['/pages/advertise/imageGallery', this.adsId]);
  }

  async closeAds(id) {
    debugger
    const alert = await this.alertController.create({
      header: 'Close Advertisement!',
      message: `Do you really want to close ${this.Ads.bhkType} for ${this.Ads.marital} ${this.Ads.gender} Advertisement  `,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this._advertiseService.updateAds(this.Ads.id, false)
            //  .pipe(first())
            .subscribe(
              data => {
                this.successCloseAds();
              },
              error => {
                //  this.alertService.error(error);
                //  this.loading = false;
              });
          }
        },
        {
          text: 'No',
          handler: () => {
            // this.router.navigate(['/pages']);
          }
        }
      ]
    });
    await alert.present();
  }

  async successCloseAds() {
    const alert = await this.alertController.create({
      header: 'Close Advertisement!',
      message: `Your ${this.Ads.bhkType} for ${this.Ads.marital} ${this.Ads.gender} Advertisement Closed Successful `,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/pages']);
          }
        }
      ]
    });
    await alert.present();
}
}

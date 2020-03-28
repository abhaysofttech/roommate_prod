import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { advertiseService } from 'src/app/_service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.scss'],
})
export class RentDetailsComponent implements OnInit {
  adrent: FormGroup;
  //loading = false;
  submitted = false;
  adsId = '';
  address: string;
  state: string;
  city: string;
  pincode: number;
  latitude: number;
  longitude: number;
  landmark: string;
  adsDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private _advertiseService: advertiseService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController
  ) {
    this.route.params.subscribe(params => {
      this.adsId = params.id;
      if (this.adsId) {
        debugger
        this._advertiseService.getAdsDetails(this.adsId)
          .subscribe(
            (res: any) => {
              this.adsDetails = res;
              if (res.city === '') {
                // this.router.navigate(['/pages/advertise/address', this.adsId]);
  
              }
              this.setFormControlValues(res);
            })
  
      }
    });
   
   }

  ngOnInit() {
    this.adrent = this.formBuilder.group({

      // address: ['', Validators.required],
      // state: ['', Validators.required],
      // city: ['', Validators.required],
      // pincode: ['', Validators.required],
      // landmark: ['', Validators.required],
      // latitude: ['', Validators.required],
      // longitude: ['', Validators.required],


      rentAmount: ['', Validators.required],
      depositAmount: ['', Validators.required],
      rentNegotiable: [true, Validators.required],


    });
  

  }
  get f() {
    return this.adrent.controls;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Please add your property address !..',
      buttons: [
        {
          text: 'Add Address',
          handler: () => {
            this.router.navigate(['/pages/advertise/address', this.adsId]);
          }
        }
      ]
    });

    await alert.present();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.address) {
      this.presentAlert()
    }


    else {
      this._advertiseService.updateRent(this.adsId, this.adrent.value)
        //  .pipe(first())
        .subscribe(
          data => {

            this.router.navigate(['/pages/advertise/amenities', this.adsId]);
            // this.router.navigate(['/amenities', this.adsId]);
          },
          error => {
            //  this.alertService.error(error);
            //  this.loading = false;
          });
    }

  }

  setFormControlValues(adsData: any) {
    this.adrent.get('rentAmount').setValue(adsData.rentAmount);
    this.adrent.get('depositAmount').setValue(adsData.depositAmount);

    // address: ['', Validators.required],
    // state: ['', Validators.required],
    // city: ['', Validators.required],
    // pincode: ['', Validators.required],
    // landmark: ['', Validators.required],
    // latitude: ['', Validators.required],
    // longitude: ['', Validators.required],

    this.address = adsData.address;
    this.state = adsData.state;
    this.city = adsData.city;
    this.pincode = adsData.pincode;
    this.landmark = adsData.landmark;


  }


}

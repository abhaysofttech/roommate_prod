import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { advertiseService } from 'src/app/_service';
import { AlertController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';

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
  // selectedDate: string = "";
  date: String = new Date().toISOString();
   next30days = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString()
  constructor(
    private formBuilder: FormBuilder,
    private _advertiseService: advertiseService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private datePicker: DatePicker,
    public datePipe: DatePipe,

  ) {
    this.route.params.subscribe(params => {
      this.adsId = params.id;
      if (this.adsId) {
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
      // selectedDate: [this.datePipe.transform(new Date(),"dd-MM-yyyy"), Validators.required],
      availableDate: [this.datePipe.transform(new Date(),"MM-dd-yyyy"), Validators.required],

    });
    // this.selectedDate = this.datePipe.transform(new Date(),"dd-MM-yyyy");
  

  }
  get f() {
    return this.adrent.controls;
  }
 selectDate(){
   var options = {
    date: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
   }
  this.datePicker.show(options).then(
    (date) => {
      let selectedDate = this.datePipe.transform(date,"dd-MM-yyyy");
      this.adrent.get('availableDate').setValue(selectedDate);
    },
    err => console.log('Error occurred while getting date: ', err)
  );
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
    this.adrent.get('availableDate').setValue(adsData.availableDate);
    

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

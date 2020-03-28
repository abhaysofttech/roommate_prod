import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { advertiseService } from 'src/app/_service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-new-advertise',
  templateUrl: './new-advertise.component.html',
  styleUrls: ['./new-advertise.component.scss'],
})
export class NewAdvertiseComponent implements OnInit {

  adpost: FormGroup;
  loading = false;
  submitted = false;
  adsArray: Array<string> = [];
  adsId = '';
  Ads: any;
  userData: any;
  constructor(
    private formBuilder: FormBuilder,
    private _advertiseService: advertiseService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.adpost = this.formBuilder.group({
      roomType: ['Single Room', Validators.required],
      gender: ['Male', Validators.required],
      marital: ['Bachelor', Validators.required],
      apparttype: ['RoomMate', Validators.required],
      bhkType: ['1BHK', Validators.required],
      gatedSecurity: ['No', Validators.required],
      cooking: ['No', Validators.required],
      vegNonveg: ['No', Validators.required],
      bathroom: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      balcony: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      cupboard: ['', [Validators.required, Validators.min(0), Validators.max(5)]],


    });

    this.route.params.subscribe(params => this.adsId = params.id);
    if (this.adsId) {
      debugger
      this._advertiseService.getAdsDetails(this.adsId)
        .subscribe(
          res => {
            this.Ads = res;
            this.setFormControlValues(res);

          })

    }
  }
  // convenience getter for easy access to form fields

  get f() {
    return this.adpost.controls;
  }
  onSubmit() {
    debugger
    this.adsArray = [];
    this.submitted = true;

    // stop here if form is invalid
    if (this.adpost.invalid) {
      return;
    }
    this.userData = JSON.parse(localStorage.getItem('roommate'));
    if (this.userData) {
      this.adpost.value.phonenumber = this.userData.phonenumber;
      this.adpost.value.username = this.userData.firstname + " " + this.userData.lastname;
      this.adpost.value.userid = this.userData.id;
      this.adpost.value.dob = this.userData.dob;
      this.adpost.value.userGender = this.userData.userGender;
      if (!this.Ads) {
        this._advertiseService.postAds(this.adpost.value)
          .subscribe(
            data => {
              this.router.navigate(['/pages/advertise/rent-details', data]);
              // this.storage.get('myads').then((adsDetails) => {
              //   if (adsDetails) {
              //     this.adsArray = adsDetails.split(',')
              //   }
              //   //   adsDetails?{ this.adsArray.push(JSON.parse(adsDetails))}:'';
              //   this.adsArray.push(data.toString());
              //   this.storage.set('myads', this.adsArray.toString());
              //   this.router.navigate(['/pages/advertise/rent-details', data]);
              // })
            }
          )
      }
      else {
        this._advertiseService.updateRent(this.adsId, this.adpost.value)
          .subscribe(
            data => {
              this.storage.get('myads').then((adsDetails) => {
                if (adsDetails) {
                  this.adsArray = adsDetails.split(',')
                }
                //   adsDetails?{ this.adsArray.push(JSON.parse(adsDetails))}:'';
                this.adsArray.push(data.toString());

                this.storage.set('myads', this.adsArray.toString());
                // this.router.navigate(['/rent-details/${this.adsId}', data]);
                this.router.navigate(['/pages/advertise/rent-details', this.adsId, data]);

              })
            }
          )
      }
    }
  }

  setFormControlValues(adsData: any) {
    this.adpost.get('gender').setValue(adsData.gender);
    this.adpost.get('marital').setValue(adsData.marital);
    this.adpost.get('roomType').setValue(adsData.roomType);
    this.adpost.get('apparttype').setValue(adsData.apparttype);
    this.adpost.get('bhkType').setValue(adsData.bhkType);
    this.adpost.get('gatedSecurity').setValue(adsData.gatedSecurity);
    this.adpost.get('vegNonveg').setValue(adsData.vegNonveg);
    this.adpost.get('bathroom').setValue(adsData.bathroom);
    this.adpost.get('balcony').setValue(adsData.balcony);
    this.adpost.get('cupboard').setValue(adsData.cupboard);

  }

}

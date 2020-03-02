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
  constructor(
    private formBuilder: FormBuilder,
    private _advertiseService: advertiseService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
  ) { }

  ngOnInit() {
    debugger
    this.adpost = this.formBuilder.group({
      roomType: ['Single Room', Validators.required],
      gender: ['Male', Validators.required],
      marital: ['Bachelor', Validators.required],
      apparttype: ['RoomMate', Validators.required],
      bhkType: ['1BHK', Validators.required],
      gatedSecurity: ['No', Validators.required],
      cooking: ['No', Validators.required],
      vegNonveg: ['No', Validators.required],
      bathroom: ['', Validators.required],
      balcony: ['', Validators.required],
      cupboard: ['', Validators.required],


    });

    this.route.params.subscribe(params => this.adsId = params.id);
    if (this.adsId) {
      this._advertiseService.getAdsDetails(this.adsId)
        .subscribe(
          res => {
            this.Ads = res;
            console.log(res);
            this.setFormControlValues(res);

          })

    }
  }
  // convenience getter for easy access to form fields

  get f() {
    return this.adpost.controls;
  }
  onSubmit() {
    this.adsArray = [];
    this.submitted = true;

    // stop here if form is invalid
    if (this.adpost.invalid) {
      return;
    }
    this.storage.get('phonenumber').then((phonenumber) => {
      this.storage.get('username').then((username) => {
        this.storage.get('dob').then((dob) => {
          this.storage.get('userGender').then((userGender) => {
          this.adpost.value.phonenumber = phonenumber;
          this.adpost.value.username = username;
          this.adpost.value.dob = dob;
          this.adpost.value.userGender = userGender;
          if (!this.Ads) {
            this._advertiseService.postAds(this.adpost.value)
              .subscribe(
                data => {
                  console.log(data);
                  this.storage.get('myads').then((adsDetails) => {
                    if (adsDetails) {
                      this.adsArray = adsDetails.split(',')
                    }
                    //   adsDetails?{ this.adsArray.push(JSON.parse(adsDetails))}:'';
                    this.adsArray.push(data.toString());
                    this.storage.set('myads', this.adsArray.toString());
                    this.router.navigate(['/pages/advertise/rent-details', data]);
                  })
                }
              )
          }
          else {

            this._advertiseService.updateRent(this.adsId, this.adpost.value)
              .subscribe(
                data => {
                  console.log(data);
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

        });
      });
      });

    });



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

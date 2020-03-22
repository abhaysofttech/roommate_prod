import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/_service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-via-password',
  templateUrl: './login-via-password.component.html',
  styleUrls: ['./login-via-password.component.scss'],
})
export class LoginViaPasswordComponent implements OnInit {
  loginForm: FormGroup;
  userData: any;
  constructor(
    private formBuilder: FormBuilder, 
    private route: Router,
    private loginServiceService: LoginServiceService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // phonenumber: ['',  [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      phonenumber: [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (this.route.getCurrentNavigation().extras.state.phonenumber) {
      let phonenumber = this.route.getCurrentNavigation().extras.state.phonenumber;
      this.userData = this.route.getCurrentNavigation().extras.state.userData;
      this.loginForm.get('phonenumber').setValue(phonenumber);
    }
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (EMAIL_REGEXP.test(this.f.phonenumber.value)) {
      debugger
      this.loginServiceService.loginemail(this.f.phonenumber.value, this.f.password.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.route.navigate(['/pages']);
          // // Save logged in user details in local db
          // this.storage.set('phonenumber', this.f.phonenumber.value)
          // this.storage.set('username', data.firstname)
          // this.storage.set('dob', data.dob)
          // this.storage.set('userGender', data.userGender)
        },
        error => {
          //  this.alertService.error(['Login Fail', '', error]);
        //   this.loading = false;
         this.loginAlert(error);
        });
    }
    else {
        this.loginServiceService.login(this.f.phonenumber.value, this.f.password.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.route.navigate(['/pages']);
          // // Save logged in user details in local db
          // this.storage.set('phonenumber', this.f.phonenumber.value)
          // this.storage.set('username', data.firstname)
          // this.storage.set('dob', data.dob)
          // this.storage.set('userGender', data.userGender)
        },
        error => {
          //  this.alertService.error(['Login Fail', '', error]);
        //   this.loading = false;
         this.loginAlert(error);
        });
    }

  }

  async loginAlert(error) {
    const alert = await this.alertController.create({
      header: 'Login Fail!',
      message: error.error.message,
      buttons: [
        {
          text: 'Retry',
        }
      ]
    });
    await alert.present();
  }
}

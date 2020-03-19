import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { LoginServiceService } from '../_service/login-service.service';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
// import { LocationSelect } from '../pages/location-select/location-select.page';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { LoginServiceService } from 'src/app/_service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loading = false;
  returnUrl: any;
  router: any;
  // AuthenticationService:any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$";
  constructor(
    private formBuilder: FormBuilder, private route: Router,
    private loginServiceService: LoginServiceService,
    private storage: Storage,
    //  private alertService: AlertService,
    public navCtrl: NavController, public modalCtrl: ModalController,
    public alertController: AlertController,
  ) { }
  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      phonenumber: ['',  [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if(localStorage.getItem('roommate') != null){
    //  let userData:any = localStorage.getItem('roommate');
    this.route.navigate(['/pages']);
    }
    // this.storage.get('phonenumber').then((phonenumber) => {
    //   //  this.route.params.subscribe(params => this.adsId = params.id);
    //   if (phonenumber) {
    //     this.route.navigate(['/pages']);
    //   }
    // });

  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }




  onSubmit() {
   
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginServiceService.login(this.f.phonenumber.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.route.navigate(['/pages']);
          // Save logged in user details in local db
          this.storage.set('phonenumber', this.f.phonenumber.value)
          this.storage.set('username', data.firstname)
          this.storage.set('dob', data.dob)
          this.storage.set('userGender', data.userGender)
        },
        error => {
          //  this.alertService.error(['Login Fail', '', error]);
          this.loading = false;
         this.loginAlert(error);
        });
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

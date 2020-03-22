import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
// import { LoginServiceService } from '../_service/login-service.service';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
// import { LocationSelect } from '../pages/location-select/location-select.page';
import { NavController, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { LoginServiceService } from 'src/app/_service';
import { timer } from 'rxjs';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';

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
    public actionSheetController: ActionSheetController
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // phonenumber: ['',  [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      phonenumber: [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (localStorage.getItem('roommate') != null) {
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
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (EMAIL_REGEXP.test(this.f.phonenumber.value)) {
      this.loginServiceService.checkemail(this.f.phonenumber.value)
        .subscribe(
          (res: any) => {
            console.log(res)
            if (res == 'No record') {
              let navigationExtras: NavigationExtras = { state: { email: this.f.phonenumber.value } };
              this.route.navigate(['/register'], navigationExtras);
            }
            else {
              // this.modalCtrl.create({
              //   component: ActionSheetComponent,
              //   cssClass: 'action-sheet-modal-css',
              //   componentProps: { phonenumber: this.f.phonenumber.value , userData : res.user}
              // }).then((modalElement) => {
              //   modalElement.present();
              // })

              let navigationExtras: NavigationExtras = { state: { phonenumber: this.f.phonenumber.value, userData : res.user } };
              this.route.navigate(['/loginviapassword'], navigationExtras);

            }
          })
    }
    else {
      this.loginServiceService.checkphonenumber(this.f.phonenumber.value)
        .subscribe(
          (res: any) => {
            console.log(res)
            if (res == 'No record') {
              let navigationExtras: NavigationExtras = { state: { phonenumber: this.f.phonenumber.value } };
              this.route.navigate(['/register'], navigationExtras);
            }
            else {
              this.modalCtrl.create({
                component: ActionSheetComponent,
                cssClass: 'action-sheet-modal-css',
                componentProps: { phonenumber: this.f.phonenumber.value, userData : res.user }
              }).then((modalElement) => {
                modalElement.present();
              })

            }
          })

    }

    // this.submitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // this.loading = true;


    // this.presentActionSheet();
    // this.loginServiceService.login(this.f.phonenumber.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.route.navigate(['/pages']);
    //       // Save logged in user details in local db
    //       this.storage.set('phonenumber', this.f.phonenumber.value)
    //       this.storage.set('username', data.firstname)
    //       this.storage.set('dob', data.dob)
    //       this.storage.set('userGender', data.userGender)
    //     },
    //     error => {
    //       //  this.alertService.error(['Login Fail', '', error]);
    //       this.loading = false;
    //      this.loginAlert(error);
    //     });
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}

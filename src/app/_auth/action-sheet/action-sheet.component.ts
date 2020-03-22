import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent implements OnInit {
  [x: string]: any;
  loginOTPForm: FormGroup;
  @Input("phonenumber") phonenumber;
  @Input("userData") userData;
  previewImages:any;

  timeLeft: number = 10;
  interval;
  constructor(
    private formBuilder: FormBuilder,
    private modalController:ModalController,
    private route: Router,
  ) { }
  ngOnInit() {
    this.loginOTPForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.phonenumber = this.phonenumber;
    this.userData = this.userData;
    this.oberserableTimer();
    
  }
  get f() { return this.loginOTPForm.controls; }


  closeModal(){
    this.modalController.dismiss();
  }
  resend(){
    console.log("Resend")
  }
  oberserableTimer() {
    this.timeLeft = 10;

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);

      }
    },1000)
  }
  viaPassword(){
    let navigationExtras: NavigationExtras = { state: { phonenumber: this.phonenumber } };
    this.route.navigate(['/loginviapassword'], navigationExtras);
    this.modalController.dismiss();
  }


}

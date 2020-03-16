import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/_service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  loading = false;
  submitted = false;
  croppedImagepath: SafeResourceUrl;
  profilePicBase64: string;
  alertService: any;

  constructor(
    private formBuilder: FormBuilder,
    private _loginServiceService:LoginServiceService,
    private route:Router
  ) { }

  ngOnInit() {
    this.croppedImagepath = 'assets/imgs/blank-avatar.jpg';

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      userGender: ['', Validators.required],
      dob: ['', Validators.required],
      phonenumber: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.route.navigate(['/'])

    // this._loginServiceService.register(this.registerForm.value)
    // .subscribe(
    //   data => {
    //     console.log(data);
    //     this.route.navigate(['/'])
    //   }
      
    // )
    

}
}

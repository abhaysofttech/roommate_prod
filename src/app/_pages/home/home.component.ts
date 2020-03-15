import { Component, OnInit } from '@angular/core';
import { advertiseService } from 'src/app/_service';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myAds: any;
  myRecentAdsVisit:any;
  message:string = null;
  file:string= null;
  link:string = null;
  subject:string = null;
  userData:any;
  profileImage:string;

  scheduled = [];
  constructor(
    private _advertiseService: advertiseService,
    private storage: Storage,
    private socialSharing:SocialSharing,
    private router: Router,
    private platform: Platform,
    private localNotifications:LocalNotifications,
    private alterCtrl:AlertController
    ) {
      this.platform.ready().then(() => {
        this.localNotifications.on('click').subscribe(res =>{
          console.log('click: ', res)
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, res.text, msg);
        })

        this.localNotifications.on('trigger').subscribe(res =>{
          console.log('trigger: ', res)
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, res.text, msg);
        })
      })
     }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('roommate')));
    if(localStorage.getItem('roommate') != null){
      this.userData = JSON.parse(localStorage.getItem('roommate'))
      if(this.userData.profileimages.length > 0){
        this.profileImage = 'https://aklogical.com/api/profileImage/'+this.userData.id+ this.userData.profileimages[0].mimeType;
      }
      else{
        this.profileImage = '../../../../assets/images/user.png';
      }
      this._advertiseService.getRecentAdsVisit(this.userData.phonenumber)
      .subscribe(
        (res: any) => {
          this.myRecentAdsVisit = res;
          // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
          // if(myAdsWithNoAddress.length > 0 ){
          //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
          // }
        })
      //  this.route.params.subscribe(params => this.adsId = params.id);
      this._advertiseService.getMyAds(this.userData.phonenumber)
        .subscribe(
          (res: any) => {
            this.myAds = res;
            // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
            // if(myAdsWithNoAddress.length > 0 ){
            //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
            // }
          })
    }
    else{
      this.router.navigate(['/login'])
    }
   // this.storage.get('phonenumber').then((phonenumber) => {
      // this._advertiseService.getRecentAdsVisit(phonenumber)
      // .subscribe(
      //   (res: any) => {
      //     this.myRecentAdsVisit = res;
      //     console.log(res);
      //     // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
      //     // if(myAdsWithNoAddress.length > 0 ){
      //     //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
      //     // }
      //   })
      //  this.route.params.subscribe(params => this.adsId = params.id);
      // this._advertiseService.getMyAds(phonenumber)
      //   .subscribe(
      //     (res: any) => {
      //       this.myAds = res;
      //       console.log(res);
      //       // let myAdsWithNoAddress: any = res.filter(x => { return x.city === '' }).map(data => { return data });
      //       // if(myAdsWithNoAddress.length > 0 ){
      //       //   this.router.navigate(['/address', myAdsWithNoAddress[0].id]);
      //       // }
      //     })
   // });
  }

  inviteFriend() {
    this.socialSharing.share("This is test with love of Kanchan", this.subject, this.file, this.link)
    .then((res:any) => {
      console.log(res);
    }).catch((err:any) => {
      console.log(err);
    })
  }


  scheduleNotification(){
    this.localNotifications.schedule({
      id:1,
      title:'Attention',
      text:'Schedule Notification',
      data:{mydata:'This is hidden message this is'},
      trigger:{in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true,
      vibrate: true
    });
  }

  recurringNotification(){
    this.localNotifications.schedule({
      id:22,
      title:'Attention Recurring',
      text:'Recurring Notification',
      data:{mydata:'This is hidden message this is'},
      trigger:{every: ELocalNotificationTriggerUnit.MINUTE},
      foreground: true,
      vibrate: true
    });
  }

  repeatingDaily(){
    this.localNotifications.schedule({
      id:42,
      title:'Attention Repeating',
      text:'Repeating Notification',
      data:{mydata:'This is hidden message this is'},
      trigger:{every: {hour:11, minute:49}}
    });
  }

  getAll(){
    this.localNotifications.getAll().then(res =>{ 
      this.scheduled = res;
    })
  }

  showAlert(header, sub, msg){
    this.alterCtrl.create({
      header:header,
      subHeader:sub,
      message:msg,
      buttons:['OK']
    }).then(alert => alert.present());
  }
}

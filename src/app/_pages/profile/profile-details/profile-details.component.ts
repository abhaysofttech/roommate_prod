import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {

  message:string = null;
  file:string= null;
  link:string = null;
  subject:string = null;
  constructor(private socialSharing:SocialSharing) { }

  inviteFriend() {
    this.socialSharing.share(this.message, this.subject, this.file, this.link)
    .then((res:any) => {
      console.log(res);
    }).catch((err:any) => {
      console.log(err);
    })
  }


}

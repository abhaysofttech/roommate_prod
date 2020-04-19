import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { advertiseService } from 'src/app/_service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notification:any;
  userId:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _advertiseService: advertiseService,
  ) { }

  ngOnInit() {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userId = this.router.getCurrentNavigation().extras.state.userId;
        this._advertiseService.getNotification(this.userId, 'Active')
        .subscribe(
          (res: any) => {
            console.log(res);
            this.notification = res;
          })
      }
   
  }

}

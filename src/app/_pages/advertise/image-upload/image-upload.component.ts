import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  adsId = '';
  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.adsId = params.id);
  }
  skip(){
    this.skipConform()
  }

  async skipConform() {
    const alert = await this.alertController.create({
      header: 'Upload Photos',
      message: 'Do you want to upload photos later?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            // this.router.navigate(['/pages']);
            this.updatedsuccessAds();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
      ]
    });

    await alert.present();
  }

  async updatedsuccessAds() {
    const alert = await this.alertController.create({
      header: 'Advertise Upoaded !',
      message: 'Your advertise added successfully',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/pages']);
          }
        }
      ]
    });

    await alert.present();
  }

}

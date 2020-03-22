import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit {
  @Input("imageID") imageID;
  previewImages:any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pager: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  constructor(
    private modalController:ModalController
  ) { }
  ngOnInit() {
    this.previewImages = this.imageID
  }

  closeModal(){
    this.modalController.dismiss();
  }

}

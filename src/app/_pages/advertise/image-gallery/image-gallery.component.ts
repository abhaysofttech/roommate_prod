import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  croppedImagepath: SafeResourceUrl;
  profilePicBase64: string;
  constructor(private camera: Camera,
    private crop: Crop,
    // private base64: Base64,
    public actionSheetController: ActionSheetController,
    private sanitizer: DomSanitizer,

    private modalController: ModalController
  ) { }

  openModal(imageID){
    this.modalController.create({
      component:ImagePreviewComponent,
      cssClass: 'my-custom-modal-css',
      componentProps:{imageID: imageID}
    }).then((modalElement) =>{
      modalElement.present();
    })
  }

  image: any = ''
  openCam() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //alert(imageData)
      this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      // Handle error
      // alert("error " + JSON.stringify(err))
    });

  }
  cancelUpload(){
    this.image = '';
  }
  uploadImage(){
    this.image = '';

  }
  pickImage(sourceType) {
    console.log(sourceType);
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);

      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cropImage(imageData)
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 100, targetWidth: -1, targetHeight: -1 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];
    this.croppedImagepath = (<any>window).Ionic.WebView.convertFileSrc(ImagePath);

    // this.base64.encodeFile(ImagePath).then((base64File: string) => {
    //   //   console.log(base64File);
    //   //  this.croppedImagepath = base64File;
    //   this.profilePicBase64 = base64File;
    //   this.croppedImagepath = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
    // }, (err) => {
    //   console.log(err);
    // });

    // this.file.readAsDataURL(filePath, imageName).then(base64 => {
    //     this.croppedImagepath = base64;
    // }, error => {
    //     alert('Error in showing image' + error);
    // });
  }
}

import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { advertiseService } from 'src/app/_service';
import { ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { SERVER_URL } from 'src/environments/environment';
@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {
  croppedImagepath: SafeResourceUrl;
  profilePicBase64: string;
  adsId = '';
  lastImage: string = null;
  gallaryImages:any;
  constructor(private camera: Camera,
    private route: ActivatedRoute,
    private crop: Crop,
    // private base64: Base64,
    public actionSheetController: ActionSheetController,
    private sanitizer: DomSanitizer,
    private _advertiseService: advertiseService,
    private modalController: ModalController,
    private platform: Platform,
    public toastCtrl: ToastController,
    private file: File,
    private filePath: FilePath,
    private transfer: FileTransfer,

  ) { }
  ngOnInit() {
    this.route.params.subscribe(params => this.adsId = params.id);
    this.getImagesGallary();

  }
  openModal(imageID) {
    this.modalController.create({
      component: ImagePreviewComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: { imageID: imageID }
    }).then((modalElement) => {
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
  cancelUpload() {
    this.image = '';
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

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 750,
      targetHeight: 1024,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    }
    this.camera.getPicture(options).then((imagePath) => {

      // imagePath is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imagePath;
      // this.cropImage(imagePath)
      this.image = (<any>window).Ionic.WebView.convertFileSrc(imagePath);
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      // Handle error
      this.presentToast('Error while selecting image.');
    });
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


  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  async presentToast(text) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }

  uploadImage() {
    // Destination URL
    var url = `${SERVER_URL}/postads/${this.adsId}/images`;

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      params: { label: "testing 8888", adsId: this.adsId, },
      fileKey: "data",
      // data:filename,
      fileName: filename,
      chunkedMode: false,
      // mimeType: "multipart/form-data",
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.upload(targetPath, url, options, true).then(data => {
      // this.loading.dismissAll()
      this.getImagesGallary();
      this.presentToast('Image succesful uploaded.');
    }, err => {
      // this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });


  }

  getImagesGallary(){
    this._advertiseService.getImage(this.adsId)
    .subscribe(
      (res: any) => {
        this.gallaryImages = res.images;
     
      })
  }
  
}

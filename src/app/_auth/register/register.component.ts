import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/_service';
import { AlertController, ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { SERVER_URL } from 'src/environments/environment';
import { MustMatch } from './validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  croppedImagepath: SafeResourceUrl;
  profilePicBase64: string;
  alertService: any;

  userData: any;
  profileImage: string;
  lastImage: string = null;
  constructor(
    private formBuilder: FormBuilder,
    private _loginServiceService: LoginServiceService,
    private route: Router,
    private platform: Platform,
    private camera: Camera,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    public toastCtrl: ToastController,
    private file: File,
    private filePath: FilePath,
    private transfer: FileTransfer,
  ) { }

  ngOnInit() {
    this.profileImage = 'assets/imgs/blank-avatar.jpg';

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      userGender: ['', Validators.required],
      dob: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
    }
  //   ,{
  //     validator: MustMatch('password', 'confirmPassword')
  // }
  );
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



    // console.log(this.registerForm.value);
    // this.route.navigate(['/'])
    // this.registerForm.removeControl('confirmPassword');
    this._loginServiceService.register(this.registerForm.value)
      .subscribe(
        data => {
          console.log(data);
          if (this.profileImage != 'assets/imgs/blank-avatar.jpg') {
            this.uploadImage()
          }
          else {
            this.route.navigate(['/'])

          }
        },
        error => {
        this.presentToast(error.error.message);
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
      this.cropImage(imagePath)


    }, (err) => {
      // Handle error
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

  showCroppedImage(imagePath) {
    var copyPath = imagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = imagePath.split(imageName)[0];
    this.profileImage = (<any>window).Ionic.WebView.convertFileSrc(imagePath);
    if (this.platform.is('android')) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
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
      position: 'top',
      cssClass: "toast-scheme",
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
    var url = `${SERVER_URL}/users/${this.userData.id}/profileimages`;

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      params: { userName: this.userData.firstname, profileId: this.userData.id, },
      fileKey: "data",
      // data:filename,
      fileName: filename,
      chunkedMode: false,
      // mimeType: "multipart/form-data",
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.upload(targetPath, url, options, true).then(data => {
      // this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
      this.route.navigate(['/'])
    }, err => {
      // this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
      this.route.navigate(['/'])
    });


  }
}

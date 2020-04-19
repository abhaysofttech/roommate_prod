import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent, RegisterComponent, LoginViaPasswordComponent } from './_auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SharedModule } from './_shared/shared.module';
import { Crop } from '@ionic-native/crop/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ActionSheetComponent } from './_auth/action-sheet/action-sheet.component';
import { TokenInterceptor } from './_helpers';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginViaPasswordComponent,
    RegisterComponent,
    ActionSheetComponent
    ],
  entryComponents: [ActionSheetComponent],
  imports: [
    SharedModule,
    BrowserModule,
    CommonModule, 
    FormsModule,
        ReactiveFormsModule, 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__roommatedb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    ScreenOrientation,
    SocialSharing,
    File,
    FilePath,
    FileTransfer,
    Camera,
    Crop,
    CallNumber,
    Network,
    DatePicker,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

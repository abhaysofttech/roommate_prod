import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService, ConnectionStatus, SharedService } from './_service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  networkStatus:boolean = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    private network: Network,
    private networkService: NetworkService,
    private _sharedService: SharedService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#ffc309');
      this.splashScreen.hide();
      // set to portrait
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      // watch network for a disconnection
      let disconnectSubscription = this.network.onDisconnect().subscribe((res) => {
        console.log('network was disconnected :-(');
        this.networkStatus = false;
        this._sharedService.networkStatus(false); // Shared Data in shared service
      });

      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe((res) => {
        console.log('network connected!');
        this.networkStatus = true;
        this._sharedService.networkStatus(true); // Shared Data in shared service


        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            console.log('we got a wifi connection, woohoo!');
          }
        }, 3000);
      });

      if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
        this.networkStatus = false;
        this._sharedService.networkStatus(false);
      } else {
        this.networkStatus = true;
        this._sharedService.networkStatus(true);
     
      }

    
    });
  }
}

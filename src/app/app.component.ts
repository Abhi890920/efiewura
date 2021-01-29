import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from './HttpService/http.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  //styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public httpService:HttpService,
    public navCtrl:NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.httpService.createDB()
      this.rootPage=localStorage.getItem('user_type')?this.navCtrl.navigateRoot('list'):this.navCtrl.navigateRoot('home')
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

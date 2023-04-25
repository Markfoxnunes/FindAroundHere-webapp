import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { AdMob } from '@capacitor-community/admob';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent  {

  constructor(
    private platform: Platform,
    public menuCtrl: MenuController,
    private translate: TranslateService,
    private router: Router,
  ) {
    
    this.initializeApp();

  }

  async intializeAdmobs(){
    const {status} = await AdMob.trackingAuthorizationStatus();
    console.log(status)
    if(status === 'notDetermined'){
      console.log('Display information before ads load first time')
    }
    AdMob.initialize({
      requestTrackingAuthorization: true,
      //testingDevices: [],
      initializeForTesting: true,
    });
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
       SplashScreen.hide();
       this.validateAuthState();
       }, 3000);
       this.intializeAdmobs();
    })
    if(localStorage.getItem('onboardSeen') === 'true'){
      this.router.navigateByUrl('/tabs/home', { skipLocationChange: true, replaceUrl: true });
    } else {
      this.router.navigateByUrl('/onboarding', { skipLocationChange: true, replaceUrl: true });
    }
  }

  validateAuthState(){
    this.translate.setDefaultLang('en');
    let lang = localStorage.getItem('lang')
    console.log(lang);
      if (lang == null || lang == undefined)
         this.translate.use('en');
      else
        this.translate.use(lang);
    }

 
}


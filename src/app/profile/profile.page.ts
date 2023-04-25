/*
  Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Deal - ionic 6 Buy and Sell, Admin, Admob
  Created : 20-August-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts.com/license
  Copyright © 2022-present Craft Software System.
*/

import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, isPlatform, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChildren('templateList', { read: ElementRef })
  templateListRef: QueryList<ElementRef>;
  public userSubscription: Subscription;
  public photoURL: any;
  public displayName: any;
  public email;
  public about;
  public bookmark = [];
  subscription = new Subscription();
  public account;
  userId
  public accountList = [
    {
      "name": "Account",
      "url": "edit-profile",
      "color": "#0033cc",
      "icon": "person"
    },
    {
      "name": "My Ads",
      "url": "my-adverts",
      "color": "#ff0066",
      "icon": "grid"
    },
    {
      "name": "Language",
      "url": "language",
      "color": "#660066",
      "icon": "language"
    },
    {
      "name": "Settings",
      "url": "settings",
      "color": "#0099cc",
      "icon": "settings"
    },
    {
      "name": "Notifications",
      "url": "notifications",
      "color": "#0099",
      "icon": "notifications"
    },
    {
      "name": "FAQ",
      "url": "faq",
      "color": "#00cc00",
      "icon": "help-circle"
    },
    {
      "name": "Logout",
      "url": "logout",
      "color": "#cc0099",
      "icon": "log-out"
    },
  ]

  constructor(
    public dataService: DataService, 
    public auth: AuthService,
    private animationCtrl: AnimationController,
    private platform: Platform,
    public router: Router) {}

  ngOnInit() {
    setInterval(()=> {
      this.getUserDetails()
   }, 2000)
  }

  getUserDetails(){ 
    const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if(user) {
         this.userId = user.uid;
         this.dataService.getUserById(this.userId)
         .subscribe(data => {
          // if the user doesn't exists, show this
          if (!data) {
            console.log('no data')
         } else {
          this.displayName  = data.displayName;
          this.account = data.account;
          this.email = data.email;
          this.photoURL = data.photoURL;
        }
       });
      }
    })
  }

  goFollowers(){
    this.router.navigate(['/followers', {
      userId: localStorage.getItem('uid')
    }])
  }

  goFollowing(){
    this.router.navigate(['/following', {
      userId: localStorage.getItem('uid')
    }])
  }

  goMyPost(){
    this.router.navigate(['/my-posts'])
  }

  goEditProfile(){
    this.router.navigate(['/edit-profile'])
  }

  goMyInterest(){
    this.router.navigate(['/interest'])
  }

  goMyBook(){
    this.router.navigate(['/bookmark'])
  }

  goSettings(){
    this.router.navigate(['/settings'])
  }

  ionViewDidEnter() {
      this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {})
    }
    
    ionViewWillLeave() {
      this.subscription.unsubscribe();
    }

    viewURL(url){
       if (url === 'logout'){
        this.logOut()
      } else {
        this.router.navigate([url]);
      }
    }

    async logOut(){
      this.auth.logout();
      localStorage.removeItem('uid');
      localStorage.removeItem('isLoggedIn');
      localStorage.clear();
      this.router.navigateByUrl('/tabs/home', { skipLocationChange: true, replaceUrl: true });
    
    }

}

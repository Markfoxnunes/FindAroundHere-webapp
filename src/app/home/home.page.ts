/*
  Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Deal - ionic 6 Buy and Sell, Admin, Admob
  Created : 20-August-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts.com/license
  Copyright © 2022-present Craft Software System.
*/

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, isPlatform, Platform } from '@ionic/angular';
import { Category } from '../model/category';
import { DataService } from '../services/data.service';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { App } from '@capacitor/app';
import {
  AdMob, 
  AdOptions, 
  BannerAdOptions, 
  BannerAdPosition, 
  BannerAdSize } from '@capacitor-community/admob';
import { environment } from 'src/environments/environment';
import { Item } from '../model/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {

  @ViewChild(IonContent,  { static: true }) content: IonContent;
  public header = '#00b300';
  public categories: Category[] = [];
  public items: Item[] = [];
  public dummyArray = Array(1);
  public backToTop: boolean = false;
  public db = getFirestore();
  public userId;
 
  constructor(
    public platform: Platform,
    public dataService: DataService,
    public router: Router,
    ) {
 
     this.dataService.getCategories().subscribe((data) => {
      if(data != null){
        this.categories = data;
        this.categories = this.categories.reverse()
        this.dummyArray = []
      } else {
        this.dummyArray = []
      }
     });

     this.dataService.getNewItemList().subscribe((data) => {
      if(data != null){
        this.items = data;
        this.items = this.items.reverse()
        //this.dummyArray = []
      } else {
        //this.dummyArray = []
      }
     });
     this.bannerAds();
     this.showInterstitial();

     /*App.addListener('backButton', ({ canGoBack }) => {
      if(canGoBack){
        window.history.back();
      } else {
        App.exitApp();
      }
    });*/
   }

   search(){
    this.router.navigate(['/search'])
   }

   scrollBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 500);
  }

  getScrollPos(pos: any) {
    if (pos.detail.scrollTop > this.platform.height()) {
         this.backToTop = true;
    } else {
         this.backToTop = false;
    }
  }
  
  gotToTop() {
    this.content.scrollToTop(2000);
  }

  gotToBottom() {
    this.content.scrollToBottom(2000);
  }

  goSubcat(id, name){
   this.router.navigate(['/sub-categories', {
    id:id,
    name: name
   }])
  }

 
   ionViewWillLeave(){
    // this.hideBanner()
   }

   ionViewDidEnter(){
     this.bannerAds();
     this.showInterstitial();
   }

  async bannerAds(){
    //const adId = isPlatform('ios') ? 'ios-ad-id' : `${environment.bannerAdId}`;
    const options: BannerAdOptions = {
      adId: isPlatform('ios') ? `${environment.bannerAdIdiOS}` : `${environment.bannerAdId}`,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 60,
      //isTesting: true,
    }
     await AdMob.showBanner(options);
  }

  async hideBanner(){
   await AdMob.hideBanner();
  }

  async showInterstitial(){
    const options: AdOptions = {
      adId: isPlatform('ios') ? `${environment.interstitialAdIdiOS}` : `${environment.interstitialAdId}`,
      //isTesting: true,
    }
     await AdMob.prepareInterstitial(options);
     await AdMob.showInterstitial();
  }

  viewDetails(id){
    this.router.navigate(['/item-details', {id:id}])
  }

  call(phone){
    window.open(`tel:${phone}`);
  }

  chat(sellerId, itemId){
    const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if(user) {
         this.userId = user.uid;
         if(this.userId === sellerId){
          console.log('You are seller')
         } else {

          let chatID = this.userId + sellerId + itemId
          const docRef = doc(this.db, "users", localStorage.getItem('uid'), 'chatlist', chatID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            let chataData = docSnap.data();
            let isInRoom = chataData.inRoom;
            let chatWith = chataData.chatWith;
            let lastChat = chataData.lastChat;
            let type = chataData.type;
            let timestamp = chataData.timestamp;
      
            let updateBadgeData =  {inRoom: true, badgeCount: 0, chatID: chatID, chatWith: chatWith, type: type, lastChat: lastChat, timestamp: timestamp, itemId: itemId}
            setDoc(docRef, updateBadgeData);
          } else {
            //setDoc(docRef, updateData);
          }
          this.router.navigate(['/chatting', {
            chatID: chatID,
            userId: sellerId,
            itemId: itemId
          }])
         }
        } else {
          this.router.navigate(['/login'])
        }
      })
     }
  
}

  
    



    
  
    
  
      
    
      

      
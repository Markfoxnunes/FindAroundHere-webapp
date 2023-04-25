/*
  Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Deal - ionic 6 Buy and Sell, Admin, Admob
  Created : 20-August-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts.com/license
  Copyright © 2022-present Craft Software System.
*/

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { Auth } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { UtilityService } from '../model/utility';
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { AdMob } from '@capacitor-community/admob';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public userSubscription: Subscription;
  public db = getFirestore()
  public photoURL: any;
  public displayName: any;
  public phoneNumber: any;
  public about = '';
  public email: any;
  public uploadFile: any;
  
  constructor(
    public dataProvider: DataService, 
    private authAuths: Auth,
    public util: UtilityService,
    public translate: TranslateService,
    public loadingController: LoadingController,
    private storage: Storage,
    public toastController: ToastController,
    //public uploadProvider: UploadProvider,
    public router: Router) { }

  ngOnInit() {
    this.dataProvider.getUserById(localStorage.getItem('uid'))
    .subscribe(data => {
      // if the user doesn't exists, show this
      if (!data) {
        console.log('no data')
      } else {
        this.photoURL = data.photoURL;
        this.displayName = data.displayName;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email
      }
    });
    this.hideBanner()
  }

  async hideBanner(){
    await AdMob.hideBanner();
   }


  async uploadImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });
     if (image) {
       this.photoURL = 'data:image/jpeg;base64,' + image.base64String
       this.uploadFile = image
     }
  }


  async profileUpdate(cameraFile: Photo, displayName, phoneNumber) {
    const user = this.authAuths.currentUser;
      const path = `uploads/${user.uid}/profile.png`;
      const storageRef = ref(this.storage, path);
      try {
       await uploadString(storageRef, cameraFile.base64String, 'base64');
       const imageUrl = await getDownloadURL(storageRef);
       const userRef = doc(this.db, "users", user.uid);
       localStorage.setItem('photoURL', imageUrl);
       localStorage.setItem('displayName', displayName);
       await updateDoc(userRef, {
        photoURL: imageUrl,
        displayName: displayName,
        phoneNumber: phoneNumber,
       });
       return true;
      } catch (e) {
      return null;
     } 
  }

  async profileUpdateName(displayName, about) {
    localStorage.setItem('displayName', displayName);
    const user = this.authAuths.currentUser;
    const userRef = doc(this.db, "users", user.uid);
    await updateDoc(userRef, {
     displayName: displayName,
    });
  }

  async setup(){
    const loading = await this.loadingController.create(
      {
        cssClass: 'custom-loading'
      }
    );
    await loading.present();
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: this.displayName,
    }).then(async () => {
      if(this.uploadFile){
        await this.profileUpdate(this.uploadFile, this.displayName, this.phoneNumber);
        await loading.dismiss();
        this.presentToast(this.translate.instant('Profile update'), 'bottom', '3000', 'success')
      } else {
        await this.profileUpdateName(this.displayName, this.phoneNumber);
        await loading.dismiss();
        this.presentToast(this.translate.instant('Profile update'), 'bottom', '3000', 'success')
      }
     }).catch(async (error) => {
      // An error occurred
      console.log(error)
      await loading.dismiss();
      // ...
    });
    
  }

  async presentToast(message: string, position: any, duration: any, color: any) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: duration,
      color: color
    });
    toast.present();
  }


}


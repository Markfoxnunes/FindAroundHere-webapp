/*
  Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Deal - ionic 6 Buy and Sell, Admin, Admob
  Created : 20-August-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts.com/license
  Copyright © 2022-present Craft Software System.
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Category, Subcategory } from '../model/category';
import { DataService } from '../services/data.service';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { UtilityService } from '../model/utility';
import { TranslateService } from '@ngx-translate/core';
import { AdMob } from '@capacitor-community/admob';

@Component({
  selector: 'app-post-ads',
  templateUrl: './post-ads.page.html',
  styleUrls: ['./post-ads.page.scss'],
})
export class PostAdsPage implements OnInit  {

  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];
  public category: any;
  public subcategory;
  public showCat = false;
  public title;
  public price;
  public condition;
  public description;
  public displayName;
  public db = getFirestore();
  public phoneNumber;
  public img = 'assets/9.jpg';
  public camera = '#00b300';
  public selectedFiles: any = [];
  public imageSelect = [];
  public url;
  public loading;
  public photoURL;
  public location;
  public latitude;
  public longitude;
  public selectedPackage;
  public locality;
 
  constructor(
    public loadingCtrl: LoadingController,
    public dataService: DataService,
    public util: UtilityService,
    public translate: TranslateService,
    public modalCtrl: ModalController,
    public router: Router,
    ) {
   
     this.dataService.getCategories().subscribe((data) => {
      if(data != null){
        this.categories = data;
      }
     })

     this.hideBanner()
   }

   async hideBanner(){
    await AdMob.hideBanner();
   }

   selectCat(ev){
    console.log(ev)
    this.showCat = true;
    this.dataService.getSubCategories(this.category).subscribe((data)=> {
      if(data != null){
        this.subcategories = data;
      }
    })
   }

   async shareLocation(){
    const modal = await this.modalCtrl.create({
    component: AutoCompletePage,
    cssClass: 'half-modal'
    });
     modal.present();
    //Get returned data
    const { data } = await modal.onWillDismiss();
    if(data === undefined){
      console.log('No data')
    } else {
    console.log('this is the data', data) 
    this.location = data.address;
    this.latitude = data.lat;
    this.longitude = data.long;
    this.locality = data.locality;
    console.log(this.longitude, this.latitude, this.location)
    }
  }

   ngOnInit() {
    setInterval(()=> {
      this.getUserDetails()
   }, 2000)
  }

 
  removePhoto(image){
    this.imageSelect = this.imageSelect.filter(im => im != image);
  }

   triggerFile(){
    document.getElementById('file').click();
  }
  
  detectFiles(){
    var files = (<HTMLInputElement>document.getElementById('file')).files;
    this.selectedFiles = [];
    for(var i = 0; i < files.length; i++){
    
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
      this.imageSelect.push(this.url)
    };
    reader.readAsDataURL(files[i]);
    this.selectedFiles.push(files[i]);
      console.log(files)
    }
  
  }

  getUserDetails(){ 
    this.dataService.getUserById(localStorage.getItem('uid'))
      .subscribe(data => {
      // if the user doesn't exists, show this
      if (!data) {
        console.log('no data')
      } else {
        this.displayName = data.displayName;
        this.photoURL = data.photoURL;
        this.phoneNumber = data.phoneNumber;
       }
     });
  }

  async submit(){
    this.util.show();
    const promises = [];
    let myId = Date.now();
  
    for (var i = 0; i < this.selectedFiles.length; i++) {
      // files.values contains all the files objects
      const file = this.selectedFiles[i];
      const storage = getStorage();
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, "productImages/" + myId + "/" + file.name);
      promises.push(uploadBytes(storageRef, file, metadata).then(uploadResult => {
        return getDownloadURL(uploadResult.ref)}))
    }
  
    const photos = await Promise.all(promises);
    await console.log(photos);
  
    let param = {
      category: this.category,
      subcategory: this.subcategory,
      price: this.price,
      title: this.title,
      description: this.description,
      condition: this.condition,
      userId: localStorage.getItem('uid'),
      seller: this.displayName,
      location: this.location,
      longitude: this.longitude,
      latitude: this.latitude,
      allow: true,
      adDate: Date.now(),
      phoneNumber: this.phoneNumber,
      review: [],
      locality: this.locality,
      images: photos,
    }
    console.log(param)
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(this.db, "items"), param);
    console.log("Document written with ID: ", docRef.id);
    this.util.hide();
    this.util.showToast(this.translate.instant('Success'), 'success', 'bottom');
    this.router.navigate(['/tabs/home'])
  }

 
}


/*
  Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Deal - ionic 6 Buy and Sell, Admin, Admob
  Created : 20-August-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts.com/license
  Copyright © 2022-present Craft Software System.
*/

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { getFirestore } from 'firebase/firestore';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { Category, Subcategory } from '../model/category';
import { UtilityService } from '../model/utility';
import { DataService } from '../services/data.service';
import { doc, updateDoc } from "firebase/firestore";


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage {

  public id: any;
  public category: string;
  public subcategory: string;
  public price: string;
  public title: string;
  public description: string;
  public condition: string;
  public userId: string;
  public seller: string;
  public location: string;
  public longitude: number;
  public latitude: number;
  public locality: string;
  public images = [];
  public db = getFirestore();
  public phoneNumber: any;
  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];
  public camera = '#1dbf73';

  constructor(
    public navCtrl: NavController,
    public route: ActivatedRoute, 
    public modalCtrl: ModalController,
    public util: UtilityService,
    public dataService: DataService
    ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getItemById(this.id).subscribe((data)=> {
      this.category = data.category;
      this.subcategory = data.subcategory;
      this.price = data.price;
      this.title = data.title;
      this.description = data.description;
      this.condition = data.condition;
      this.seller = data.userId;
      this.location = data.location;
      this.longitude = data.longitude;
      this.latitude = data.latitude;
      this.locality = data.locality;
      this.phoneNumber = data.phoneNumber;
      this.images = data.images;
    });

    this.dataService.getCategories().subscribe((data) => {
      if(data != null){
        this.categories = data;
      }
     })
   }

   selectCat(ev){
    console.log(ev)
    this.dataService.getSubCategories(this.category).subscribe((data)=> {
      if(data != null){
        this.subcategories = data;
      }
    })
   }

  // select address from modal
  async shareLocation(){
    const modal = await this.modalCtrl.create({
    component: AutoCompletePage,
    cssClass: 'half-modal'
    });
     modal.present();
    //Get returned data
    const { data } = await modal.onWillDismiss();
    console.log('this is the data', data) 
    this.location = data.address;
    this.latitude = data.lat;
    this.longitude = data.long;
    this.locality = data.locality;
    console.log(this.longitude, this.latitude, this.location)
  }

  // remove image
  removePhoto(image){
    this.images = this.images.filter(im => im != image);
  }

  // submit update
  async submit(){
    this.util.show();
    let param = {
      category: this.category,
      subcategory: this.subcategory,
      price: this.price,
      title: this.title,
      description: this.description,
      condition: this.condition,
      location: this.location,
      longitude: this.longitude,
      latitude: this.latitude,
      phoneNumber: this.phoneNumber,
      locality: this.locality,
      images: this.images
    }
    const itemRef = doc(this.db, "items", this.id);
     await updateDoc(itemRef, param);
     this.util.hide();
     this.util.showToast('Success', 'success', 'bottom');
     this.navCtrl.pop();
  }

}

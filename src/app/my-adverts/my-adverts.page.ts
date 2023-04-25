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
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { doc, getDoc, getFirestore, deleteDoc } from 'firebase/firestore';
import { Item } from '../model/item';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-my-adverts',
  templateUrl: './my-adverts.page.html',
  styleUrls: ['./my-adverts.page.scss'],
})
export class MyAdvertsPage implements OnInit {

  public id: any;
  public dummyArray = Array(1)
  public items: Item[] = []
  public userId: any;
  public db = getFirestore()

  constructor(
    public router: Router,
    public alertCtrl: AlertController,
    public dataService: DataService, 
    public translate: TranslateService,
    public navCtrl: NavController) {

    this.dataService.getmyItems(localStorage.getItem('uid')).subscribe((data)=> {
      if(data != null){
        this.items = data;
        this.dummyArray = [];
      } else {
        this.dummyArray = [];
      }
    })
   }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.pop()
  }

  viewDetails(id){
    this.router.navigate(['/item-details', {id:id}])
  }

  edit(id){
    this.router.navigate(['/edit-item', {id:id}])
  }

  async delete(id) {
    let alert = await this.alertCtrl.create({
      message: this.translate.instant('Do you want to delete this ads?'),
      buttons: [
        {
          text: this.translate.instant('No'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('Yes Delete'),
          handler: async () => {
            deleteDoc(doc(this.db, "items", id));
          }
        }
      ]
    });
    alert.present();
  }

}


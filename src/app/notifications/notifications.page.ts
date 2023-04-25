
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
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { Item } from '../model/item';
import { Notification } from '../model/notification';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  public id: any;
  public dummyArray = Array(1)
  public items: Notification[] = []
  public userId: any;
  public db = getFirestore()

  constructor(
    public routes: ActivatedRoute, 
    public router: Router,
    public dataService: DataService, 
    public navCtrl: NavController) {

    this.id = this.routes.snapshot.paramMap.get('id')
    this.dataService.getNote().subscribe((data)=> {
      if(data != null){
        this.items = data;
        this.dummyArray = [];
      } else {
        this.dummyArray = [];
      }
    })
   }
  }
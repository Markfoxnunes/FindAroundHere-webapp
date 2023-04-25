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
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import { UtilityService } from '../model/utility';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  public itemName: any;
  public itemPrice: any;
  public images = [];
  public image: any;
  public id: any;
  public myId: any;
  public reason: any;
  public description: any;
  public resaons = [
    {
      "name": 'This is frudelent'
    },
    {
      "name": 'This ad is spam'
    },
    {
      "name": 'The price is wrong'
    },
    {
      "name": 'Wrong category'
    },
    {
      "name": 'Seller ask for prepayment'
    },
    {
      "name": 'It is sold'
    },
    {
      "name": 'User is unreachable'
    },
    {
      "name": 'Other'
    }
  ]

  db = getFirestore()

  constructor(
    public util: UtilityService,
    public navCtrl: NavController,
    public translate: TranslateService,
    public route: ActivatedRoute, 
    public dataService: DataService
    ) { 

    this.id = this.route.snapshot.paramMap.get('id')
    this.myId = localStorage.getItem('uid')
    this.dataService.getItemById(this.id).subscribe(res => {
      if(res){
        this.itemName = res.title;
        this.itemPrice = res.price;
        this.images = res.images;
        this.image = this.images[0]
      } else {
      }
    });

  }
  ngOnInit() {
  }

  async report(){
    let data = {
      itemId: this.id,
      userId: localStorage.getItem('uid'),
      reportDate: Date.now(),
      description: this.description,
      reason: this.reason
    }
    // Add a new document with a generated id.
     const docRef = await addDoc(collection(this.db, "report"), data);
     console.log("Document written with ID: ", docRef.id);
     this.util.showToast(this.translate.instant('Report Success'), 'success', 'bottom');
     this.navCtrl.pop()
  }

}

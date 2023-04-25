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
import { ActionSheetController, IonModal, IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage  {

  @ViewChild(IonTabs) tabs: IonTabs;
  @ViewChild("stepsModal") stepsModal: IonModal; //Steps modal 
  public selected = '';
  public loggIn
 
  constructor(
    public router: Router, 
    public actionSheetCtrl: ActionSheetController) {}

  setSelectedTab() {
    this.selected = this.tabs.getSelected();
  }

  ionViewDidEnter(){
    setInterval(()=> {
      this.loggIn = localStorage.getItem('isLoggedIn') 
    },200)
  }

  presentModal(){
    this.router.navigate(['/login'])
  }

  sell(){
    this.router.navigate(['/post-ads'])
  }

}

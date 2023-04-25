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
import { IonSearchbar, NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { Category, Subcategory } from '../model/category';
import { Item } from '../model/item';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('autofocus', { static: false }) searchbar: IonSearchbar;
  @ViewChild('stepsModal') stepsModal: IonModal;
  openModal: boolean = false;
  public searchKey = "";
  public items: Item[] = []
  public isItemAvailable = false;
  public initiaList  = [];
  userId
  db = getFirestore()
  categories: Category[] = []
  subcategories: Subcategory[] = []
  showCat = false;
  category
  subcategory

  constructor(
    public router: Router, 
    public dataService: DataService,
    public navCtrl: NavController
    ) {
      this.dataService.getCategories().subscribe((data) => {
        if(data != null){
          this.categories = data;
        }
       })
    }

    ngOnInit() {
      this.getItemList();
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

    //searchbar autofocus
    ionViewWillEnter() {
      setTimeout(() => this.searchbar.setFocus(), 300);
    }

    //products list
    getItemList(){
      this.dataService.getAllItems().subscribe((data) => {
        this.items = data;
        this.initiaList = this.items;
      })  
    }

    initializeItems(){
      this.items = this.initiaList
    }

    close(){
      this.stepsModal.dismiss().then(() => {
        this.openModal = false;
      });
    }
  
    filter(){
      this.stepsModal.dismiss().then(() => {
        this.openModal = false;
        this.isItemAvailable = true;
        this.dataService.getItemsFilter(this.category, this.subcategory).subscribe((data)=> {
          this.items = data;
        })
      });
      
    }

    openSteps() {
      this.openModal = true;
  
      this.stepsModal.onWillDismiss().then(() => {
        this.openModal = false;
      });
    }

    //view details
    viewDetails(id){
      this.router.navigate(['/item-details', {
        id: id,
      }])
    }

    //search products
    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();
      // set val to the value of the searchbar
      const val = ev.target.value;
      // if the value is an empty string don't filter the items
       if (val && val.trim() !== '') {
          this.isItemAvailable = true;
          this.items = this.items.filter((item) => {
            if (item.title && val) {
              return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            }
          })
       } else {
          this.isItemAvailable = false;
      }
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


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
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { Item } from '../model/item';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public id: any;
  public dummyArray = Array(1)
  public items: Item[] = []
  public userId: any;
  public db = getFirestore()
  public photoURL: any;
  public displayName: any;

  constructor(
    public routes: ActivatedRoute, 
    public router: Router,
    public dataService: DataService, public navCtrl: NavController) {
    this.id = this.routes.snapshot.paramMap.get('id')
    this.dataService.getmyItems(this.id).subscribe((data)=> {
      if(data != null){
        this.items = data;
        this.dummyArray = [];
      } else {
        this.dummyArray = [];
      }
    })
    this.dataService.getUserById(this.id).subscribe((data)=> {
      this.photoURL = data.photoURL;
      this.displayName = data.displayName
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


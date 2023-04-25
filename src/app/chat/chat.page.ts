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
import { Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { ChatHistory } from '../model/chat';
import { User } from '../model/user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage  {

  public chatsList = [];
  public userList = [];
  public screenHeight
  public dummyChat = Array(1)
  public db = getFirestore()

  constructor( 
    public dataProvider: DataService,
    public actionSheetCtrl: ActionSheetController,
    public router: Router, public platform: Platform
    ) { 

    this.screenHeight = platform.height() - 200;
    this.getChats()
    this.getUsers()
   }

   // get user list
   getUsers(){
    this.dataProvider.getUsers().subscribe((data)=> {
      console.log(data);
      if(data){
        this.userList = [];
        data.forEach(item => {
          this.userList.push(item as User);
        })
      }
    })
  }

  // return user image
  getUserImage(userId){
    for(let item of this.userList){
      if(item.id == userId){
        return item.photoURL
      }
    }
  }

  // return username
  getUsername(userId){
    for(let item of this.userList){
      if(item.id == userId){
        return item.displayName
      }
    }
  }

  // get chat history
  async getChats(){
   this.dataProvider.getChatsHistory(localStorage.getItem('uid')).subscribe((data)=> {
    console.log(data);
    this.dummyChat = [];
    if(data){
      this.chatsList = [];
      data.forEach(item => {
        this.chatsList.push(item as ChatHistory);
        return this.chatsList.sort((a, b) => b.timestamp - a.timestamp);
      })
    } else {
      this.dummyChat = [];
     }
   }) 
  }

  async goChat(chat){
    const docRef = doc(this.db, "users", localStorage.getItem('uid'), 'chatlist', chat.chatID);
    const docSnap = await getDoc(docRef);
    let updateBadgeData =  {
      inRoom: true, 
      badgeCount: 0, 
      chatID: chat.chatID,  
      chatWith: chat.chatWith, 
      type: chat.type, 
      lastChat: chat.lastChat, 
      timestamp: chat.timestamp,
      itemId: chat.itemId
    }
    if (docSnap.exists()) {
       setDoc(docRef, updateBadgeData);
    } else {
      console.log('Data exist')
    }
    this.router.navigate(['/chatting', {
      chatID: chat.chatID,
      userId: chat.chatWith,
      itemId: chat.itemId,
   }])
  }

}
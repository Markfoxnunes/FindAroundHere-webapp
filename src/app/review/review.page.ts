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
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { User } from '../model/user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  public id: any;
  public review = []
  public dummyArray = Array(1)
  public userList = []
  public db = getFirestore()
  public text = ''
  public myId: any;
  public itemName;
  public itemPrice;
  public images = [];
  public image;

  constructor(public route: ActivatedRoute, public dataService: DataService) { 
    this.id = this.route.snapshot.paramMap.get('id')
    this.myId = localStorage.getItem('uid')
    this.dataService.getItemById(this.id).subscribe(res => {
      if(res){
        this.review = res.review;
        this.itemName = res.title;
        this.itemPrice = res.price;
        this.images = res.images;
        this.image = this.images[0]
        this.dummyArray = [];
      } else {
        this.dummyArray = [];
      }
      
    });
    this.getUsers();
  }

  getUsers(){
    this.dataService.getUsers().subscribe((data)=> {
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

  // send comment
  async send(){
    let params = {
      text: this.text,
      userId: localStorage.getItem('uid'),
      date: Date.now(),
      itemId: this.id,
      id: Date.now(),
    }
    const postRef = doc(this.db, "items", this.id);
    this.review.push(params);
    this.text = '';
      await updateDoc(postRef, {
       review: this.review,
      });
    //this.scrollToBottom();
  }

  ngOnInit() {
  }

}

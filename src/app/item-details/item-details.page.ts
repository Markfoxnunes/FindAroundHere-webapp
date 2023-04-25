/*
 Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Deal - ionic 6 Buy and Sell, Admin, Admob
  Created : 20-August-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts.com/license
  Copyright © 2022-present Craft Software System.
*/

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { ModalImagePage } from '../modal-image/modal-image.page';
import { Category, Subcategory } from '../model/category';
import { User } from '../model/user';
import { DataService } from '../services/data.service';
import { Autoplay, SwiperOptions } from 'swiper';
//import SwiperCore, {Pagination} from 'swiper/core';
import { SwiperComponent } from 'swiper/angular';
//SwiperCore.use([Pagination, Autoplay]);
import { AdMob } from '@capacitor-community/admob';

declare var google: any;

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemDetailsPage  {

  public map: any;
  public marker: any
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
  public adDate: number;
  public images = [];
  public db = getFirestore()
  public phoneNumber: string;
  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];
  public haveILiked =false;
  public userList = []
  public review = []
  public wishlist = [];
  public image: any;
  public details: any;
  @ViewChild('swiper') swiper: SwiperComponent;
  public config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    autoplay: true,
    pagination: true,
  };

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public router: Router, public route: ActivatedRoute, public dataService: DataService) { 

    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getItemById(this.id).subscribe((data)=> {
      this.details = data;
      this.category = data.category;
      this.subcategory = data.subcategory;
      this.price = data.price;
      this.title = data.title;
      this.description = data.description;
      this.condition = data.condition;
      this.review = data.review;
      this.seller = data.userId;
      this.location = data.location;
      this.longitude = data.longitude;
      this.latitude = data.latitude;
      this.locality = data.locality;
      this.phoneNumber = data.phoneNumber;
      this.adDate = data.adDate;
      this.images = data.images;
      this.image = this.images[0]
      this.getMaps();
      this.getWishList();
    });

    this.dataService.getCategories().subscribe((data) => {
      if(data != null){
        this.categories = data;
      }
     })

     this.dataService.getSubCategoriesList().subscribe((data) => {
      if(data != null){
        this.subcategories = data;
      }
     })
    this.getUsers()
    this.hideBanner()
  }

  async hideBanner(){
    await AdMob.hideBanner();
   }

  ngAfterContentChecked(){
    if(this.swiper){
      this.swiper.updateSwiper({})
     }
   }

   swiperSlideChanged(event){}

  async getWishList(){
    this.wishlist = [];
      this.dataService.getUserById(localStorage.getItem('uid')).subscribe((data)=> {
        this.wishlist = data.wishlist || [];
        for(var i = 0; i < this.wishlist.length; i++){
          if(this.wishlist[i].id === this.id){
            this.haveILiked = true;
           } else {
            this.haveILiked = false;
           }
        }
    })
  }

  //add to wishlist
  async addToWishlist(){
    if(localStorage.getItem('isLoggedIn') === 'true'){
      this.haveILiked = true;
        this.wishlist.push({id: this.id, title: this.title, image: this.image, price: this.price, locality: this.locality, sellerId: this.seller, phoneNumber: this.phoneNumber});
        const wishRef = doc(this.db, "users", localStorage.getItem('uid'));
         await updateDoc(wishRef, {
          wishlist: this.wishlist
         });
    } else {
      this.router.navigate(['/login'])
    }
  }

  //remove from wishlist
  async removeToWishlist(){
    let updatedWishlist = [];
    this.haveILiked = false;
      this.wishlist.push({id: this.id, title: this.title, image: this.image, price: this.price});
      for (let i = 0; i < this.wishlist.length; i++){
        if (this.wishlist[i].id != this.id)
          {
           updatedWishlist.push(this.wishlist[i]);
        }
      }
      //let x = {wishlist: updatedWishlist}
      const wishRef = doc(this.db, "users", localStorage.getItem('uid'));
         await updateDoc(wishRef, {
          wishlist: updatedWishlist
      });
   // })
  }

  getMaps(){
    // get user current location
    this.platform.ready().then( async () => {
      //const resp = await Geolocation.getCurrentPosition();
      const position = new google.maps.LatLng(this.latitude, this.longitude);
      // map options
      const mapOptions = {
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        zoomControl: false,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: "auto"
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      const icon = {
        url: 'assets/car_android.png', // image url
        scaledSize: new google.maps.Size(30, 65), // scaled size
      };
      // Circular style around the marker
      var radius = 200;
      var circle = new google.maps.Circle({
        center: position,
        radius: radius,
        fillColor: "#0000FF",
        fillOpacity: 0.1,
        map: this.map,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.1, 
        strokeWeight: 2
      });
      // Marker option
      this.marker = new google.maps.Marker({
        position: position,
        map: this.map,
        //icon: icon,
        //circle: circle,
        //draggable: true,
        animation: google.maps.Animation.DROP,
      });
      this.marker.addListener("click", this.toggleBounce());
    }).catch((error) => {
      console.log('Unable to load map', error);
    })
  }

  /**
  * Map Bounce function
  */
  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
      this.marker.setAnimation(null);
    } else {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
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
  getUserImage(){
    for(let item of this.userList){
      if(item.id == this.seller){
        return item.photoURL
      }
    }
  }

  // return username
  getUsername(){
    for(let item of this.userList){
      if(item.id == this.seller){
        return item.displayName
      }
    }
  }

  getTime(){
    for(let item of this.userList){
      if(item.id == this.seller){
        return item.joined
      }
    }
  }

  viewSeller(){
    this.router.navigate(['/user-profile', {
      id: this.seller
    }])
  }

  goReport(){
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if(user) {
        this.router.navigate(['/report', {
          id: this.id
        }])
      } else {
        this.router.navigate(['/login'])
      }
    })
  
  }

  async openPreview(img) {
    const modal = await this.modalCtrl.create({
      component: ModalImagePage,
      cssClass: 'transparent-modal',
      componentProps: {
        img
      }
    });
    modal.present();
  }

  getCategory(){
    for(let item of this.categories){
      if(item.id === this.category){
        return item.name
      }
    }
  }

  getSubcategory(){
    for(let item of this.subcategories){
      if(item.id === this.subcategory){
        return item.name
      }
    }
  }

  goReview(){
    const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if(user) {
          this.router.navigate(['/review', {
            id: this.id
          }])
        } else {
          this.router.navigate(['/login'])
        }
      })
    
  }

  goToBack(){
    this.navCtrl.pop()
  }

  call(){
    window.open(`tel:${this.phoneNumber}`);
  }

  chat(){
    const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if(user) {
         this.userId = user.uid;
         if(this.userId === this.seller){
          console.log('You are seller')
         } else {

          let chatID = this.userId + this.seller + this.id
          const docRef = doc(this.db, "users", localStorage.getItem('uid'), 'chatlist', chatID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            let chataData = docSnap.data();
            let isInRoom = chataData.inRoom;
            let chatWith = chataData.chatWith;
            let lastChat = chataData.lastChat;
            let type = chataData.type;
            let timestamp = chataData.timestamp;
      
            let updateBadgeData =  {inRoom: true, badgeCount: 0, chatID: chatID, chatWith: chatWith, type: type, lastChat: lastChat, timestamp: timestamp, itemId: this.id}
            setDoc(docRef, updateBadgeData);
          } else {
            //setDoc(docRef, updateData);
          }
          this.router.navigate(['/chatting', {
            chatID: chatID,
            userId: this.seller,
            itemId: this.id
          }])
         }
        } else {
          this.router.navigate(['/login'])
        }
      })
     }
}

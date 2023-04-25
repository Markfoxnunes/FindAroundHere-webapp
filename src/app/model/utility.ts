import { Injectable, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UtilityService implements OnInit {

 
  setting: any;
  isLoading = false;
  public packgeName = 'ghost.com.iq';
  private coupon = new Subject<any>();
  
 
  
  constructor(
    public alertCtrl: AlertController,
    public http: HttpClient,
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController) { }


  async ngOnInit(){
    //await this.storage.create();
  }


  async showToast(msg, colors, positon) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: colors,
      position: positon
    });
    toast.present();
  }

 

  async shoNotification(msg, colors, positon) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      color: colors,
      position: positon,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async errorToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async show(title?) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: title,
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        // console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async showErrorAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async hide() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  publishCoupon(data: any) {
    this.coupon.next(data);
  }
  getCouponObservable(): Subject<any> {
    return this.coupon;
  }

  
  makeid(length: any) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  httpPostPay(url, body) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json' )
    };
    const order = this.JSON_to_URLEncoded(body);
    console.log(order)
    return this.http.post(url, order, header);
  }
  
  
   httpPost(url, body) {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${environment.stripe.sk}`)
      };
      const order = this.JSON_to_URLEncoded(body);
      console.log(order)
      return this.http.post(url, order, header);
    }
  
    httpGet(url) {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${environment.stripe.sk}`)
      };
  
      return this.http.get(url, header);
    }
  
    JSON_to_URLEncoded(element, key?, list?) {
      let new_list = list || [];
      if (typeof element == "object") {
        for (let idx in element) {
          this.JSON_to_URLEncoded(
            element[idx],
            key ? key + "[" + idx + "]" : idx,
            new_list
          );
        }
      } else {
        new_list.push(key + "=" + encodeURIComponent(element));
      }
      return new_list.join("&");
    }
}
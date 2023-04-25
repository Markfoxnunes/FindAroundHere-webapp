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
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, isPlatform, Platform } from '@ionic/angular';
import { getDoc, doc, updateDoc, getFirestore, setDoc } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public authForm: FormGroup;
  public isSubmitted = false;
  public isLogin = false;
  public db = getFirestore()
  subscription = new Subscription();
  public banner = 'assets/image.jpg';

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly formBuilder: FormBuilder,
    public platform: Platform,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {})
  }

  // login function
  async login() {
     this.isSubmitted = true;
    if (!this.authForm.valid){
      console.log('Enter required field')
      return false;
    } else {
    this.isLogin = true;
    try {
      await this.auth.login(this.authForm.value['email'], this.authForm.value['password']).then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('isLoggedIn','true')
        const myRef = doc(this.db, "users", user.uid);
          const mySnap = await getDoc(myRef);
          if (mySnap.exists()) {
             await updateDoc(myRef, {
              fcm_token: localStorage.getItem('fcm')
            });
          }
        //this.router.navigateByUrl('');
        this.router.navigateByUrl('/tabs/home', {replaceUrl:true });
        this.isLogin = false;
      })
    } catch (error) {
       this.isLogin = false;
      this.displayAlertMessage(`Either we couldn't find your user or there was a problem with the password`);
     }
    }
  }

  get errorControl() {
    return this.authForm.controls;
  }

  // navigate to register
  goToRegister(){
    this.router.navigate(['/register'])
  }

  // navigate to forgot password
  goToForgotPassword(){
    this.router.navigate(['/forgot-password'])
  }

  // alert error
  async displayAlertMessage(errorMessage: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: errorMessage,
      buttons: [{ text: 'Ok', role: 'cancel' }],
    });
    await alert.present();

    await alert.onDidDismiss();
  }

}


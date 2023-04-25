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
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController, NavController, isPlatform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
//npm install --legacy-peer-deps --save @codetrix-studio/capacitor-google-auth
import { setDoc, doc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  public authForm: FormGroup;
  public isSubmitted = false;
  public isRegister = false;
  public db = getFirestore()
  

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    public readonly navCtrl: NavController,
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      displayName: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Signup function
  async signup() {
    this.isSubmitted = true;
    if (!this.authForm.valid){
      console.log('Enter required field')
      return false;
    } else {
    this.isRegister = true;
    try {
      await this.auth.signup(
        this.authForm.value['email'], 
        this.authForm.value['password'], 
        this.authForm.value['displayName'],
        this.authForm.value['phoneNumber']
       );
      this.isRegister = false;
      this.router.navigate(['/tabs/home'])

    } catch (error) {
      this.isRegister = false;
      this.displayAlertMessage(error);
    }
   }
  }

  get errorControl() {
    return this.authForm.controls;
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

  // navigate back
  goBack(){
    this.navCtrl.pop()
  }

  // navigate to phone page
  goToPhone(){
    this.router.navigate(['/phone-auth'])
  }

  // navigate to login page
  goToLogin(){
    this.goBack()
  }

}
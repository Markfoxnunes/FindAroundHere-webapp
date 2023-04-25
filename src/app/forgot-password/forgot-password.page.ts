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
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public authForm: FormGroup;
  public isSubmitted = false;
  public isClick = false;

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly formBuilder: FormBuilder,
    public navCtrl: NavController,
    public translate: TranslateService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  // reset password
  async resetPassword() {
    this.isSubmitted = true;
    if (!this.authForm.valid){
      console.log('Enter required field')
      return false;
    } else {
    const resetErrorMessage = this.translate.instant('You will receive an email with instructions on how to reset your password');
    this.isClick = true;
    try {
      await this.auth.resetPassword(this.authForm.value['email']);
      this.isClick = false

      this.displayAlertMessage(resetErrorMessage);
      this.router.navigateByUrl('login');
    } catch (error) {
      this.isClick = false
      this.displayAlertMessage(resetErrorMessage);
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
}
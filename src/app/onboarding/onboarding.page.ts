/*
  Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Muslim Companion - ionic 6 Quran, Hadith and Prayer Application
  Created : 20-April-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts/license
  Copyright © 2021-present Craft Software System.
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SwiperCore, { SwiperOptions, Keyboard, Pagination, EffectCube } from 'swiper';
// install Swiper modules
SwiperCore.use([Keyboard, Pagination]);

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  public slideOpts: SwiperOptions = {};
  public firstOpening: any;

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.animation();
  }

  async goHome() {
    localStorage.setItem("onboardSeen", 'true');
    this.router.navigateByUrl('/tabs/home', { skipLocationChange: true, replaceUrl: true });
  }

  animation() {
    this.slideOpts = {
      pagination: { clickable: true },
      keyboard: { enabled: true },
      effect: 'cube'
    };
  }

}
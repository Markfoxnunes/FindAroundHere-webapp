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
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage {

  public langArr = [];
  public lang = 'en';

  constructor(public commonService: CommonService) {
    this.langArr = environment.langArr;
    this.lang = this.commonService.getLang();
   }

  changeLang() {
    this.commonService.changeLang(this.lang);
  }

}

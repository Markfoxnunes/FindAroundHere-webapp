/*
  Authors : Craft Software System
  Website : https://craftsofts.com/
  App Name : Connect - ionic 6 Social Forum FirebaseV9 
  Created : 01-July-2022
  This App Template Source code is licensed as per the
  terms found in the Website https://craftsofts.com/license
  Copyright © 2022-present Craft Software System.
*/

import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'DateFormat'
})
@Injectable()
export class DateFormatPipe implements PipeTransform {
  // DateFormatPipe
  // Show moment.js dateFormat for time elapsed.
  transform(date: any, args?: any): any {
    return moment(new Date(date)).fromNow();
  }
}
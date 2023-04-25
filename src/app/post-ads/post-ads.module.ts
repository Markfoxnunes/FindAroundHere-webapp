import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostAdsPageRoutingModule } from './post-ads-routing.module';
import { PostAdsPage } from './post-ads.page';
import { AutoCompletePage } from '../auto-complete/auto-complete.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    PostAdsPageRoutingModule
  ],
  declarations: [PostAdsPage, AutoCompletePage],
  entryComponents: [AutoCompletePage]
})
export class PostAdsPageModule {}

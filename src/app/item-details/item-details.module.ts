import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemDetailsPageRoutingModule } from './item-details-routing.module';
import { ItemDetailsPage } from './item-details.page';
import { DatePipesModule } from '../pipe/date.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalImagePage } from '../modal-image/modal-image.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    SwiperModule,
    DatePipesModule,
    ItemDetailsPageRoutingModule
  ],
  declarations: [ItemDetailsPage, ModalImagePage],
  entryComponents: [ModalImagePage]
})
export class ItemDetailsPageModule {}

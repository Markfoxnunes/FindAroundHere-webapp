import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FaqPageRoutingModule } from './faq-routing.module';
import { FaqPage } from './faq.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    FaqPageRoutingModule
  ],
  declarations: [FaqPage]
})
export class FaqPageModule {}

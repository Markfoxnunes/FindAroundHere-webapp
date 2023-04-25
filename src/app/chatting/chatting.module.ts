import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChattingPageRoutingModule } from './chatting-routing.module';
import { ChattingPage } from './chatting.page';
import { DatePipesModule } from '../pipe/date.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DatePipesModule,
    IonicModule,
    ChattingPageRoutingModule
  ],
  declarations: [ChattingPage]
})
export class ChattingPageModule {}

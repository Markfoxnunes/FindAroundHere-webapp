import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReviewPageRoutingModule } from './review-routing.module';
import { ReviewPage } from './review.page';
import { DatePipesModule } from '../pipe/date.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DatePipesModule,
    IonicModule,
    ReviewPageRoutingModule
  ],
  declarations: [ReviewPage]
})
export class ReviewPageModule {}

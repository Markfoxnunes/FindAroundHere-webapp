import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';
import { SwiperModule } from 'swiper/angular';
import { OnboardingPage } from './onboarding.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SwiperModule,
    IonicModule,
    OnboardingPageRoutingModule
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostAdsPage } from './post-ads.page';

const routes: Routes = [
  {
    path: '',
    component: PostAdsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAdsPageRoutingModule {}

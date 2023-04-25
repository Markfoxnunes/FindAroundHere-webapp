import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAdvertsPage } from './my-adverts.page';

const routes: Routes = [
  {
    path: '',
    component: MyAdvertsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAdvertsPageRoutingModule {}

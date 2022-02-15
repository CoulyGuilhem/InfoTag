import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LigneInfoPage } from './ligne-info.page';

const routes: Routes = [
  {
    path: '',
    component: LigneInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LigneInfoPageRoutingModule {}

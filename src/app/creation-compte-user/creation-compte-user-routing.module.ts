import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreationCompteUserPage } from './creation-compte-user.page';

const routes: Routes = [
  {
    path: '',
    component: CreationCompteUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreationCompteUserPageRoutingModule {}

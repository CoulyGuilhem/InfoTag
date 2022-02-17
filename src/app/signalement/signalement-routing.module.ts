import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalementPage } from './signalement.page';

const routes: Routes = [
  {
    path: '',
    component: SignalementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalementPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LignesPage } from './lignes.page';

const routes: Routes = [
  {
    path: '',
    component: LignesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LignesPageRoutingModule { }

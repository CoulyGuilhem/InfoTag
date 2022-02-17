import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LignesPage } from './lignes.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LignesPageRoutingModule } from './lignes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: LignesPage }]),
    LignesPageRoutingModule,
  ],
  declarations: [LignesPage]
})
export class LignesPageModule { }

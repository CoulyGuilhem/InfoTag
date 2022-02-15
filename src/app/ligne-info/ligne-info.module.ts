import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LigneInfoPageRoutingModule } from './ligne-info-routing.module';

import { LigneInfoPage } from './ligne-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LigneInfoPageRoutingModule
  ],
  declarations: [LigneInfoPage]
})
export class LigneInfoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignalementPageRoutingModule } from './signalement-routing.module';

import { SignalementPage } from './signalement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignalementPageRoutingModule
  ],
  declarations: [SignalementPage]
})
export class SignalementPageModule {}

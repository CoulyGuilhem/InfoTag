import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartePageRoutingModule } from './carte-routing.module';
import { CartePage } from './carte.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartePageRoutingModule,
    ExploreContainerComponentModule,
  ],
  declarations: [CartePage]
})
export class CartePageModule {}

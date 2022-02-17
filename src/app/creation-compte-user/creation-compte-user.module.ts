import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreationCompteUserPageRoutingModule } from './creation-compte-user-routing.module';

import { CreationCompteUserPage } from './creation-compte-user.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    CreationCompteUserPageRoutingModule
  ],
  declarations: [CreationCompteUserPage]
})
export class CreationCompteUserPageModule { }

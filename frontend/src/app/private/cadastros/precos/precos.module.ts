import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrecosPageRoutingModule } from './precos-routing.module';

import { PrecosPage } from './precos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrecosPageRoutingModule
  ],
  declarations: [PrecosPage]
})
export class PrecosPageModule {}

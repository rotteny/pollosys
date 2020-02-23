import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportadoresPageRoutingModule } from './transportadores-routing.module';

import { TransportadoresPage } from './transportadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportadoresPageRoutingModule
  ],
  declarations: [TransportadoresPage]
})
export class TransportadoresPageModule {}

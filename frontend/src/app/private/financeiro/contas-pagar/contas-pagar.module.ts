import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContasPagarPageRoutingModule } from './contas-pagar-routing.module';

import { ContasPagarPage } from './contas-pagar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContasPagarPageRoutingModule
  ],
  declarations: [ContasPagarPage]
})
export class ContasPagarPageModule {}

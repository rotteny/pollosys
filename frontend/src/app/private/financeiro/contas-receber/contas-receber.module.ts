import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContasReceberPageRoutingModule } from './contas-receber-routing.module';

import { ContasReceberPage } from './contas-receber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContasReceberPageRoutingModule
  ],
  declarations: [ContasReceberPage]
})
export class ContasReceberPageModule {}

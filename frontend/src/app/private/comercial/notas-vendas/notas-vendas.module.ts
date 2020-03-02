import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasVendasPageRoutingModule } from './notas-vendas-routing.module';

import { NotasVendasPage } from './notas-vendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasVendasPageRoutingModule
  ],
  declarations: [NotasVendasPage]
})
export class NotasVendasPageModule {}

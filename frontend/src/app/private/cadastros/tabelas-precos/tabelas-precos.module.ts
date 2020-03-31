import { FormTabelasPrecosComponent } from './form-tabelas-precos/form-tabelas-precos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabelasPrecosPageRoutingModule } from './tabelas-precos-routing.module';

import { TabelasPrecosPage } from './tabelas-precos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabelasPrecosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TabelasPrecosPage, FormTabelasPrecosComponent],
  entryComponents: [FormTabelasPrecosComponent]
})
export class TabelasPrecosPageModule {}

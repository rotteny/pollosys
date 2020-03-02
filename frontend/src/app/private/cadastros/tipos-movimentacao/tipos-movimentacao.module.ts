import { FormTiposMovimentacaoComponent } from './form-tipos-movimentacao/form-tipos-movimentacao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiposMovimentacaoPageRoutingModule } from './tipos-movimentacao-routing.module';

import { TiposMovimentacaoPage } from './tipos-movimentacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiposMovimentacaoPageRoutingModule
  ],
  declarations: [TiposMovimentacaoPage, FormTiposMovimentacaoComponent],
  entryComponents: [FormTiposMovimentacaoComponent]
})
export class TiposMovimentacaoPageModule {}

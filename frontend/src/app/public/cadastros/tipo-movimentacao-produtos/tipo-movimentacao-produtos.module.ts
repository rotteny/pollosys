import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoMovimentacaoProdutosPageRoutingModule } from './tipo-movimentacao-produtos-routing.module';

import { TipoMovimentacaoProdutosPage } from './tipo-movimentacao-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoMovimentacaoProdutosPageRoutingModule
  ],
  declarations: [TipoMovimentacaoProdutosPage]
})
export class TipoMovimentacaoProdutosPageModule {}

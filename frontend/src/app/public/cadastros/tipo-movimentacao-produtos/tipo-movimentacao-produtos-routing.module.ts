import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoMovimentacaoProdutosPage } from './tipo-movimentacao-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: TipoMovimentacaoProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoMovimentacaoProdutosPageRoutingModule {}

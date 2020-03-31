import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondicoesPagamentoPage } from './condicoes-pagamento.page';

const routes: Routes = [
  {
    path: '',
    component: CondicoesPagamentoPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondicoesPagamentoPageRoutingModule {}

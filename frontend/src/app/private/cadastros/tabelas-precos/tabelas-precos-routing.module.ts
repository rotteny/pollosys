import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabelasPrecosPage } from './tabelas-precos.page';

const routes: Routes = [
  {
    path: '',
    component: TabelasPrecosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabelasPrecosPageRoutingModule {}

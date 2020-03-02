import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContasPagarPage } from './contas-pagar.page';

const routes: Routes = [
  {
    path: '',
    component: ContasPagarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContasPagarPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasVendasPage } from './notas-vendas.page';

const routes: Routes = [
  {
    path: '',
    component: NotasVendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasVendasPageRoutingModule {}

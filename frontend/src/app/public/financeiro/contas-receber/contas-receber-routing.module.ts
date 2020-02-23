import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContasReceberPage } from './contas-receber.page';

const routes: Routes = [
  {
    path: '',
    component: ContasReceberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContasReceberPageRoutingModule {}

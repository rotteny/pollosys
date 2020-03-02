import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportadoresPage } from './transportadores.page';

const routes: Routes = [
  {
    path: '',
    component: TransportadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportadoresPageRoutingModule {}

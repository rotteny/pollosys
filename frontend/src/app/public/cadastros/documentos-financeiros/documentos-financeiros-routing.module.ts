import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosFinanceirosPage } from './documentos-financeiros.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentosFinanceirosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosFinanceirosPageRoutingModule {}

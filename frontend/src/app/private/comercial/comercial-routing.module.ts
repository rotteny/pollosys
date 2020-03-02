import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  {
    path: 'notas-vendas',
    loadChildren: () => import('./notas-vendas/notas-vendas.module').then( m => m.NotasVendasPageModule)
  },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComercialRoutingModule { }

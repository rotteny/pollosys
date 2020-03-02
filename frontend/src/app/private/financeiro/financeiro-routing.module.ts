import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  {
    path: 'contas-pagar',
    loadChildren: () => import('./contas-pagar/contas-pagar.module').then( m => m.ContasPagarPageModule)
  },
  {
    path: 'contas-receber',
    loadChildren: () => import('./contas-receber/contas-receber.module').then( m => m.ContasReceberPageModule)
  },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }

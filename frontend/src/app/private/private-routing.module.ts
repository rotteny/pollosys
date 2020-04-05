import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { 
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  { 
    path: 'cadastros',
    loadChildren: () => import('./cadastros/cadastros-routing.module').then( m => m.CadastrosRoutingModule),
  },
  { 
    path: 'comercial',
    loadChildren: () => import('./comercial/comercial-routing.module').then( m => m.ComercialRoutingModule),
  },
  { 
    path: 'financeiro',
    loadChildren: () => import('./financeiro/financeiro-routing.module').then( m => m.FinanceiroRoutingModule),
  },
  { 
    path: 'suprimentos',
    loadChildren: () => import('./suprimentos/suprimentos-routing.module').then( m => m.SuprimentosRoutingModule),
  },
  {
    path: 'empresas',
    loadChildren: () => import('./empresas/empresas.module').then( m => m.EmpresasPageModule)
  },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }

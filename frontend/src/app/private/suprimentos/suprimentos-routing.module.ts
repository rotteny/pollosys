import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  {
    path: 'estoque',
    loadChildren: () => import('./estoque/estoque.module').then( m => m.EstoquePageModule)
  },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuprimentosRoutingModule { }

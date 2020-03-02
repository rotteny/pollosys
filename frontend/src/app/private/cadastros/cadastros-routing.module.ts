import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'fornecedores',
    loadChildren: () => import('./fornecedores/fornecedores.module').then( m => m.FornecedoresPageModule)
  },
  {
    path: 'transportadores',
    loadChildren: () => import('./transportadores/transportadores.module').then( m => m.TransportadoresPageModule)
  },
  {
    path: 'motoristas',
    loadChildren: () => import('./motoristas/motoristas.module').then( m => m.MotoristasPageModule)
  },
  {
    path: 'veiculos',
    loadChildren: () => import('./veiculos/veiculos.module').then( m => m.VeiculosPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'tipos-movimentacao',
    loadChildren: () => import('./tipos-movimentacao/tipos-movimentacao.module').then( m => m.TiposMovimentacaoPageModule)
  },
  {
    path: 'documentos-financeiros',
    loadChildren: () => import('./documentos-financeiros/documentos-financeiros.module').then( m => m.DocumentosFinanceirosPageModule)
  },
  {
    path: 'precos',
    loadChildren: () => import('./precos/precos.module').then( m => m.PrecosPageModule)
  },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }

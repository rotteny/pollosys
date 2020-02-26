import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./public/login/login.module').then( m => m.LoginPageModule)
  },
  { 
    path: 'home',
    loadChildren: () => import('./public/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./public/cadastros/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'fornecedores',
    loadChildren: () => import('./public/cadastros/fornecedores/fornecedores.module').then( m => m.FornecedoresPageModule)
  },
  {
    path: 'transportadores',
    loadChildren: () => import('./public/cadastros/transportadores/transportadores.module').then( m => m.TransportadoresPageModule)
  },
  {
    path: 'motoristas',
    loadChildren: () => import('./public/cadastros/motoristas/motoristas.module').then( m => m.MotoristasPageModule)
  },
  {
    path: 'veiculos',
    loadChildren: () => import('./public/cadastros/veiculos/veiculos.module').then( m => m.VeiculosPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./public/cadastros/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'precos',
    loadChildren: () => import('./public/comercial/precos/precos.module').then( m => m.PrecosPageModule)
  },
  {
    path: 'notas-vendas',
    loadChildren: () => import('./public/comercial/notas-vendas/notas-vendas.module').then( m => m.NotasVendasPageModule)
  },
  {
    path: 'contas-pagar',
    loadChildren: () => import('./public/financeiro/contas-pagar/contas-pagar.module').then( m => m.ContasPagarPageModule)
  },
  {
    path: 'contas-receber',
    loadChildren: () => import('./public/financeiro/contas-receber/contas-receber.module').then( m => m.ContasReceberPageModule)
  },
  {
    path: 'estoque',
    loadChildren: () => import('./public/suprimentos/estoque/estoque.module').then( m => m.EstoquePageModule)
  },
  {
    path: 'tipos-movimentacao',
    loadChildren: () => import('./public/cadastros/tipos-movimentacao/tipos-movimentacao.module').then( m => m.TiposMovimentacaoPageModule)
  },
  {
    path: 'documentos-financeiros',
    loadChildren: () => import('./public/cadastros/documentos-financeiros/documentos-financeiros.module').then( m => m.DocumentosFinanceirosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

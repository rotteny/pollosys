import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [  
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('../cadastros/clientes/clientes.module').then( m => m.ClientesPageModule)
      },
      {
        path: 'fornecedores',
        loadChildren: () => import('../cadastros/fornecedores/fornecedores.module').then( m => m.FornecedoresPageModule)
      },
      {
        path: 'transportadores',
        loadChildren: () => import('../cadastros/transportadores/transportadores.module').then( m => m.TransportadoresPageModule)
      },
      {
        path: 'motoristas',
        loadChildren: () => import('../cadastros/motoristas/motoristas.module').then( m => m.MotoristasPageModule)
      },
      {
        path: 'veiculos',
        loadChildren: () => import('../cadastros/veiculos/veiculos.module').then( m => m.VeiculosPageModule)
      },
      {
        path: 'tipo-movimentacao-produtos',
        loadChildren: () => import('../cadastros/tipo-movimentacao-produtos/tipo-movimentacao-produtos.module').then( m => m.TipoMovimentacaoProdutosPageModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('../cadastros/produtos/produtos.module').then( m => m.ProdutosPageModule)
      },
      {
        path: 'documentos-financeitos',
        loadChildren: () => import('../cadastros/documentos-financeitos/documentos-financeitos.module').then( m => m.DocumentosFinanceitosPageModule)
      },
      {
        path: 'precos',
        loadChildren: () => import('../comercial/precos/precos.module').then( m => m.PrecosPageModule)
      },
      {
        path: 'notas-vendas',
        loadChildren: () => import('../comercial/notas-vendas/notas-vendas.module').then( m => m.NotasVendasPageModule)
      },
      {
        path: 'contas-pagar',
        loadChildren: () => import('../financeiro/contas-pagar/contas-pagar.module').then( m => m.ContasPagarPageModule)
      },
      {
        path: 'contas-receber',
        loadChildren: () => import('../financeiro/contas-receber/contas-receber.module').then( m => m.ContasReceberPageModule)
      },
      {
        path: 'estoque',
        loadChildren: () => import('../suprimentos/estoque/estoque.module').then( m => m.EstoquePageModule)
      },
    ],
  },
  {
    path: '',
    redirectTo: '/menu/login'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

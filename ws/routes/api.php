<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware(['auth:api','cors'])->get('/Usuario', function (Request $request) {
//     return $request->Usuario();
// });

Route::middleware('cors')->group(function(){
    Route::prefix('v1')->group(function(){
        // Acesso
        Route::post('login', 'UsuarioController@login');
        // Reenvio de senha
        Route::post('esqueciSenha', 'UsuarioController@esqueciSenha');
    
        Route::middleware(['auth:api','is_active'])->group(function(){
            Route::prefix('usuarios')->group(function(){
                Route::get('details', 'UsuarioController@details')->middleware('is_admin');
                Route::get('get/{id}', 'UsuarioController@single')->middleware('is_admin');
                Route::get('list', 'UsuarioController@list')->middleware('is_admin');
                Route::get('empresa/{id}', 'UsuarioController@empresa')->middleware('is_admin');
                Route::post('add', 'UsuarioController@add')->middleware('is_admin');
                Route::post('update/{id}', 'UsuarioController@update')->middleware('is_admin');
                Route::post('delete/{id}', 'UsuarioController@delete')->middleware('is_admin');
                Route::post('self', 'UsuarioController@self');
            });

            Route::prefix('condicoes_pagamentos')->group(function(){
                Route::get('get/{id}', 'CondicaoPagamentoController@single');
                Route::get('list', 'CondicaoPagamentoController@list');
                Route::get('options', 'CondicaoPagamentoController@options');
                Route::post('add', 'CondicaoPagamentoController@add');
                Route::post('update/{id}', 'CondicaoPagamentoController@update');
                Route::post('delete/{id}', 'CondicaoPagamentoController@delete');
            });

            Route::prefix('documentos_financeiros')->group(function(){
                Route::get('get/{id}', 'DocumentoFinanceiroController@single');
                Route::get('list', 'DocumentoFinanceiroController@list');
                Route::get('options', 'DocumentoFinanceiroController@options');
                Route::post('add', 'DocumentoFinanceiroController@add');
                Route::post('update/{id}', 'DocumentoFinanceiroController@update');
                Route::post('delete/{id}', 'DocumentoFinanceiroController@delete');
            });

            Route::prefix('tabelas_precos')->group(function(){
                Route::get('get/{id}', 'TabelaPrecoController@single');
                Route::get('list', 'TabelaPrecoController@list');
                Route::get('options', 'TabelaPrecoController@options');
                Route::post('add', 'TabelaPrecoController@add');
                Route::post('update/{id}', 'TabelaPrecoController@update');
                Route::post('delete/{id}', 'TabelaPrecoController@delete');
            });

            Route::prefix('clientes')->group(function(){
                Route::get('get/{id}', 'ClienteController@single');
                Route::get('list', 'ClienteController@list');
                Route::post('add', 'ClienteController@add');
                Route::post('update/{id}', 'ClienteController@update');
                Route::post('delete/{id}', 'ClienteController@delete');
            });

            Route::prefix('pessoas')->group(function(){
                Route::get('{tipo}/{documento}', 'PessoaController@documento');
                /*
                Route::get('get/{id}', 'PessoaController@single');
                Route::get('list', 'PessoaController@list');
                Route::post('add', 'PessoaController@add');
                Route::post('update/{id}', 'PessoaController@update');
                Route::post('delete/{id}', 'PessoaController@delete');
                */
            });

            Route::prefix('empresas')->middleware('is_admin')->group(function(){
                Route::get('get/{id}', 'EmpresaController@single');
                Route::get('list', 'EmpresaController@list');
                Route::post('add', 'EmpresaController@add');
                Route::post('update/{id}', 'EmpresaController@update');
                Route::post('delete/{id}', 'EmpresaController@delete');
            });

            Route::prefix('fornecedores')->group(function(){
                Route::get('get/{id}', 'FornecedorController@single');
                Route::get('list', 'FornecedorController@list');
                Route::post('add', 'FornecedorController@add');
                Route::post('update/{id}', 'FornecedorController@update');
                Route::post('delete/{id}', 'FornecedorController@delete');
            });

            Route::prefix('transportadores')->group(function(){
                Route::get('get/{id}', 'TransportadorController@single');
                Route::get('list', 'TransportadorController@list');
                Route::get('options', 'TransportadorController@options');
                Route::post('add', 'TransportadorController@add');
                Route::post('update/{id}', 'TransportadorController@update');
                Route::post('delete/{id}', 'TransportadorController@delete');
            });

            Route::prefix('veiculos')->group(function(){
                Route::get('get/{id}', 'VeiculoController@single');
                Route::get('list/{id?}', 'VeiculoController@list');
                Route::get('options/{id?}', 'VeiculoController@options');
                Route::post('add', 'VeiculoController@add');
                Route::post('update/{id}', 'VeiculoController@update');
                Route::post('delete/{id}', 'VeiculoController@delete');
            });

            Route::prefix('motoristas')->group(function(){
                Route::get('get/{id}', 'MotoristaController@single');
                Route::get('list', 'MotoristaController@list');
                Route::get('options', 'MotoristaController@options');
                Route::post('add', 'MotoristaController@add');
                Route::post('update/{id}', 'MotoristaController@update');
                Route::post('delete/{id}', 'MotoristaController@delete');
            });

            Route::prefix('unidades_medida')->group(function(){
                Route::get('get/{id}', 'UnidadeMedidaController@single');
                Route::get('list', 'UnidadeMedidaController@list');
                Route::get('options', 'UnidadeMedidaController@options');
                Route::post('add', 'UnidadeMedidaController@add');
                Route::post('update/{id}', 'UnidadeMedidaController@update');
                Route::post('delete/{id}', 'UnidadeMedidaController@delete');
            });

            Route::prefix('unidades_medida')->group(function(){
                Route::get('get/{id}', 'UnidadeMedidaController@single');
                Route::get('list', 'UnidadeMedidaController@list');
                Route::get('options', 'UnidadeMedidaController@options');
                Route::post('add', 'UnidadeMedidaController@add');
                Route::post('update/{id}', 'UnidadeMedidaController@update');
                Route::post('delete/{id}', 'UnidadeMedidaController@delete');
            });

            Route::prefix('tipos_movimentacao')->group(function(){
                Route::get('get/{id}', 'TipoMovimentacaoController@single');
                Route::get('list', 'TipoMovimentacaoController@list');
                Route::get('options', 'TipoMovimentacaoController@options');
                Route::post('add', 'TipoMovimentacaoController@add');
                Route::post('update/{id}', 'TipoMovimentacaoController@update');
                Route::post('delete/{id}', 'TipoMovimentacaoController@delete');
            });

            Route::prefix('produtos')->group(function(){
                Route::get('get/{id}', 'ProdutoController@single');
                Route::get('list', 'ProdutoController@list');
                Route::get('options', 'ProdutoController@options');
                Route::post('add', 'ProdutoController@add');
                Route::post('update/{id}', 'ProdutoController@update');
                Route::post('delete/{id}', 'ProdutoController@delete');
            });
        });
    });
});

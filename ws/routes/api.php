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
        });
    });
});

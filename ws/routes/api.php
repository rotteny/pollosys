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
    
        Route::middleware(['auth:api'])->group(function(){
            Route::prefix('usuarios')->group(function(){
                Route::get('details', 'UsuarioController@details');
                Route::get('{id}', 'UsuarioController@single');
                Route::get('', 'UsuarioController@list');
                Route::post('', 'UsuarioController@add');
                Route::put('{id}', 'UsuarioController@update');
                Route::put('', 'UsuarioController@self');
            });

            Route::prefix('condicoes_pagamentos')->group(function(){
                Route::get('{id}', 'CondicaoPagamentoController@single');
                Route::get('', 'CondicaoPagamentoController@list');
                Route::post('', 'CondicaoPagamentoController@add');
                Route::put('{id}', 'CondicaoPagamentoController@update');
            });

            Route::prefix('documentos_financeiros')->group(function(){
                Route::get('{id}', 'DocumentoFinanceiroController@single');
                Route::get('', 'DocumentoFinanceiroController@list');
                Route::post('', 'DocumentoFinanceiroController@add');
                Route::put('{id}', 'DocumentoFinanceiroController@update');
            });

            Route::prefix('tabelas_precos')->group(function(){
                Route::get('{id}', 'TabelaPrecoController@single');
                Route::get('', 'TabelaPrecoController@list');
                Route::post('', 'TabelaPrecoController@add');
                Route::put('{id}', 'TabelaPrecoController@update');
            });

            Route::prefix('clientes')->group(function(){
                Route::get('{id}', 'ClienteController@single');
                Route::get('', 'ClienteController@list');
                Route::post('', 'ClienteController@add');
                Route::put('{id}', 'ClienteController@update');
            });
    
            // PESSOA
            Route::get('pessoas/{tipo}/{documento}', 'PessoaController@single');
        });
    });
});

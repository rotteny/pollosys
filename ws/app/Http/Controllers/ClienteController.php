<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;      
use Illuminate\Support\Facades\Auth;
use App\Models\Pessoa;
use App\Models\Cliente;
use Validator;

class ClienteController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        if(!$cliente = Cliente::with(['pessoa', 'documento_financeiro', 'condicao_pagamento', 'tabela_preco'])->find($id)) return response()->json(['error' => 'Cliente não encontrado'], 404); 
        return response()->json(['cliente' => $cliente], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request) 
    { 
        return response()->json(Cliente::with(['pessoa', 'documento_financeiro', 'condicao_pagamento', 'tabela_preco'])->paginate(env('PAGE_SIZE', 50)), 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function add(Request $request) 
    { 
        $usuario   = Auth::user();
        $validator = Validator::make($request->all(), [ 
            // Cliente
            'documento_financeiro_id'       => 'required', 
            'tabela_preco_id'               => 'required', 
            'condicao_pagamento_id'         => 'required',

            // Pessoa
            'documento'                     => 'required|max:14|cpf_cnpj|documento_unic:' . $usuario->empresa_id, 
            'inscricao_estadual'            => 'max:20',
            'pessoa'                        => 'required|max:1',
            'razao_social'                  => 'required|max:200',
            'endereco'                      => 'required|max:200',
            'complementos'                  => 'required|max:200',
            'bairro'                        => 'required|max:200',
            'cidade'                        => 'required|max:200',
            'estado'                        => 'required|max:2',
            'cep'                           => 'required|max:10',
            'email'                         => 'required|max:200',
            'telefone'                      => 'required|max:200',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        try {
            DB::beginTransaction();
            
            $pessoa = Pessoa::create([
                'documento'                 => $request->input('documento'),
                'pessoa'                    => $request->input('pessoa'),
                'razao_social'              => $request->input('razao_social'),
                'endereco'                  => $request->input('endereco'),
                'complementos'              => $request->input('complementos'),
                'bairro'                    => $request->input('bairro'),
                'cidade'                    => $request->input('cidade'),
                'estado'                    => $request->input('estado'),
                'cep'                       => $request->input('cep'),
                'email'                     => $request->input('email'),
                'telefone'                  => $request->input('telefone'),
                'empresa_id'                => $usuario->empresa_id
            ]);
            
            $cliente = Cliente::create([
                'id'                        => $pessoa->id,
                'documento_financeiro_id'   => $request->input('documento_financeiro_id'),
                'tabela_preco_id'           => $request->input('tabela_preco_id'),
                'condicao_pagamento_id'     => $request->input('razao_social'),
            ]);
            DB::commit();
            
            $success['cliente']   = Cliente::with(['pessoa', 'documento_financeiro', 'condicao_pagamento', 'tabela_preco'])->find($cliente->id);
            return response()->json(['success' => $success], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 401);
        }
        
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function update(Request $request, $id) 
    { 
        $usuario   = Auth::user();
        if (!$cliente = Cliente::with(['pessoa', 'documento_financeiro', 'condicao_pagamento', 'tabela_preco'])->find($id)) return response()->json(['error'=>['Cliente não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            // Cliente
            'documento_financeiro_id'   => 'required', 
            'tabela_preco_id'           => 'required', 
            'condicao_pagamento_id'     => 'required',

            // Pessoa
            'documento'                 => 'required|max:14|cpf_cnpj|documento_unic:' . $usuario->empresa_id . ', ' . $cliente->id, 
            'inscricao_estadual'        => 'max:20',
            'pessoa'                    => 'required|max:1',
            'razao_social'              => 'required|max:200',
            'endereco'                  => 'required|max:200',
            'complementos'              => 'required|max:200',
            'bairro'                    => 'required|max:200',
            'cidade'                    => 'required|max:200',
            'estado'                    => 'required|max:2',
            'cep'                       => 'required|max:10',
            'email'                     => 'required|max:200',
            'telefone'                  => 'required|max:200',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        try {
            DB::beginTransaction();
            
            // Pessoa
            $cliente->pessoa->documento         = $request->input('documento');
            $cliente->pessoa->inscricao_estadual= $request->input('inscricao_estadual');
            $cliente->pessoa->pessoa            = $request->input('pessoa');
            $cliente->pessoa->razao_social      = $request->input('razao_social');
            $cliente->pessoa->endereco          = $request->input('endereco');
            $cliente->pessoa->complementos      = $request->input('complementos');
            $cliente->pessoa->bairro            = $request->input('bairro');
            $cliente->pessoa->cidade            = $request->input('cidade');
            $cliente->pessoa->estado            = $request->input('estado');
            $cliente->pessoa->cep               = $request->input('cep');
            $cliente->pessoa->email             = $request->input('email');
            $cliente->pessoa->telefone          = $request->input('telefone');
            
            // Cliente
            $cliente->documento_financeiro_id   = $request->input('documento_financeiro_id');
            $cliente->tabela_preco_id           = $request->input('tabela_preco_id');
            $cliente->condicao_pagamento_id     = $request->input('razao_social');
            
            $cliente->save();

            DB::commit();
            
            $success['cliente']   = Cliente::with(['pessoa', 'documento_financeiro', 'condicao_pagamento', 'tabela_preco'])->find($cliente->id);
            return response()->json(['success' => $success], 202);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error'=>$e->getMessage()], 401);
        }
    }
}

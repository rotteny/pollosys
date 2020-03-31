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
        if(!$cliente = Cliente::with(['pessoa', 'documento_financeiro', 'condicao_pagamento', 'tabela_preco'])->whereHas('pessoa', function ($query) {
                $usuario   = Auth::user();
                $query->where('empresa_id', $usuario->empresa_id);
            })->find($id)) return response()->json(['error' => 'Cliente não encontrado'], 404); 
        return response()->json(['cliente' => $cliente], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request) 
    { 
        $order = 'id';
        $direction = 'asc';
        
        if(request("s")) list($order, $direction) = explode('|', request("s"));

        return response()->json(Cliente::with(['pessoa'])
            ->select('clientes.*')
            ->join('pessoas', 'pessoas.id', 'clientes.id')
            ->orderBY($order, $direction)
            ->where('is_ativo', 1)
            ->whereHas('pessoa', function ($query) { 
                $usuario   = Auth::user();
                $query->where('empresa_id', $usuario->empresa_id);
                if(request("u")) {
                    $query->where('razao_social', 'like', '%' . request("u") . '%');
                    $query->orWhere('nome_fantasia', 'like', '%' . request("u") . '%');
                    $query->orWhere('codigo', 'like', '%' . request("u") . '%');
                }
            })->paginate(env('PAGE_SIZE', 50)), 200); 
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
            'codigo'                        => 'required|min:3|max:10|codigo_unic:' . $usuario->empresa_id .','. $request->input('id'),
            'documento'                     => 'required|max:14|cpf_cnpj|documento_unic:' . $usuario->empresa_id .','. $request->input('id'), 
            'inscricao_estadual'            => 'max:20',
            'pessoa'                        => 'required|max:1',
            'razao_social'                  => 'required|max:200',
            'nome_fantasia'                 => 'max:200',
            'endereco'                      => 'max:200',
            'complemento'                   => 'max:200',
            'bairro'                        => 'max:200',
            'cidade'                        => 'max:200',
            'estado'                        => 'max:2',
            'cep'                           => 'max:10',
            'email'                         => 'max:200',
            'telefone'                      => 'max:200',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        try {
            DB::beginTransaction();
            
            $pessoa = new Pessoa;
            if($request->input('id')) {
                if(!$pessoa = Pessoa::where('empresa_id', $usuario->empresa_id)
                                ->find($request->input('id'))) return response()->json(['error'=>['Cliente não encontrado.']], 401);
            }

            $pessoa->codigo                 = $request->input('codigo');
            $pessoa->documento              = $request->input('documento');
            $pessoa->inscricao_estadual     = $request->input('inscricao_estadual');
            $pessoa->pessoa                 = $request->input('pessoa');
            $pessoa->razao_social           = $request->input('razao_social');
            $pessoa->nome_fantasia          = $request->input('nome_fantasia');
            $pessoa->endereco               = $request->input('endereco');
            $pessoa->complemento            = $request->input('complemento');
            $pessoa->bairro                 = $request->input('bairro');
            $pessoa->cidade                 = $request->input('cidade');
            $pessoa->estado                 = $request->input('estado');
            $pessoa->cep                    = $request->input('cep');
            $pessoa->email                  = $request->input('email');
            $pessoa->telefone               = $request->input('telefone');
            $pessoa->empresa_id             = $usuario->empresa_id;
            $pessoa->save();

            $cliente = null;
            if($request->input('id')) $cliente = Cliente::find($request->input('id'));
            if(!$cliente) {
                $cliente = new Cliente;
                $cliente->id = $pessoa->id;
            }
            $cliente->documento_financeiro_id   = $request->input('documento_financeiro_id');
            $cliente->tabela_preco_id           = $request->input('tabela_preco_id');
            $cliente->condicao_pagamento_id     = $request->input('condicao_pagamento_id');
            $cliente->is_ativo                  = 1;
            $cliente->save();
            
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
        if (!$cliente = Cliente::with(['pessoa', 'documento_financeiro', 'condicao_pagamento', 'tabela_preco'])
            ->whereHas('pessoa', function ($query) {
                $usuario   = Auth::user();
                $query->where('empresa_id', $usuario->empresa_id);
            })->find($id)) return response()->json(['error'=>['Cliente não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            // Cliente
            'documento_financeiro_id'   => 'required', 
            'tabela_preco_id'           => 'required', 
            'condicao_pagamento_id'     => 'required',

            // Pessoa
            'codigo'                    => 'required|min:3|max:10|codigo_unic:' . $usuario->empresa_id . ', ' . $cliente->id, 
            'documento'                 => 'required|max:14|cpf_cnpj|documento_unic:' . $usuario->empresa_id . ', ' . $cliente->id, 
            'inscricao_estadual'        => 'max:20',
            'pessoa'                    => 'required|max:1',
            'razao_social'              => 'required|max:200',
            'nome_fantasia'             => 'max:200',
            'endereco'                  => 'max:200',
            'complemento'               => 'max:200',
            'bairro'                    => 'max:200',
            'cidade'                    => 'max:200',
            'estado'                    => 'max:2',
            'cep'                       => 'max:10',
            'email'                     => 'max:200',
            'telefone'                  => 'max:200',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        try {
            DB::beginTransaction();
            
            // Pessoa
            $cliente->pessoa->codigo            = $request->input('codigo');
            $cliente->pessoa->documento         = $request->input('documento');
            $cliente->pessoa->inscricao_estadual= $request->input('inscricao_estadual');
            $cliente->pessoa->pessoa            = $request->input('pessoa');
            $cliente->pessoa->razao_social      = $request->input('razao_social');
            $cliente->pessoa->nome_fantasia     = $request->input('nome_fantasia');
            $cliente->pessoa->endereco          = $request->input('endereco');
            $cliente->pessoa->complemento       = $request->input('complemento');
            $cliente->pessoa->bairro            = $request->input('bairro');
            $cliente->pessoa->cidade            = $request->input('cidade');
            $cliente->pessoa->estado            = $request->input('estado');
            $cliente->pessoa->cep               = $request->input('cep');
            $cliente->pessoa->email             = $request->input('email');
            $cliente->pessoa->telefone          = $request->input('telefone');
            
            $cliente->pessoa->save();
            
            // Cliente
            $cliente->documento_financeiro_id   = $request->input('documento_financeiro_id');
            $cliente->tabela_preco_id           = $request->input('tabela_preco_id');
            $cliente->condicao_pagamento_id     = $request->input('condicao_pagamento_id');
            
            $cliente->save();

            DB::commit();
            
            $success['cliente']   = Cliente::with(['pessoa', 'documento_financeiro', 'condicao_pagamento', 'tabela_preco'])->find($cliente->id);
            return response()->json(['success' => $success], 202);
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
    public function delete(Request $request, $id) 
    { 
        $usuario   = Auth::user();
        if (!$cliente = Cliente::whereHas('pessoa', function ($query) {
                $usuario   = Auth::user();
                $query->where('empresa_id', $usuario->empresa_id);
            })->find($id)) return response()->json(['error'=>['Cliente não encontrado.']], 401);
        
        $cliente->is_ativo  = 0;
        $cliente->save();
        return response()->json("", 204);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;      
use Illuminate\Support\Facades\Auth;
use App\Models\Pessoa;
use App\Models\Transportador;
use Validator;

class TransportadorController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        if(!$fornecedor = Transportador::with(['pessoa'])->whereHas('pessoa', function ($query) {
                $usuario   = Auth::user();
                $query->where('empresa_id', $usuario->empresa_id);
            })->find($id)) return response()->json(['error' => 'Transportador não encontrado'], 404); 
        return response()->json(['transportador' => $fornecedor], 200); 
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

        return response()->json(Transportador::with(['pessoa'])
            ->select('transportadors.*')
            ->join('pessoas', 'pessoas.id', 'transportadors.id')
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
                                ->find($request->input('id'))) return response()->json(['error'=>['Transportador não encontrado.']], 401);
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

            $fornecedor = null;
            if($request->input('id')) $fornecedor = Transportador::find($request->input('id'));
            if(!$fornecedor) {
                $fornecedor = new Transportador;
                $fornecedor->id = $pessoa->id;
            }
            $fornecedor->save();
            
            DB::commit();
            
            $success['transportador']   = Transportador::with(['pessoa'])->find($fornecedor->id);
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
        if (!$fornecedor = Transportador::with(['pessoa'])
            ->whereHas('pessoa', function ($query) {
                $usuario   = Auth::user();
                $query->where('empresa_id', $usuario->empresa_id);
            })->find($id)) return response()->json(['error'=>['Transportador não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            // Pessoa
            'codigo'                    => 'required|min:3|max:10|codigo_unic:' . $usuario->empresa_id . ', ' . $fornecedor->id, 
            'documento'                 => 'required|max:14|cpf_cnpj|documento_unic:' . $usuario->empresa_id . ', ' . $fornecedor->id, 
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
            $fornecedor->pessoa->codigo            = $request->input('codigo');
            $fornecedor->pessoa->documento         = $request->input('documento');
            $fornecedor->pessoa->inscricao_estadual= $request->input('inscricao_estadual');
            $fornecedor->pessoa->pessoa            = $request->input('pessoa');
            $fornecedor->pessoa->razao_social      = $request->input('razao_social');
            $fornecedor->pessoa->nome_fantasia     = $request->input('nome_fantasia');
            $fornecedor->pessoa->endereco          = $request->input('endereco');
            $fornecedor->pessoa->complemento       = $request->input('complemento');
            $fornecedor->pessoa->bairro            = $request->input('bairro');
            $fornecedor->pessoa->cidade            = $request->input('cidade');
            $fornecedor->pessoa->estado            = $request->input('estado');
            $fornecedor->pessoa->cep               = $request->input('cep');
            $fornecedor->pessoa->email             = $request->input('email');
            $fornecedor->pessoa->telefone          = $request->input('telefone');
            
            $fornecedor->pessoa->save();
            // $fornecedor->save();

            DB::commit();
            
            $success['transportador']   = Transportador::with(['pessoa'])->find($fornecedor->id);
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
        if (!$fornecedor = Transportador::whereHas('pessoa', function ($query) {
                $usuario   = Auth::user();
                $query->where('empresa_id', $usuario->empresa_id);
            })->find($id)) return response()->json(['error'=>['Transportador não encontrado.']], 401);
        
        $fornecedor->is_ativo  = 0;
        $fornecedor->save();
        return response()->json("", 204);
    }
}

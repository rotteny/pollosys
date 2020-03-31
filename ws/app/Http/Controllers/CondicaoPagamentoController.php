<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\CondicaoPagamento;
use Validator;

class CondicaoPagamentoController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        $usuario = Auth::user();
        if(!$condicaoPagemento = CondicaoPagamento::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error' => 'Condição de Pagamento não encontrado'], 404); 
        return response()->json(['condicaoPagemento' => $condicaoPagemento], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request) 
    { 
        $usuario = Auth::user();

        $where = [['empresa_id', $usuario->empresa_id], ['is_ativo', 1]];
        if(request("u")) $where[] = ['descricao', 'like', '%' . request("u") . '%'];

        $order = 'id';
        $direction = 'asc';
        if(request("s")) list($order, $direction) = explode('|', request("s"));

        return response()->json(CondicaoPagamento::where($where)->orderBY($order, $direction)->paginate(env('PAGE_SIZE', 50)), 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function options(Request $request) 
    { 
        $usuario = Auth::user();
        return response()->json(CondicaoPagamento::where('empresa_id', $usuario->empresa_id)->where('is_ativo', 1)->get(), 200); 
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
            'descricao'                 => 'required|max:200', 
            'numero_parcelas'           => 'required',
            'dia_primeira_parcela'      => 'required',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $condicaoPagemento = CondicaoPagamento::create([
            'descricao'                 => $request->input('descricao'),
            'numero_parcelas'           => $request->input('numero_parcelas'),
            'dia_primeira_parcela'      => $request->input('dia_primeira_parcela'),
            'empresa_id'                => $usuario->empresa_id
        ]);
            
        $success['condicaoPagemento']   = CondicaoPagamento::find($condicaoPagemento->id);
        return response()->json(['success' => $success], 201);
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function update(Request $request, $id) 
    { 
        $usuario   = Auth::user();
        if (!$condicaoPagemento = CondicaoPagamento::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error'=>['Condição de Pagamento não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            'descricao'                 => 'required|max:200', 
            'numero_parcelas'           => 'required',
            'dia_primeira_parcela'      => 'required',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $condicaoPagemento->descricao            = $request->input('descricao');
        $condicaoPagemento->numero_parcelas      = $request->input('numero_parcelas');
        $condicaoPagemento->dia_primeira_parcela = $request->input('dia_primeira_parcela');
        $condicaoPagemento->save();
            
        $success['condicaoPagemento']   = CondicaoPagamento::find($condicaoPagemento->id);
        return response()->json(['success' => $success], 202);
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function delete(Request $request, $id) 
    { 
        $usuario   = Auth::user();
        if (!$condicaoPagamento = CondicaoPagamento::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error'=>['Condição de Pagamento não encontrado.']], 401);
        
        $condicaoPagamento->is_ativo  = 0;
        $condicaoPagamento->save();
        return response()->json("", 204);
    }
}

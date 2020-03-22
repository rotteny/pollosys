<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CondicaoPagamento;

class CondicaoPagamentoController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request) 
    { 
        $usuario = Auth::user();
        if(!$condicaoPagemento = CondicaoPagamento::where("empresa_id", $usuario->empresa_id)->find($id)) return response()->json(['error' => 'Condição de Pagamento não encontrado'], 404); 
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
        return response()->json(CondicaoPagamento::where("empresa_id", $usuario->empresa_id)->paginate(env('PAGE_SIZE', 50)), 200); 
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
        if (!$condicaoPagemento = CondicaoPagamento::find($id)) return response()->json(['error'=>['Condição de Pagamento não encontrado.']], 401);

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
}

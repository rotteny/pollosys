<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DocumentoFinanceiro;
use Illuminate\Support\Facades\Auth;
use Validator;

class DocumentoFinanceiroController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        $usuario = Auth::user();
        if(!$documentoFinanceiro = DocumentoFinanceiro::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error' => 'Documento Financeiro não encontrado'], 404); 
        return response()->json(['documentoFinanceiro' => $documentoFinanceiro], 200); 
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

        return response()->json(DocumentoFinanceiro::where($where)->orderBY($order, $direction)->paginate(env('PAGE_SIZE', 50)), 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function options(Request $request) 
    { 
        $usuario = Auth::user();
        return response()->json(DocumentoFinanceiro::where('empresa_id', $usuario->empresa_id)->where('is_ativo', 1)->get(), 200); 
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
            'descricao'                 => 'required|max:200'
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $documentoFinanceiro = DocumentoFinanceiro::create([
            'descricao'                 => $request->input('descricao'),
            'empresa_id'                => $usuario->empresa_id
        ]);
            
        $success['documentoFinanceiro']   = DocumentoFinanceiro::find($documentoFinanceiro->id);
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
        if (!$documentoFinanceiro = DocumentoFinanceiro::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error'=>['Documento Financeiro não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            'descricao'                 => 'required|max:200', 
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $documentoFinanceiro->descricao            = $request->input('descricao');
        $documentoFinanceiro->save();
            
        $success['documentoFinanceiro']   = DocumentoFinanceiro::find($documentoFinanceiro->id);
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
        if (!$condicao = DocumentoFinanceiro::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error'=>['Documento Financeiro não encontrado.']], 401);
        
        $condicao->is_ativo  = 0;
        $condicao->save();
        return response()->json("", 204);
    }
}

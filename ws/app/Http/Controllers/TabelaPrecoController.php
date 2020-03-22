<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TabelaPreco;
use Validator;

class TabelaPrecoController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        $usuario = Auth::user();
        if(!$tabelaPreco = TabelaPreco::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error' => 'Tablea de Preços não encontrado'], 404); 
        return response()->json(['tabelaPreco' => $tabelaPreco], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request) 
    { 
        $usuario = Auth::user();
        return response()->json(TabelaPreco::where('empresa_id', $usuario->empresa_id)->paginate(env('PAGE_SIZE', 50)), 200); 
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

        $tabelaPreco = TabelaPreco::create([
            'descricao'                 => $request->input('descricao'),
            'empresa_id'                => $usuario->empresa_id
        ]);
            
        $success['tabelaPreco']   = TabelaPreco::find($tabelaPreco->id);
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
        if (!$tabelaPreco = TabelaPreco::find($id)) return response()->json(['error'=>['Documento Financeiro não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            'descricao'                 => 'required|max:200', 
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $tabelaPreco->descricao            = $request->input('descricao');
        $tabelaPreco->save();
            
        $success['tabelaPreco']   = TabelaPreco::find($tabelaPreco->id);
        return response()->json(['success' => $success], 202);
    }
}

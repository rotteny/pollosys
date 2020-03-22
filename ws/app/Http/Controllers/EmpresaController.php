<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Empresa;

class EmpresaController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request) 
    { 
        if(!$empresa = Empresa::find($id)) return response()->json(['error' => 'Empresa não encontrado'], 404); 
        return response()->json(['empresa' => $empresa], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request) 
    { 
        return response()->json(Empresa::paginate(env('PAGE_SIZE', 50)), 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function add(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'nome'                      => 'required|max:200', 
            'resposavel'                => 'required|max:200',
            'imagem_url'                => 'required|max:5000',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $empresa = Empresa::create([
            'nome'                      => $request->input('nome'),
            'resposavel'                => $request->input('resposavel'),
            'imagem_url'                => $request->input('imagem_url'),
        ]);
            
        $success['empresa']   = Empresa::find($empresa->id);
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
        if (!$empresa = Empresa::find($id)) return response()->json(['error'=>['Empresa não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            'nome'                      => 'required|max:200', 
            'resposavel'                => 'required|max:200',
            'imagem_url'                => 'required|max:5000',
            'is_ativo'                  => 'required',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $empresa->nome              = $request->input('nome');
        $empresa->resposavel        = $request->input('resposavel');
        $empresa->imagem_url        = $request->input('imagem_url');
        $empresa->is_ativo          = $request->input('is_ativo');
        $empresa->save();
            
        $success['empresa']   = Empresa::find($empresa->id);
        return response()->json(['success' => $success], 202);
    }
}

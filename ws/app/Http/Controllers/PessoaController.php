<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Pessoa;

class PessoaController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        $usuario = Auth::user();
        if(!$pessoa = Pessoa::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error' => 'Pessoa não encontrado'], 404); 
        return response()->json(['pessoa' => $pessoa], 200); 
    }

    public function documento(Request $request, $tipo, $documento)
    {
        $usuario    = Auth::user();
        
        if(!$pessoa = Pessoa::where([['empresa_id', $usuario->empresa_id]
                                    ,['documento', $documento]])->first()) return response()->json(['error' => 'Pessoa não encontrado'], 404);
        
        if($pessoa->{$tipo}()->where('is_ativo',1)->count() > 0) return response()->json(['error' => 'Dados indisponíveis para cadastro'], 401);

        return response()->json(['pessoa' => $pessoa], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request) 
    { 
        $usuario = Auth::user();
        return response()->json(Pessoa::where('empresa_id', $usuario->empresa_id)->paginate(env('PAGE_SIZE', 50)), 200); 
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
            'codigo'                    => 'required|max:3|max:10',
            'documento'                 => 'required|max:14|cpf_cnpj|documento_unic:' . $usuario->empresa_id, 
            'inscricao_estadual'        => 'max:20',
            'pessoa'                    => 'required|max:1',
            'razao_social'              => 'required|max:200',
            'nome_fantasia'             => 'max:200',
            'endereco'                  => 'max:200',
            'complementos'              => 'max:200',
            'bairro'                    => 'max:200',
            'cidade'                    => 'max:200',
            'estado'                    => 'max:2',
            'cep'                       => 'max:10',
            'email'                     => 'max:200',
            'telefone'                  => 'max:200',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $pessoa = Pessoa::create([
            'codigo'                    => $request->input('codigo'),
            'documento'                 => $request->input('documento'),
            'inscricao_estadual'        => $request->input('inscricao_estadual'),
            'pessoa'                    => $request->input('pessoa'),
            'razao_social'              => $request->input('razao_social'),
            'nome_fantasia'             => $request->input('nome_fantasia'),
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
            
        $success['pessoa']   = Pessoa::find($pessoa->id);
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
        if (!$pessoa = Pessoa::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error'=>['Pessoa não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            'codigo'                    => 'required|max:3|max:10',
            'documento'                 => 'required|max:14|cpf_cnpj|documento_unic:' . $usuario->empresa_id . ', ' . $pessoa->id, 
            'inscricao_estadual'        => 'max:20',
            'pessoa'                    => 'required|max:1',
            'razao_social'              => 'required|max:200',
            'nome_fantasia'             => 'max:200',
            'endereco'                  => 'max:200',
            'complementos'              => 'max:200',
            'bairro'                    => 'max:200',
            'cidade'                    => 'max:200',
            'estado'                    => 'max:2',
            'cep'                       => 'max:10',
            'email'                     => 'max:200',
            'telefone'                  => 'max:200',
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $pessoa->codigo            = $request->input('codigo');
        $pessoa->documento         = $request->input('documento');
        $pessoa->pessoa            = $request->input('pessoa');
        $pessoa->inscricao_estadual= $request->input('inscricao_estadual');
        $pessoa->razao_social      = $request->input('razao_social');
        $pessoa->nome_fantasia     = $request->input('nome_fantasia');
        $pessoa->endereco          = $request->input('endereco');
        $pessoa->complementos      = $request->input('complementos');
        $pessoa->bairro            = $request->input('bairro');
        $pessoa->cidade            = $request->input('cidade');
        $pessoa->estado            = $request->input('estado');
        $pessoa->cep               = $request->input('cep');
        $pessoa->email             = $request->input('email');
        $pessoa->telefone          = $request->input('telefone');
        $pessoa->save();
            
        $success['pessoa']   = Pessoa::find($pessoa->id);
        return response()->json(['success' => $success], 202);
    }
}

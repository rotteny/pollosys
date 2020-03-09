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
    public function single($tipo,$documento) 
    { 
        $usuario = Auth::user();
        $pessoa  = Pessoa::where("documento", $documento)
                    ->where("empresa_id", $usuario->empresa_id)
                    ->first();
        if(!$pessoa) return response()->json(['error' => 'Pessoa não encontrada'], 404); 
        if(!method_exists($pessoa, $tipo)) return response()->json(['error' => 'Tipo informádo é inválido'], 404); 
        $pessoa->{$tipo};
        return response()->json(['pessoa' => $pessoa], 200); 
    }
}

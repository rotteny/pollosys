<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Motorista;
use Illuminate\Support\Facades\Auth;
use Validator;

class MotoristaController extends Controller
{
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        $usuario = Auth::user();
        if(!$veiculo = Motorista::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error' => 'Veículo não encontrado'], 404); 
        return response()->json(['veiculo' => $veiculo], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request, $id = null) 
    { 
        $usuario = Auth::user();

        $where = [['empresa_id', $usuario->empresa_id], ['is_ativo', 1]];
        if(request("u")) $where[] = ['descricao', 'like', '%' . request("u") . '%'];
        if($id) $where[] = ['transportador_id', $id];

        $order = 'id';
        $direction = 'asc';
        if(request("s")) list($order, $direction) = explode('|', request("s"));

        return response()->json(Motorista::where($where)->orderBY($order, $direction)->paginate(env('PAGE_SIZE', 50)), 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function options(Request $request, $id = null) 
    { 
        $usuario = Auth::user();
        $where = [['empresa_id', $usuario->empresa_id]];
        if($id) $where[] = ['transportador_id', $id];
        return response()->json(Motorista::where($where)->where('is_ativo', 1)->get(), 200); 
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

        $veiculo = Motorista::create([
            'descricao'                 => $request->input('descricao'),
            'empresa_id'                => $usuario->empresa_id
        ]);
            
        $success['veiculo']   = Motorista::find($veiculo->id);
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
        if (!$veiculo = Motorista::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error'=>['Veículo não encontrado.']], 401);

        $validator = Validator::make($request->all(), [ 
            'descricao'                 => 'required|max:200', 
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);

        $veiculo->descricao            = $request->input('descricao');
        $veiculo->save();
            
        $success['veiculo']   = Motorista::find($veiculo->id);
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
        if (!$condicao = Motorista::where('empresa_id', $usuario->empresa_id)->find($id)) return response()->json(['error'=>['Veículo não encontrado.']], 401);
        
        $condicao->is_ativo  = 0;
        $condicao->save();
        return response()->json("", 204);
    }
}

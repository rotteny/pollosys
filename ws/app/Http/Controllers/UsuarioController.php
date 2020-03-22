<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use Validator;

class UsuarioController extends Controller
{
    const TOKEN_KEY = '3qLdzoPqC1';

    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(Request $request)
    { 
        if(Auth::attempt(['login' => $request->input('login'), 'password' => $request->input('password'), 'is_ativo' => 1])){ 
            $usuario            = Usuario::with('empresa')->find(Auth::id());
            $success['token']   = $usuario->createToken(self::TOKEN_KEY)->accessToken; 
            $success['usuario'] = $usuario;
            return response()->json(['success' => $success], 200); 
        } 
        else{ 
            return response()->json(['message'=>'Login ou senha informado é inválido.'], 401); 
        } 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        if(!$usuario = Usuario::with('empresa')->find($id)) return response()->json(['error' => 'Usuário não encontrado'], 404); 
        return response()->json(['usuario' => $usuario], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request) 
    { 
        return response()->json(Usuario::with('empresa')->paginate(env('PAGE_SIZE', 50)), 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function add(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'login'      => 'required|unique:usuarios', 
            'password'   => 'required', 
            'empresa_id' => 'required', 
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);            
        
        $input                = $request->all(); 
        $input['password']    = bcrypt($input['password']); 
        
        $usuario              = Usuario::create($input);
        $success['usuario']   = Usuario::with('empresa')->find($usuario->id);
        return response()->json(['success' => $success], 201); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function update(Request $request, $id) 
    { 
        if (!$usuario = Usuario::with('empresa')->find($id)) return response()->json(['error'=>['Usuário não encontrado.']], 401);

        $validation = [];
        if($request->input('login')) {
            $usuario->login      = $request->input('login');
            $validation['login'] = 'required|unique:usuarios,login,' . $usuario->id;
        }
        if($request->input('password')) {
            $usuario->password   = bcrypt($request->input('password'));
            $validation['c_password'] = 'required|same:password';
        }
        if($request->input('is_ativo')) {
            $usuario->is_ativo   = $request->input('is_ativo');
        }

        $validator = Validator::make($request->all(), $validation);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);
        
        $usuario->save();
        $success['usuario']   = $usuario;
        return response()->json(['success' => $success], 202);
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function self(Request $request) 
    { 
        $usuario = Usuario::with('empresa')->find(Auth::id());

        $validation = [];
        if($request->input('login')) {
            $usuario->login      = $request->input('login');
            $validation['login'] = 'required|unique:usuarios,login,' . $usuario->id;
        }
        if($request->input('password')) {
            $usuario->password   = bcrypt($request->input('password'));
            $validation['c_password'] = 'required|same:password';
        }

        $validator = Validator::make($request->all(), $validation);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);
        
        $usuario->save();
        $success['usuario']   = $usuario;
        return response()->json(['success' => $success], 202);
    }

    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details() 
    { 
        $usuario = Usuario::with('empresa')->find(Auth::id());
        return response()->json(['success' => $usuario], 200); 
    }
}

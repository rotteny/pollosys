<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class UserController extends Controller
{
    const TOKEN_KEY = "3qLdzoPqC1";
    
    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 
        if(Auth::attempt(['login' => request('login'), 'password' => request('senha'), 'is_ativo' => 1])){ 
            $user             = Auth::user(); 
            $success['token'] = $user->createToken(self::TOKEN_KEY)-> accessToken; 
            $success['user']  = $user;
            return response()->json(['success' => $success], 200); 
        } 
        else{ 
            return response()->json(['message'=>'E-amil ou senha informado é inválido.'], 401); 
        } 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
    { 
        if(!$user = User::find($id)) return response()->json(['error' => 'Usuário não encontrado'], 404); 
        return response()->json(['user' => $user], 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function list(Request $request) 
    { 
        return response()->json(User::paginate(env('PAGE_SIZE', 50)), 200); 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function add(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'name'       => 'required', 
            'email'      => 'required|email', 
            'password'   => 'required', 
            'c_password' => 'required|same:password', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input             = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        
        $user              = User::create($input); 
        $success['user']   = $user;
        return response()->json(['success' => $success], 201); 
    }

    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details() 
    { 
        $user = Auth::user(); 
        return response()->json(['success' => $user], 200); 
    }
}

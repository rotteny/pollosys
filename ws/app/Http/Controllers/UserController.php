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
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user             = Auth::user(); 
            $success['token'] = $user->createToken(self::TOKEN_KEY)-> accessToken; 
            $success['user']  = $user;
            return response()->json(['success' => $success], 200); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
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
        $success['token']  = $user->createToken(self::TOKEN_KEY)-> accessToken; 
        $success['name']   = $user->name;
        return response()->json(['success' => $success, 'user' => $user], 201); 
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

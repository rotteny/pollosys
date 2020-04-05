<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Filesystem\Filesystem as File;
use Illuminate\Http\Request;
use App\Models\Empresa;
use Validator;

class EmpresaController extends Controller
{
    const PUBLIC_DIR = 'empresas';
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function single(Request $request, $id) 
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
        $where = [];
        if(request("u")) {
            $where[] = ['nome', 'like', '%' . request("u") . '%'];
            $where[] = ['responsavel', 'like', '%' . request("u") . '%'];
        }

        $order = 'id';
        $direction = 'asc';
        if(request("s")) list($order, $direction) = explode('|', request("s"));

        return response()->json(Empresa::orWhere($where)
            ->orderBY($order, $direction)
            ->paginate(env('PAGE_SIZE', 50)), 200); 
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
            'responsavel'               => 'required|max:200'
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);
        
        $empresa = Empresa::create([
            'nome'                      => $request->input('nome'),
            'responsavel'               => $request->input('responsavel'),
            'imagem_url'                => ""
        ]);

        if($request->input('imagem')) $this->imageManager($request->input('imagem'), $empresa);
        
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
            'responsavel'               => 'required|max:200'
        ]);
        if ($validator->fails()) return response()->json(['error'=>$validator->errors()], 401);
        if($request->input('imagem')) $this->imageManager($request->input('imagem'), $empresa);

        $empresa->nome              = $request->input('nome');
        $empresa->responsavel       = $request->input('responsavel');
        $empresa->save();
            
        $success['empresa']   = Empresa::find($empresa->id);
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
        if (!$empresa = Empresa::find($id)) return response()->json(['error'=>['Empresa não encontrado.']], 401);
        
        $directory  = public_path(self::PUBLIC_DIR . DIRECTORY_SEPARATOR. $empresa->id);
        if (File::exists($directory)) File::deleteDirectory($directory);

        if($empresa->delete()) return response()->json("", 204);
        return response()->json("", 401);
    }

    private function imageManager($base64, &$empresa) {
        $separeFile = explode(',', $base64);
        $image      = $separeFile[1];

        //obtem a extensão
        $extension  = explode('/', $separeFile[0]);
        $extension  = explode(';', $extension[1]);
        $extension  = '.'.$extension[0];
        
        $directory  = self::PUBLIC_DIR . '/'. $empresa->id;
        $filename   = $directory . '/' . substr( md5( $empresa->id . '-' . time() ), 0, 15) . $extension;
        
        $path       = str_replace('/', DIRECTORY_SEPARATOR, public_path($filename));
        $directory  = str_replace('/', DIRECTORY_SEPARATOR, public_path($directory));
        
        if($empresa->imagem_url) {
            if(strpos($empresa->imagem_url, 'http') === false) {
                @unlink(str_replace('/', DIRECTORY_SEPARATOR, public_path($empresa->imagem_url)));
            }
        }

        try {
            if(!is_dir($directory)) mkdir($directory);
            $img = Image::make($image)->resize(400, null, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($path);
        } catch (\Exception $e) {
            //dd($e);
            return false;
        }

        // now update the photo column on the student record
        $empresa->imagem_url = $filename;
        return $empresa->save();
    }
}

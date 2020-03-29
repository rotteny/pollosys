<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Validator::extend('cpf_cnpj', function ($attribute, $value, $parameters, $validator) {
            return (new \App\Utis\ValidaCPFCNPJ($value))->valida();
        });

        \Validator::extend('documento_unic', function ($attribute, $value, $parameters, $validator) {   
            $where = [["documento", $value]];

            if(!isset($parameters[0])) return false;
            $where[] = ["empresa_id", $parameters[0]];

            if(isset($parameters[1]) && $parameters[1]) $where[] = ["id", "<>", $parameters[1]];
            return (\App\Models\Pessoa::where($where)->count() === 0);
        });

        \Validator::extend('codigo_unic', function ($attribute, $value, $parameters, $validator) {   
            $where = [["codigo", $value]];

            if(!isset($parameters[0])) return false;
            $where[] = ["empresa_id", $parameters[0]];

            if(isset($parameters[1]) && $parameters[1]) $where[] = ["id", "<>", $parameters[1]];
            return (\App\Models\Pessoa::where($where)->count() === 0);
        });
    }

    
}

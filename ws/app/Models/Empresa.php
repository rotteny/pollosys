<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $fillable = [
        'nome', 'responsavel', 'imagem_url', 'is_ativo'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    /**
     * Get the phone record associated with the user.
     */
    public function usuarios()
    {
        return $this->hasMany('App\Models\Usuario');
    }

    /**
     * Get the phone record associated with the user.
     */
    public function pessoas()
    {
        return $this->hasMany('App\Models\Pessoa');
    }

    /**
     * Get the phone record associated with the user.
     */
    public function clientes()
    {
        return $this->hasManyThrough(
            'App\Models\Pessoa',
            'App\Models\Cliente',
            'id', // Foreign key on users table...
            'user_id', // Foreign key on posts table...
            'id', // Local key on countries table...
            'id' // Local key on users table...
        );
        return $this->hasMany('App\Models\Cliente');
    }

    /**
     * Get the phone record associated with the user.
     */
    public function tabelas_precos()
    {
        return $this->hasMany('App\Models\TabelaPreco');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CondicaoPagamento extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'condicoes_pagamento';
    
    protected $fillable = [
        'descricao', 'numero_parcelas', 'dia_primeira_parcela', 'empresa_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];
}

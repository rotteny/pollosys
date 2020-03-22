<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TabelaPreco extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tabelas_precos';

    protected $fillable = [
        'descricao', 'empresa_id'
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

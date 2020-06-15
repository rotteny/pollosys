<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoMovimentacao extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tipos_movimentacoes';

    protected $fillable = [
        'descricao', 'operacao', 'empresa_id', 'is_ativo'
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

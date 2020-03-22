<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentoFinanceiro extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'documentos_financeiros';

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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{   
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'clientes';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $fillable = [
        'id', 'documento_financeiro_id', 'tabela_preco_id', 'condicao_pagamento_id', 'is_ativo'
    ];

    public function documento_financeiro()
    {
        return $this->belongsTo('App\Models\DocumentoFinanceiro', 'documento_financeiro_id');
    }

    public function tabela_preco()
    {
        return $this->belongsTo('App\Models\TabelaPreco', 'tabela_preco_id');
    }

    public function condicao_pagamento()
    {
        return $this->belongsTo('App\Models\CondicaoPagamento', 'condicao_pagamento_id');
    }
    
    public function pessoa()
    {
        return $this->belongsTo('App\Models\Pessoa', 'id');
    }
}

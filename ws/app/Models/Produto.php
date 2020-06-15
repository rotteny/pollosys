<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'produtos';

    protected $fillable = [
        'descricao', 'ncm', 'origem', 'procedencia', 'tabela_preco_id',
        'compra_unidade_medida_id', 'venda_unidade_medida_id', 'empresa_id', 'ativo_id'
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
    public function tabelaPreco()
    {
        return $this->hasOne('App\Models\TabelaPreco', 'tabela_preco_id');
    }

    /**
     * Get the phone record associated with the user.
     */
    public function compraUnidadeMedida()
    {
        return $this->hasOne('App\Models\UnidadeMedida', 'compra_unidade_medida_id');
    }

    /**
     * Get the phone record associated with the user.
     */
    public function vendaUnidadeMedida()
    {
        return $this->hasOne('App\Models\UnidadeMedida', 'venda_unidade_medida_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pessoas';

    protected $fillable = [
        'documento', 'pessoa', 'inscricao_estadual', 'razao_social', 'nome_fantasia', 
        'endereco', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'email',
        'telefone', 'codigo', 'empresa_id', 'ativo_id'
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
    public function cliente()
    {
        return $this->hasOne('App\Models\Cliente', 'id');
    }

    /**
     * Get the phone record associated with the user.
     */
    public function fornecedor()
    {
        return $this->hasOne('App\Models\Fornecedor', 'id');
    }

    /**
     * Get the phone record associated with the user.
     */
    public function transportador()
    {
        return $this->hasOne('App\Models\Transportador', 'id');
    }
}

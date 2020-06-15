<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Motorista extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'motoristas';

    protected $fillable = [
        'nome', 'cpf', 'data_nascimento', 'numero_habilitacao', 'categoria', 'data_expedicao', 
        'data_renovacao', 'endereco', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 
        'email', 'telefone', 'empresa_id', 'transportador_id'
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

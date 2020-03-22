<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = [
        'documento', 'pessoa', 'inscricao_estadual', 'razao_social', 'nome_fantazia', 
        'endereco', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'email',
        'telefone'
    ];
    
    public function pessoa()
    {
        return $this->belongsTo('App\Models\Pessoa', 'id');
    }
}

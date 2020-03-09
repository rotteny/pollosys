<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
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
    // public function fornecedor()
    // {
    //     return $this->hasOne('App\Models\Fornecedor', 'id');
    // }
}

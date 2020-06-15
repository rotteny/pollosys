<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transportador extends Model
{   
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'transportadores';

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
        'id', 'is_ativo'
    ];
    
    public function pessoa()
    {
        return $this->belongsTo('App\Models\Pessoa', 'id');
    }
}

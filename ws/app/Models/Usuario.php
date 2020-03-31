<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Usuario extends Authenticatable
{
    // protected $table = 'usuarios';

    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login', 'password', 'empresa_id', 'is_admin', 'is_ativo'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'created_at', 'updated_at'
    ];

    /**
     * Get the phone record associated with the user.
     */
    public function empresa()
    {
        return $this->belongsTo('App\Models\Empresa');
    }

    public function isAdmin()
    {
        return $this->is_admin === 1;
    }

    public function isAtivo()
    {
        return $this->is_ativo === 1;
    }
}

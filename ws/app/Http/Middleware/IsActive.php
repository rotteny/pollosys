<?php

namespace App\Http\Middleware;

use Closure;

class IsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(auth()->user()->isAtivo()) {
            return $next($request);
        }
        return response()->json(['error' => 'Usuário sem permissão de acesso'], 401);
    }
}

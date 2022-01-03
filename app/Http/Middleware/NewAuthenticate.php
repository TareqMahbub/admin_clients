<?php

namespace App\Http\Middleware;

use App\Helpers\Token;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Cache;

class NewAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $header = $request->header('Authorization');
        $access_key = $request->header('X-ACCESS-KEY');

        if(empty($header) || empty($access_key)){
            throw new AuthenticationException('Unauthenticated.');
        }

        $access_token = Token::basicToken($header);

        $is_authenticated = false;
        $auth_record = json_decode(Cache::get($access_key), true);
        if(!empty($auth_record)){
            $is_authenticated = $auth_record['access_token'] == $access_token;
        }

        if(!$is_authenticated){
            throw new AuthenticationException('Unauthenticated.');
        }

        return $next($request);
    }
}

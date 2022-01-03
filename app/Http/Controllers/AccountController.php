<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Auth\CreatesUserProviders;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AccountController extends Controller
{
    use CreatesUserProviders;

    public function register(){
        $validated_inputs = request()->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|max:255|email|unique:admins',
            'password' => 'required|string|min:6|max:64|confirmed',
        ]);

        $validated_inputs['password'] = bcrypt($validated_inputs['password']);

        Admin::create($validated_inputs);

        return $this->make_api_response("Account creation Successful. You can login now.");
    }

    public function login(){
        $credentials = request()->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('email', $credentials['email'])->first();
        if(empty($admin)){
            return $this->make_api_response("Login failed.", [], [ 'email' => ['Email not found!'] ], 401);
        }

        if(!Hash::check($credentials['password'], $admin->password)){
            return $this->make_api_response("Login failed.", [], [ 'password' => ['Wrong password!'] ], 401);
        }

        $access_key = base_convert(time() . rand(111111, 999999) . rand(111111, 999999), 10, 36);
        $access_token = base64_encode(Str::random(60));

        Cache::put($access_key, json_encode(['access_token' => $access_token, 'admin_id' => $admin->id]));

        return $this->make_api_response("Login successfully.", [
            'access_key' => $access_key,
            'access_token' => $access_token,
            'username' => explode(' ', $admin->name)[0],
            'expires_at' => now()->addMinute(config('session.lifetime'))
        ]);
    }

    public function logout(){
        $access_key = request()->header('X-ACCESS-KEY');
        Cache::forget($access_key);

        return $this->make_api_response("Logout successful.");
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Example errors:
     * [
     *      'message' => 'The given data was invalid.'
     *      'errors' => [
     *          'email' => ['The email has already been taken.'],
     *          'password' => ['The password confirmation does not match.']
     *      ]
     * ]
     */
    protected function make_api_response(string $message, array $data = [], array $errors = [], int $code = 200){
        return response([
            'message' => $message,
            'data' => $data,
            'errors' => $errors
        ], $code);
    }
}

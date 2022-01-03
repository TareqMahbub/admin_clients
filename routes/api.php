<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ClientController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/register', [ AccountController::class, 'register' ]);
Route::post('/login', [ AccountController::class, 'login' ]);

//add client
//fetch client
//edit client
//delete client
//update profile
//logout



Route::middleware(['basic_api_auth'])->group(function () {
    Route::post('/logout', [ AccountController::class, 'logout' ]);

    Route::get('/admin-clients', [ ClientController::class, 'index' ]);
    Route::get('/clients/{client}', [ ClientController::class, 'fetch' ]);
    Route::post('/clients/add', [ ClientController::class, 'add' ]);
    Route::post('/clients/{client}/update', [ ClientController::class, 'update' ]);
    Route::post('/clients/{client}/delete', [ ClientController::class, 'delete' ]);
});

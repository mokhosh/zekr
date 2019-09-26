<?php

use App\Corpus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', 'AuthController@login');
Route::post('refresh', 'AuthController@refresh');
Route::post('register', 'AuthController@register');

Route::middleware('auth:api')->group(function() {
    Route::get('/user', 'AuthController@user');
    Route::post('logout', 'AuthController@logout');
    Route::get('quran', 'QuranController@page');
    Route::get('corpuses', 'MetaController@corpuses');
});

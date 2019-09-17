<?php

use App\Corpus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');
Route::middleware('auth:api')->post('logout', 'AuthController@logout');

Route::get('quran', function (Request $request) {
    $page_number = $request->get('page_number', 1);
    $quran = \App\Page::with('verses')->with('verses.texts')->find($page_number);
    return $quran;
});

Route::get('corpuses', function (Request $request) {
    return Corpus::all();
});

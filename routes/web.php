<?php

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::get('/fonts/bustani.otf', function () { //WTF!
    return Response::download(storage_path('app/public/fonts/bustani.otf'));
});
Route::get('/{any}', 'AppController')->where('any', '.*');

<?php

namespace App\Http\Controllers;

use App\Corpus;

class MetaController extends Controller
{
    public function corpuses()
    {
        return Corpus::all();
    }
}

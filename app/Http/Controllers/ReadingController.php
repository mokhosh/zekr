<?php

namespace App\Http\Controllers;

use App\Reading;
use Illuminate\Http\Request;

class ReadingController extends Controller
{
    public function index()
    {
        return request()->user()->readings;
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Reading $reading)
    {
        //
    }

    public function update(Request $request, Reading $reading)
    {
        //
    }

    public function destroy(Reading $reading)
    {
        //
    }
}

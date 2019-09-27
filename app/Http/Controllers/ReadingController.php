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
        return $request->user()->readings()->create(['title' => $request->get('title'), 'page_id' => 1]);
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

    public function setReading(Request $request)
    {
        $request->user()->reading()->associate($request->get('reading_id'))->save();
        return response()->json(['message' => 'done']);
    }
}

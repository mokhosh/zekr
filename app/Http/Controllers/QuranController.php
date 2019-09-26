<?php

namespace App\Http\Controllers;

use App\Page;
use Illuminate\Http\Request;

class QuranController extends Controller
{
    public function page(Request $request) {
        $page_number = $request->get('page_number') ?? $request->user()->reading->page_id;
        $request->user()->reading->update(['page_id' => $page_number]);
        $quran = Page::with('verses')->with('verses.texts')->find($page_number);
        return $quran;
    }
}

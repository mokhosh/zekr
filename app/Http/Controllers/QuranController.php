<?php

namespace App\Http\Controllers;

use App\Page;
use Illuminate\Http\Request;

class QuranController extends Controller
{
    public function page(Request $request) {
        $page_number = $request->get('page_number', 1);
        $quran = Page::with('verses')->with('verses.texts')->find($page_number);
        return $quran;
    }
}

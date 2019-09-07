<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Verse extends Model
{
    protected $guarded = [];

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function texts()
    {
        return $this->hasMany(VerseText::class);
    }
}

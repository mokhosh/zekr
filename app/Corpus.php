<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Corpus extends Model
{
    protected $guarded = [];

    public function verse_texts()
    {
        return $this->hasMany(VerseText::class);
    }
}

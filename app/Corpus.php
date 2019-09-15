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

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
        ] + ($this->relationLoaded('language') ? ['language' => $this->language] : []);
    }
}

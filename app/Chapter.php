<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    protected $guarded = [];

    public function verses()
    {
        return $this->hasMany(Verse::class);
    }

    public function names()
    {
        return $this->hasMany(ChapterName::class);
    }

    /*public function toArray()
    {
        return [
            'id' => $this->id,
            'location' => $this->revelation_location,
            'order' => $this->revelation_order,
            'name' => $this->names()->first()->name,
            'page' => $this->verses()->first()->page_id,
        ];
    }*/
}

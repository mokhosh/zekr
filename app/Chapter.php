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
}

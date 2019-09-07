<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $guarded = [];

    public function verses()
    {
        return $this->hasMany(Verse::class);
    }
}

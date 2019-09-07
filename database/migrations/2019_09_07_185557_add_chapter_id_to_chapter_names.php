<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddChapterIdToChapterNames extends Migration
{
    public function up()
    {
        Schema::table('chapter_names', function (Blueprint $table) {
            $table->unsignedBigInteger('chapter_id');
        });
    }

    public function down()
    {
        Schema::table('chapter_names', function (Blueprint $table) {
            $table->dropColumn('chapter_id');
        });
    }
}

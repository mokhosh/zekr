<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVerseTextsTable extends Migration
{
    public function up()
    {
        Schema::create('verse_texts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->longText('text');
            $table->unsignedBigInteger('corpus_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('verse_texts');
    }
}

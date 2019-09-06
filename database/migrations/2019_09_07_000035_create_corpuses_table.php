<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCorpusesTable extends Migration
{
    public function up()
    {
        Schema::create('corpuses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->unsignedBigInteger('language_id');
            $table->string('type'); // original, translation, interpretation
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('corpuses');
    }
}

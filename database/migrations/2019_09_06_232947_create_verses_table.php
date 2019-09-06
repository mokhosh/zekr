<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVersesTable extends Migration
{
    public function up()
    {
        Schema::create('verses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('chapter_id');
            $table->unsignedBigInteger('page_id');
            $table->string('prostration_type')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('verses');
    }
}

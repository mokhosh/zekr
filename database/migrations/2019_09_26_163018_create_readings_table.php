<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReadingsTable extends Migration
{
    public function up()
    {
        Schema::create('readings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->unsignedBigInteger('page_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('readings');
    }
}

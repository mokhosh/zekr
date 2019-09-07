<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrderToVerses extends Migration
{
    public function up()
    {
        Schema::table('verses', function (Blueprint $table) {
            $table->integer('number')->after('id');
        });
    }

    public function down()
    {
        Schema::table('verses', function (Blueprint $table) {
            $table->dropColumn('number');
        });
    }
}

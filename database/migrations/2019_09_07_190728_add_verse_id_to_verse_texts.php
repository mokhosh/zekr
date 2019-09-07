<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddVerseIdToVerseTexts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('verse_texts', function (Blueprint $table) {
            $table->unsignedBigInteger('verse_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('verse_texts', function (Blueprint $table) {
            $table->dropColumn('verse_id');
        });
    }
}

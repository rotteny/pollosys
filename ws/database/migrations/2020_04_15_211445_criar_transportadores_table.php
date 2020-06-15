<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTransportadoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportadores', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->smallInteger('is_ativo')
                ->nullable(false)
                ->default(1);
            
            $table->primary('id');
            $table->foreign('id')
                ->references('id')
                ->on('pessoas')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transportadores');
    }
}

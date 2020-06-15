<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarVeiculosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('veiculos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('placa', 10);
            $table->string('marca', 200);
            $table->string('modelo', 200);
            $table->integer('ano_fabricacao');
            $table->decimal('capacidade',8,2);
            $table->smallInteger('is_ativo')
                ->nullable(false)
                ->default(1);
            $table->unsignedBigInteger('empresa_id')
                ->nullable(false);
            $table->unsignedBigInteger('transportador_id')
                ->nullable(false);
            $table->foreign('empresa_id')
                ->references('id')
                ->on('empresas')
                ->onDelete('cascade');
            $table->foreign('transportador_id')
                ->references('id')
                ->on('transportadores')
                ->onDelete('cascade');
            $table->unique(['placa','empresa_id','transportador_id']);
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
        Schema::dropIfExists('veiculos');
    }
}

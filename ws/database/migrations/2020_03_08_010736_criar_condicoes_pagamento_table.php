<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarCondicoesPagamentoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('condicoes_pagamento', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('descricao', 200);
            $table->integer('numero_parcelas')
                ->nullable(false);
            $table->integer('dia_primeira_parcela')
                ->nullable(false);
            $table->unsignedBigInteger('empresa_id')
                ->nullable(false);
            $table->smallInteger('is_ativo')
                ->nullable(false)
                ->default(1);
            $table->foreign('empresa_id')
                ->references('id')
                ->on('empresas')
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
        Schema::dropIfExists('condicoes_pagamento');
    }
}

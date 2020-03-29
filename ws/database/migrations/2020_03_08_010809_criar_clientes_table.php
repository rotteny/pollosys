<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('documento_financeiro_id')
                ->nullable(false);
            $table->unsignedBigInteger('tabela_preco_id')
                ->nullable(false);
            $table->unsignedBigInteger('condicao_pagamento_id')
                ->nullable(false);
            $table->smallInteger('is_ativo')
                ->nullable(false)
                ->default(1);
            
            $table->primary('id');
            $table->foreign('id')
                ->references('id')
                ->on('pessoas')
                ->onDelete('cascade');
            $table->foreign('documento_financeiro_id', 'clientes_documentos_financeiros_fk')
                ->references('id')
                ->on('documentos_financeiros');
            $table->foreign('tabela_preco_id', 'clientes_tabelas_precos_fk')
                ->references('id')
                ->on('tabelas_precos');
            $table->foreign('condicao_pagamento_id', 'clientes_condicoes_paramento_fk')
                ->references('id')
                ->on('condicoes_pagamento');
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
        Schema::dropIfExists('clientes');
    }
}

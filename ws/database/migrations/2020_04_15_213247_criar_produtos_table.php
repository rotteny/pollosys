<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarProdutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('descricao', 200);
            $table->string('ncm', 200)
                ->nullable(true);
            $table->string('origem', 200)
                ->nullable(true);
            $table->string('procedencia', 200)
                ->nullable(true);
            $table->smallInteger('is_ativo')
                ->nullable(false)
                ->default(1);
            
            $table->unsignedBigInteger('compra_unidade_medida_id')
                ->nullable(false);
            $table->foreign('compra_unidade_medida_id')
                ->references('id')
                ->on('unidades_medidas');
            $table->unsignedBigInteger('venda_unidade_medida_id')
                ->nullable(false);
            $table->foreign('venda_unidade_medida_id')
                ->references('id')
                ->on('unidades_medidas');

            $table->unsignedBigInteger('tabela_preco_id')
                ->nullable(false);
            $table->foreign('tabela_preco_id')
                ->references('id')
                ->on('tabelas_precos');

            $table->unsignedBigInteger('empresa_id')
                ->nullable(false);
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
        Schema::dropIfExists('produtos');
    }
}

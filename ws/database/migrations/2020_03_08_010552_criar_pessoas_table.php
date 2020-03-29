<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarPessoasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pessoas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('codigo', 20);
            $table->enum('pessoa', ['F', 'J']);
            $table->string('documento', 14);
            $table->string('inscricao_estadual', 20)
                ->nullable(true);
            $table->string('razao_social', 200);
            $table->string('nome_fantasia', 200)
                ->nullable(true);
            $table->string('endereco', 200)
                ->nullable(true);
            $table->string('complemento', 200)
                ->nullable(true);
            $table->string('bairro', 200)
                ->nullable(true);
            $table->string('cidade', 200)
                ->nullable(true);
            $table->char('estado', 2)
                ->nullable(true);   
            $table->string('cep', 10)
                ->nullable(true);
            $table->string('email', 200)
                ->nullable(true);
            $table->string('telefone', 200)
                ->nullable(true);
            $table->unsignedBigInteger('empresa_id')
                ->nullable(false);
            $table->foreign('empresa_id', 'pressoas_empresas_fk')
                ->references('id')
                ->on('empresas')
                ->onDelete('cascade');
            $table->unique(['documento','empresa_id']);
            $table->unique(['codigo','empresa_id']);
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
        Schema::dropIfExists('pessoas');
    }
}

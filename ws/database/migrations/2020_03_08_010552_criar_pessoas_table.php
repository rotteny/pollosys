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
            $table->enum('pessoa', ['F', 'J']);
            $table->string('documento', 14);
            $table->string('inscricao_estadual', 20);
            $table->string('razao_social', 200);
            $table->string('nome_fantazia', 200);
            $table->string('endereco', 200);
            $table->string('complemento', 200);
            $table->string('bairro', 200);
            $table->string('cidade', 200);
            $table->char('estado', 2);
            $table->string('cep', 10);
            $table->string('email', 200);
            $table->string('telefone', 200);
            $table->unsignedBigInteger('empresa_id')
                ->nullable(false);
            $table->foreign('empresa_id', 'pressoas_empresas_fk')
                ->references('id')
                ->on('empresas')
                ->onDelete('cascade');
            $table->unique(['documento','empresa_id']);
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

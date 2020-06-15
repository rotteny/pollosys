<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarMotoristasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('motoristas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nome', 200);
            $table->string('cpf', 11);
            $table->date('data_nascimento');

            $table->string('numero_habilitacao', 11);
            $table->string('categoria', 5);
            $table->date('data_expedicao');
            $table->date('data_renovacao');

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
            $table->unique(['cpf','empresa_id','transportador_id']);
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
        Schema::dropIfExists('motoristas');
    }
}

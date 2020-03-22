<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarDocumentosFinanceirosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documentos_financeiros', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('descricao', 200);
            $table->unsignedBigInteger('empresa_id')
                ->nullable(false);
            $table->foreign('empresa_id', 'documentos_financeiros_empresas_fk')
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
        Schema::dropIfExists('documentos_financeiros');
    }
}
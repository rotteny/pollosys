<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('login')
                ->unique();
            $table->string('password');
            $table->smallInteger('is_admin')
                ->nullable(false)
                ->default(0);
            $table->smallInteger('is_ativo')
                ->nullable(false)
                ->default(1);
            $table->unsignedBigInteger('empresa_id')
                ->nullable(true);
            $table->timestamps();
            
            $table->foreign('empresa_id')
                ->references('id')
                ->on('empresas')
                ->onDelete('cascade');
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}

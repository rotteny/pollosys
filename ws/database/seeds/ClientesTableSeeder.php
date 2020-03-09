<?php

use Illuminate\Database\Seeder;

class ClientesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clientes')->insert([
            'id'                        => 1,
            'documento_financeiro_id'   => 1,
            'tabela_preco_id'           => 1,
            'condicao_pagamento_id'     => 1,
        ]);
    }
}

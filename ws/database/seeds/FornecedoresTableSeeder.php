<?php

use Illuminate\Database\Seeder;

class FornecedoresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('fornecedores')->insert([
            'id'                        => 1,
            'documento_financeiro_id'   => 1,
            'condicao_pagamento_id'     => 1,
        ]);
    }
}

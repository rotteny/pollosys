<?php

use Illuminate\Database\Seeder;

class CondicoesPagamentosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('condicoes_pagamento')->insert([
            'descricao'             => 'Pagamento à Vista',
            'numero_parcelas'       => 1,
            'dia_primeira_parcela'  => 0,
            'empresa_id'            => 1,
            'created_at'            => date("Y-m-d H:i:s"),
            'updated_at'            => date("Y-m-d H:i:s"),
        ]);
    }
}

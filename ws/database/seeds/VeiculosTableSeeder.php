<?php

use Illuminate\Database\Seeder;

class VeiculosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('veiculos')->insert([
            'placa'             => 'ABC1234',
            'marca'             => 'Fiat',
            'modelo'            => 'Toro',  
            'ano_fabricacao'    => 2015,
            'capacidade'        => 0.65,
            'transportador_id'  => 1,
            'empresa_id'        => 1,
            'created_at'        => date("Y-m-d H:i:s"),
            'updated_at'        => date("Y-m-d H:i:s"),
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class UnidadesMedidasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('unidades_medidas')->insert([
            'descricao'     => 'Unidade',
            'empresa_id'    => 1,
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s"),
        ]);
        DB::table('unidades_medidas')->insert([
            'descricao'     => 'Kg',
            'empresa_id'    => 1,
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s"),
        ]);
    }
}

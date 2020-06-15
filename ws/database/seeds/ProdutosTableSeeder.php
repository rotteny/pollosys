<?php

use Illuminate\Database\Seeder;

class ProdutosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('produtos')->insert([
            'descricao'                 => 'Frango Resfriado (Inteiro)',
            'origem'                    => 'Grj. Campo Limpo',
            'procedencia'               => '',
            'empresa_id'                => 1,
            'compra_unidade_medida_id'  => 2,
            'venda_unidade_medida_id'   => 1,
            'tabela_preco_id'           => 1,
            'created_at'            => date("Y-m-d H:i:s"),
            'updated_at'            => date("Y-m-d H:i:s"),
        ]);
    }
}

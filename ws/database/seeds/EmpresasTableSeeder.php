<?php

use Illuminate\Database\Seeder;

class EmpresasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('empresas')->insert([
            'nome'          => 'Empresa Teste',
            'responsavel'   => 'Dono da Empresa Teste',
            'imagem_url'    => 'https://www.pollosys.com.br/ws/public/empresas/1/cliente-logo.jpg',
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s"),
        ]);
    }
}

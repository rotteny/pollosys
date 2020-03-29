<?php

use Illuminate\Database\Seeder;

class PessoasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pessoas')->insert([
            'codigo'                => 'ABC',
            'pessoa'                => 'F',
            'documento'             => '01234567890',
            'inscricao_estadual'    => '',
            'razao_social'          => 'João Almeida Júnior',
            'nome_fantasia'         => '',
            'endereco'              => 'Rua Casarão, 15',
            'complemento'           => 'Casa',
            'bairro'                => 'Novo Horizonte',
            'cidade'                => 'Bragança Paulista',
            'estado'                => 'SP',
            'cep'                   => '00000000',
            'email'                 => 'jalmeidaj@hotmail.com',
            'telefone'              => '11912341234',
            'empresa_id'            => 1,
            'created_at'            => date("Y-m-d H:i:s"),
            'updated_at'            => date("Y-m-d H:i:s"),
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class MotoristasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('motoristas')->insert([
            'nome'                  => 'Fabio Júnior',
            'cpf'                   => '01234567890',
            'data_nascimento'       => '1998-01-09',
            'numero_habilitacao'    => '09876543210',
            'categoria'             => 'D',
            'data_expedicao'        => '2019-09-12',
            'data_renovacao'        => '2022-10-26',
            'endereco'              => 'Rua Casarão, 15',
            'complemento'           => 'Casa',
            'bairro'                => 'Novo Horizonte',
            'cidade'                => 'Bragança Paulista',
            'estado'                => 'SP',
            'cep'                   => '00000000',
            'email'                 => 'fjunior@gmail.com',
            'telefone'              => '1191155151',
            'empresa_id'            => 1,
            'transportador_id'      => 1,
            'created_at'            => date("Y-m-d H:i:s"),
            'updated_at'            => date("Y-m-d H:i:s"),
        ]);
    }
}

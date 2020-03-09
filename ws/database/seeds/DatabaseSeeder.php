<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call([
            EmpresasTableSeeder::class,
            UsuariosTableSeeder::class,
            CondicoesPagamentosTableSeeder::class,
            DocumentosFinanceirosTableSeeder::class,
            TabelasPrecosTableSeeder::class,
            PessoasTableSeeder::class,
            ClientesTableSeeder::class
        ]);
    }
}

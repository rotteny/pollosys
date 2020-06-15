<?php

use Illuminate\Database\Seeder;

class TransportadoresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('transportadores')->insert([
            'id'                  => 1
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            TaskSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Bruno',
            'email' => 'bruno@teste.com',
            'password' => bcrypt('senha123'),
        ]);
    }
}

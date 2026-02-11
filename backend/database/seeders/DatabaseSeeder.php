<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Roles
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'dev']);
        Role::create(['name' => 'client']);

        $this->call([
            UserSeeder::class,
        ]);
    }
}

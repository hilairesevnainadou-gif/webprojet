<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Settings
        Setting::create(['key' => 'site_name', 'value' => 'NovaTech']);
        Setting::create(['key' => 'site_logo', 'value' => '']); // URL or base64

        // Roles
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'dev']);
        Role::create(['name' => 'client']);

        $this->call([
            UserSeeder::class,
            ServiceSeeder::class,
            BlogSeeder::class,
            ProjetSeeder::class,
            ProduitSeeder::class,
        ]);
    }
}

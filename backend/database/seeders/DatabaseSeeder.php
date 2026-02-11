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
        Setting::create(['key' => 'site_description', 'value' => 'Solutions numériques innovantes pour votre entreprise.']);
        Setting::create(['key' => 'portfolio_intro', 'value' => 'Nous créons des solutions logicielles sur mesure, du développement web à la cybersécurité. Donnez vie à vos projets numériques.']);
        Setting::create(['key' => 'rccm', 'value' => 'RCCM-CI-ABJ-01-2026-B12-12345']);

        // Permissions
        $p1 = \App\Models\Permission::create(['name' => 'manage_services', 'label' => 'Gérer les services']);
        $p2 = \App\Models\Permission::create(['name' => 'manage_devis', 'label' => 'Gérer les devis']);
        $p3 = \App\Models\Permission::create(['name' => 'manage_blog', 'label' => 'Gérer le blog']);
        $p4 = \App\Models\Permission::create(['name' => 'manage_projets', 'label' => 'Gérer les projets']);
        $p5 = \App\Models\Permission::create(['name' => 'manage_marketplace', 'label' => 'Gérer la marketplace']);
        $p6 = \App\Models\Permission::create(['name' => 'manage_settings', 'label' => 'Gérer les paramètres']);

        // Roles
        $admin = Role::create(['name' => 'admin']);
        $dev = Role::create(['name' => 'dev']);
        $client = Role::create(['name' => 'client']);

        // Sync Admin Permissions
        $admin->permissions()->sync([$p1->id, $p2->id, $p3->id, $p4->id, $p5->id, $p6->id]);
        $dev->permissions()->sync([$p3->id, $p4->id]);

        $this->call([
            UserSeeder::class,
            ServiceSeeder::class,
            BlogSeeder::class,
            ProjetSeeder::class,
            ProduitSeeder::class,
        ]);
    }
}

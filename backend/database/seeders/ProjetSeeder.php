<?php

namespace Database\Seeders;

use App\Models\Projet;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjetSeeder extends Seeder
{
    public function run(): void
    {
        $dev = User::where('email', 'dev@novatech.com')->first();

        Projet::create([
            'title' => 'E-Commerce Platform',
            'title_en' => 'E-Commerce Platform',
            'description' => 'Une plateforme e-commerce complète avec gestion des stocks et paiements.',
            'description_en' => 'A complete e-commerce platform with inventory management and payments.',
            'dev_id' => $dev->id,
            'link' => 'https://github.com',
            'image' => 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
        ]);
    }
}

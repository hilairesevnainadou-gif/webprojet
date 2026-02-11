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
            'description' => 'Une plateforme e-commerce complète avec gestion des stocks et paiements.',
            'dev_id' => $dev->id,
            'link' => 'https://github.com',
            'image' => 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
        ]);

        Projet::create([
            'title' => 'CRM personnalisé',
            'description' => 'Un outil de gestion de la relation client adapté aux PME.',
            'dev_id' => $dev->id,
            'link' => 'https://github.com',
            'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
        ]);
    }
}

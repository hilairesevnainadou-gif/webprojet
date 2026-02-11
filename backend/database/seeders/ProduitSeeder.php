<?php

namespace Database\Seeders;

use App\Models\Produit;
use Illuminate\Database\Seeder;

class ProduitSeeder extends Seeder
{
    public function run(): void
    {
        Produit::create([
            'name' => 'Template SaaS React',
            'description' => 'Un template complet pour lancer votre application SaaS en quelques heures.',
            'price' => 49.99,
            'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        ]);

        Produit::create([
            'name' => 'API Gateway Microservices',
            'description' => 'Une passerelle API robuste pour gérer vos microservices.',
            'price' => 29.99,
            'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
        ]);
    }
}

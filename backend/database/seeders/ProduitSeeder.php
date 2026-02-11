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
            'name_en' => 'React SaaS Template',
            'description' => 'Un template complet pour lancer votre application SaaS en quelques heures.',
            'description_en' => 'A complete template to launch your SaaS application in a few hours.',
            'price' => 35000,
            'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            'is_validated' => true,
        ]);
    }
}

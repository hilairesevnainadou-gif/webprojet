<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Service::create([
            'name' => 'Développement Web',
            'description' => 'Création de sites web modernes et performants avec React et Laravel.',
            'price' => 1500,
            'category' => 'Développement',
        ]);
        Service::create([
            'name' => 'Design UI/UX',
            'description' => 'Conception d\'interfaces utilisateur intuitives et esthétiques.',
            'price' => 800,
            'category' => 'Design',
        ]);
        Service::create([
            'name' => 'Consulting Cloud',
            'description' => 'Accompagnement dans la migration et l\'optimisation de vos infrastructures cloud.',
            'price' => 1200,
            'category' => 'Infrastructure',
        ]);
    }
}

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
            'name_en' => 'Web Development',
            'description' => 'Création de sites web modernes et performants avec React et Laravel.',
            'description_en' => 'Creating modern and high-performance websites with React and Laravel.',
            'price' => 1500000,
            'category' => 'Développement',
        ]);
        Service::create([
            'name' => 'Design UI/UX',
            'name_en' => 'UI/UX Design',
            'description' => 'Conception d\'interfaces utilisateur intuitives et esthétiques.',
            'description_en' => 'Designing intuitive and aesthetic user interfaces.',
            'price' => 800000,
            'category' => 'Design',
        ]);
    }
}

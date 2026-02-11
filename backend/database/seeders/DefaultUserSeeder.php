<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DefaultUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('slug', 'admin')->first();
        $devRole = Role::where('slug', 'developer')->first();

        User::firstOrCreate(
            ['email' => 'admin@novatech.local'],
            ['name' => 'Nova Admin', 'password' => 'password123', 'role_id' => $adminRole?->id]
        );

        User::firstOrCreate(
            ['email' => 'dev@novatech.local'],
            ['name' => 'Nova Dev', 'password' => 'password123', 'role_id' => $devRole?->id]
        );
    }
}

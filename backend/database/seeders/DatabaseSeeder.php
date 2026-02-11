<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Roles
        $adminRole = Role::create(['name' => 'admin']);
        $devRole = Role::create(['name' => 'dev']);
        $clientRole = Role::create(['name' => 'client']);

        // Admin User
        User::create([
            'name' => 'Admin NovaTech',
            'email' => 'admin@novatech.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        // Optional: Dev user
        User::create([
            'name' => 'Developer',
            'email' => 'dev@novatech.com',
            'password' => Hash::make('password'),
            'role_id' => $devRole->id,
        ]);

        // Optional: Client user
        User::create([
            'name' => 'Client',
            'email' => 'client@novatech.com',
            'password' => Hash::make('password'),
            'role_id' => $clientRole->id,
        ]);
    }
}

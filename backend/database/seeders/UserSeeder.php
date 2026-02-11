<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $devRole = Role::where('name', 'dev')->first();
        $clientRole = Role::where('name', 'client')->first();

        // Admin User
        User::create([
            'name' => 'Admin NovaTech',
            'email' => 'admin@novatech.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        // Dev user
        User::create([
            'name' => 'Developer',
            'email' => 'dev@novatech.com',
            'password' => Hash::make('password'),
            'role_id' => $devRole->id,
        ]);

        // Client user
        User::create([
            'name' => 'Client',
            'email' => 'client@novatech.com',
            'password' => Hash::make('password'),
            'role_id' => $clientRole->id,
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $permissions = collect([
            'users.manage' => 'Gestion utilisateurs',
            'roles.manage' => 'Gestion rôles et permissions',
            'projects.manage' => 'Gestion projets et tâches',
            'quotes.manage' => 'Gestion devis',
            'profiles.view' => 'Consultation profils',
        ])->map(fn (string $label, string $name) => Permission::firstOrCreate(['name' => $name], ['label' => $label]));

        $adminRole = Role::firstOrCreate(['name' => 'admin'], ['label' => 'Administrateur']);
        $editorRole = Role::firstOrCreate(['name' => 'editor'], ['label' => 'Éditeur']);
        $clientRole = Role::firstOrCreate(['name' => 'client'], ['label' => 'Client']);

        $adminRole->permissions()->sync($permissions->pluck('id')->all());
        $editorRole->permissions()->sync($permissions->whereIn('name', ['projects.manage', 'quotes.manage', 'profiles.view'])->pluck('id')->all());
        $clientRole->permissions()->sync($permissions->whereIn('name', ['profiles.view'])->pluck('id')->all());

        $admin = User::firstOrCreate(
            ['email' => 'admin@nova.local'],
            ['name' => 'Admin Nova', 'password' => Hash::make('Password123!')],
        );

        $editor = User::firstOrCreate(
            ['email' => 'editor@nova.local'],
            ['name' => 'Editor Nova', 'password' => Hash::make('Password123!')],
        );

        $client = User::firstOrCreate(
            ['email' => 'client@nova.local'],
            ['name' => 'Client Nova', 'password' => Hash::make('Password123!')],
        );

        $admin->roles()->sync([$adminRole->id]);
        $editor->roles()->sync([$editorRole->id]);
        $client->roles()->sync([$clientRole->id]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = collect([
            ['name' => 'Manage Services', 'slug' => 'manage_services'],
            ['name' => 'Manage Quotes', 'slug' => 'manage_quotes'],
            ['name' => 'Manage Blog', 'slug' => 'manage_blog'],
            ['name' => 'Manage Marketplace', 'slug' => 'manage_marketplace'],
            ['name' => 'Manage Users', 'slug' => 'manage_users'],
        ])->mapWithKeys(fn ($permission) => [
            $permission['slug'] => Permission::firstOrCreate(['slug' => $permission['slug']], $permission),
        ]);

        $roles = [
            'admin' => ['name' => 'Admin', 'permissions' => $permissions->keys()->all()],
            'developer' => ['name' => 'Développeur', 'permissions' => ['manage_blog', 'manage_quotes']],
            'editor' => ['name' => 'Éditeur', 'permissions' => ['manage_blog']],
            'client' => ['name' => 'Client', 'permissions' => []],
        ];

        foreach ($roles as $slug => $roleData) {
            $role = Role::firstOrCreate(['slug' => $slug], ['name' => $roleData['name']]);
            $role->permissions()->sync(collect($roleData['permissions'])->map(fn ($permissionSlug) => $permissions[$permissionSlug]->id));
        }
    }
}

<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_services()
    {
        Service::create([
            'name' => 'Web Design',
            'description' => 'Create beautiful websites',
            'price' => 500,
            'category' => 'Design'
        ]);

        $response = $this->getJson('/api/services');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['name' => 'Web Design']);
    }

    public function test_admin_can_create_service()
    {
        $adminRole = Role::create(['name' => 'admin']);
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => 'password',
            'role_id' => $adminRole->id
        ]);

        $response = $this->actingAs($admin)
                         ->postJson('/api/services', [
                             'name' => 'New Service',
                             'description' => 'Description',
                             'price' => 100,
                             'category' => 'Test'
                         ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('services', ['name' => 'New Service']);
    }

    public function test_client_cannot_create_service()
    {
        $clientRole = Role::create(['name' => 'client']);
        $client = User::create([
            'name' => 'Client',
            'email' => 'client@test.com',
            'password' => 'password',
            'role_id' => $clientRole->id
        ]);

        $response = $this->actingAs($client)
                         ->postJson('/api/services', [
                             'name' => 'Unauthorized Service',
                             'description' => 'Description',
                         ]);

        $response->assertStatus(403);
    }
}

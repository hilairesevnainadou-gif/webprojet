<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::with('role.permissions')->where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Identifiants invalides'], 422);
        }

        $plainToken = Str::random(64);
        $user->update(['api_token' => hash('sha256', $plainToken)]);

        return response()->json([
            'token' => $plainToken,
            'user' => $user,
            'role' => $user->role,
            'permissions' => $user->role?->permissions ?? [],
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['nullable', 'string'],
        ]);

        $role = Role::where('slug', $data['role'] ?? 'client')->first();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role_id' => $role?->id,
        ]);

        return response()->json($user->load('role'), 201);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user()->load('role.permissions'));
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->update(['api_token' => null]);

        return response()->json(['message' => 'Déconnecté']);
    }
}

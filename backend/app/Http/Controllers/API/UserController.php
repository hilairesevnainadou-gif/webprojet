<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() { return User::with('role')->latest()->get(); }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
        ]);

        $role = Role::where('slug', $data['role'])->firstOrFail();

        return response()->json(User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role_id' => $role->id,
        ])->load('role'), 201);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'sometimes|string',
        ]);

        if (! empty($data['role'])) {
            $user->role_id = Role::where('slug', $data['role'])->firstOrFail()->id;
        }

        if (! empty($data['password'])) {
            $user->password = $data['password'];
        }

        $user->fill(collect($data)->except(['password', 'role'])->toArray())->save();

        return $user->load('role');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

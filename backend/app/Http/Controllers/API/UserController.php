<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return User::with('role')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make(\Illuminate\Support\Str::random(16)),
            'role_id' => $validated['role_id'],
            'invitation_token' => \Illuminate\Support\Str::random(40),
            'invited_at' => now(),
            'is_active' => false,
        ]);

        // In a real app, send mail here: Mail::to($user->email)->send(new UserInvitation($user));

        return $user->load('role');
    }

    public function show(User $user)
    {
        return $user->load('role');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role_id' => 'required|exists:roles,id',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        $user->update($validated);
        return $user->load('role');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }

    public function requestPasswordReset(User $user)
    {
        $user->update([
            'invitation_token' => \Illuminate\Support\Str::random(40),
            'is_active' => false, // Deactivate account until password is set?
        ]);

        // Mail::to($user->email)->send(new \App\Mail\UserInvitation($user));

        return response()->json(['message' => 'Lien de réinitialisation envoyé.']);
    }
}

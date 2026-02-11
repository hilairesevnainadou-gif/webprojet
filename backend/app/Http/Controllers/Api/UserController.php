<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PasswordResetRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => User::with('roles.permissions')->get(),
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        /** @var User $actingUser */
        $actingUser = $request->attributes->get('acting_user');
        $actingUser->load('roles.permissions');

        return response()->json(['data' => $actingUser]);
    }

    public function syncRoles(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'role_ids' => ['required', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $user->roles()->sync($validated['role_ids']);

        return response()->json([
            'message' => __('api.users.roles_updated'),
            'data' => $user->fresh('roles.permissions'),
        ]);
    }

    public function adminResetPassword(Request $request, User $user): JsonResponse
    {
        /** @var User $actingUser */
        $actingUser = $request->attributes->get('acting_user');

        if (!$actingUser->hasRole('admin')) {
            return response()->json(['message' => __('api.errors.admin_only')], 403);
        }

        PasswordResetRequest::create([
            'admin_id' => $actingUser->id,
            'target_user_id' => $user->id,
            'email' => $user->email,
            'sent_at' => now(),
        ]);

        return response()->json([
            'message' => __('api.users.reset_mail_sent', ['email' => $user->email]),
        ]);
    }

    public function changeOwnPassword(Request $request, User $user): JsonResponse
    {
        /** @var User $actingUser */
        $actingUser = $request->attributes->get('acting_user');

        if ($actingUser->id !== $user->id) {
            return response()->json(['message' => __('api.users.only_owner_password')], 403);
        }

        $validated = $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => __('api.users.password_changed')]);
    }

    public function rolesAndPermissions(): JsonResponse
    {
        return response()->json([
            'roles' => Role::with('permissions')->get(),
        ]);
    }
}

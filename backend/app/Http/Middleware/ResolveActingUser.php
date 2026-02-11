<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveActingUser
{
    public function handle(Request $request, Closure $next): Response
    {
        $userId = $request->header('X-User-Id');

        if (!$userId) {
            return response()->json(['message' => __('api.errors.acting_user_required')], 401);
        }

        $user = User::with('roles.permissions')->find($userId);

        if (!$user) {
            return response()->json(['message' => __('api.errors.acting_user_not_found')], 401);
        }

        $request->attributes->set('acting_user', $user);

        return $next($request);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::with(['owner:id,name,email', 'tasks:id,project_id,title,status'])->get();

        return response()->json(['data' => $projects]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in(['development', 'in_progress', 'production'])],
            'nature' => ['required', Rule::in(['private', 'public'])],
            'owner_id' => ['required', 'exists:users,id'],
        ]);

        $project = Project::create($validated);

        return response()->json([
            'message' => __('api.projects.created'),
            'data' => $project,
        ], 201);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'status' => ['sometimes', Rule::in(['development', 'in_progress', 'production'])],
            'nature' => ['sometimes', Rule::in(['private', 'public'])],
            'owner_id' => ['sometimes', 'exists:users,id'],
        ]);

        if (($validated['nature'] ?? null) === 'public' && $project->nature === 'private') {
            return response()->json([
                'message' => __('api.projects.private_cannot_be_public'),
            ], 422);
        }

        $project->update($validated);

        return response()->json([
            'message' => __('api.projects.updated'),
            'data' => $project->fresh(['owner:id,name,email', 'tasks:id,project_id,title,status']),
        ]);
    }
}

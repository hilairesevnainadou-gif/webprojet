<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    public function index()
    {
        $query = Projet::with(['developer', 'chefProjet']);

        // Non-auth users or non-staff only see validated AND public projects
        if (!auth('sanctum')->check() || (!auth('sanctum')->user()->hasRole('admin') && !auth('sanctum')->user()->hasRole('dev'))) {
            $query->where('is_validated', true)->where('is_public', true);
        }

        return $query->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_en' => 'nullable|string',
            'link' => 'nullable|url',
            'image' => 'nullable|string',
            'chef_projet_id' => 'required|exists:users,id',
            'is_public' => 'boolean',
        ]);

        $validated['dev_id'] = auth()->id();

        return Projet::create($validated);
    }

    public function show(Projet $projet)
    {
        return $projet->load('developer');
    }

    public function update(Request $request, Projet $projet)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'required|string',
            'description_en' => 'nullable|string',
            'link' => 'nullable|url',
            'image' => 'nullable|string',
            'chef_projet_id' => 'sometimes|exists:users,id',
            'is_public' => 'boolean',
        ]);

        $projet->update($validated);
        return $projet;
    }

    public function destroy(Projet $projet)
    {
        $projet->delete();
        return response()->noContent();
    }

    public function validateContent(Projet $projet)
    {
        $projet->update(['is_validated' => true]);
        return $projet;
    }
}

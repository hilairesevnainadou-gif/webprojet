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

        // Public site only shows validated AND explicitly public projects
        if (!auth('sanctum')->check() || (!auth('sanctum')->user()->hasRole('admin') && !auth('sanctum')->user()->hasRole('dev'))) {
            $query->where('is_validated', true)->where('is_visible_publicly', true);
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
            'status' => 'required|in:ongoing,development,production',
            'nature' => 'required|in:private,public',
            'is_visible_publicly' => 'boolean',
        ]);

        // Constraint: Private nature projects cannot be visible publicly
        if ($validated['nature'] === 'private') {
            $validated['is_visible_publicly'] = false;
        }

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
            'title' => 'sometimes|required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'sometimes|required|string',
            'description_en' => 'nullable|string',
            'link' => 'nullable|url',
            'image' => 'nullable|string',
            'chef_projet_id' => 'sometimes|exists:users,id',
            'status' => 'sometimes|in:ongoing,development,production',
            'nature' => 'sometimes|in:private,public',
            'is_visible_publicly' => 'boolean',
        ]);

        if (isset($validated['nature']) && $validated['nature'] === 'private') {
            $validated['is_visible_publicly'] = false;
        } elseif ($projet->nature === 'private' && isset($validated['is_visible_publicly'])) {
             $validated['is_visible_publicly'] = false;
        }

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

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Illuminate\Http\Request;

class ProjetController extends Controller
{
    public function index()
    {
        return Projet::with('developer')->latest()->get();
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
        ]);

        $projet->update($validated);
        return $projet;
    }

    public function destroy(Projet $projet)
    {
        $projet->delete();
        return response()->noContent();
    }
}

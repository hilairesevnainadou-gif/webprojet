<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    public function index()
    {
        return Produit::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
        ]);

        return Produit::create($validated);
    }

    public function show(Produit $marketplace)
    {
        return $marketplace;
    }

    public function update(Request $request, Produit $marketplace)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
        ]);

        $marketplace->update($validated);
        return $marketplace;
    }

    public function destroy(Produit $marketplace)
    {
        $marketplace->delete();
        return response()->noContent();
    }
}

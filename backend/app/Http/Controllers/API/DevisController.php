<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Devis;
use Illuminate\Http\Request;

class DevisController extends Controller
{
    public function index()
    {
        return Devis::with(['user', 'service'])->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'service_id' => 'nullable|exists:services,id',
            'message' => 'required|string',
        ]);

        if (auth()->check()) {
            $validated['user_id'] = auth()->id();
        }

        return Devis::create($validated);
    }

    public function show(Devis $devi)
    {
        return $devi->load(['user', 'service']);
    }

    public function update(Request $request, Devis $devi)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,processed,rejected',
        ]);

        $devi->update($validated);
        return $devi;
    }

    public function destroy(Devis $devi)
    {
        $devi->delete();
        return response()->noContent();
    }
}

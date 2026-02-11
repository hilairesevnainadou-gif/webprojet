<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class QuoteController extends Controller
{
    public function index(): JsonResponse
    {
        $quotes = Quote::with(['user:id,name,email', 'project:id,name,status,nature'])->get();

        return response()->json(['data' => $quotes]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reference' => ['required', 'string', 'max:50', 'unique:quotes,reference'],
            'user_id' => ['required', 'exists:users,id'],
            'project_id' => ['required', 'exists:projects,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'status' => ['required', Rule::in(['submitted', 'reviewed', 'approved', 'rejected'])],
        ]);

        $quote = Quote::create($validated);

        return response()->json([
            'message' => __('api.quotes.created'),
            'data' => $quote,
        ], 201);
    }

    public function update(Request $request, Quote $quote): JsonResponse
    {
        $validated = $request->validate([
            'amount' => ['sometimes', 'numeric', 'min:0'],
            'status' => ['sometimes', Rule::in(['submitted', 'reviewed', 'approved', 'rejected'])],
        ]);

        $quote->update($validated);

        return response()->json([
            'message' => __('api.quotes.updated'),
            'data' => $quote->fresh(['user:id,name,email', 'project:id,name,status,nature']),
        ]);
    }
}

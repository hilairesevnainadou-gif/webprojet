<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    public function index() { return Quote::latest()->get(); }
    public function store(Request $request) {
        $data = $request->validate(['name'=>'required|string|max:255','email'=>'required|email','company'=>'nullable|string|max:255','message'=>'required|string']);
        $data['user_id'] = $request->user()?->id;
        return response()->json(Quote::create($data), 201);
    }
    public function show(Quote $quote) { return $quote; }
    public function update(Request $request, Quote $quote) {
        $data = $request->validate(['status'=>'sometimes|string|max:50','response'=>'nullable|string','name'=>'sometimes|string|max:255','email'=>'sometimes|email','company'=>'nullable|string|max:255','message'=>'sometimes|string']);
        $quote->update($data); return $quote;
    }
    public function destroy(Quote $quote) { $quote->delete(); return response()->json(['message'=>'Deleted']); }
}

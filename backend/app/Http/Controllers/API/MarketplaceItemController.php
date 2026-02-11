<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceItem;
use Illuminate\Http\Request;

class MarketplaceItemController extends Controller
{
    public function index() { return MarketplaceItem::latest()->get(); }
    public function store(Request $request) {
        $data = $request->validate(['name'=>'required|string|max:255','description'=>'required|string','price'=>'required|numeric','stock'=>'nullable|integer|min:0','is_active'=>'boolean']);
        return response()->json(MarketplaceItem::create($data), 201);
    }
    public function show(MarketplaceItem $marketplace) { return $marketplace; }
    public function update(Request $request, MarketplaceItem $marketplace) {
        $data = $request->validate(['name'=>'sometimes|string|max:255','description'=>'sometimes|string','price'=>'sometimes|numeric','stock'=>'sometimes|integer|min:0','is_active'=>'sometimes|boolean']);
        $marketplace->update($data); return $marketplace;
    }
    public function destroy(MarketplaceItem $marketplace) { $marketplace->delete(); return response()->json(['message'=>'Deleted']); }
}

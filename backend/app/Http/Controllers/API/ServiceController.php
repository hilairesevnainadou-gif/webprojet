<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index() { return Service::latest()->get(); }
    public function store(Request $request) {
        $data = $request->validate(['name'=>'required|string|max:255','description'=>'required|string','price'=>'required|numeric','is_active'=>'boolean']);
        return response()->json(Service::create($data), 201);
    }
    public function show(Service $service) { return $service; }
    public function update(Request $request, Service $service) {
        $data = $request->validate(['name'=>'sometimes|string|max:255','description'=>'sometimes|string','price'=>'sometimes|numeric','is_active'=>'sometimes|boolean']);
        $service->update($data); return $service;
    }
    public function destroy(Service $service) { $service->delete(); return response()->json(['message'=>'Deleted']); }
}

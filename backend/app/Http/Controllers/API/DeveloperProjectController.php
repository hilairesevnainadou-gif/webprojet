<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\DeveloperProject;
use Illuminate\Http\Request;

class DeveloperProjectController extends Controller
{
    public function index() { return DeveloperProject::with('author:id,name')->latest()->get(); }
    public function store(Request $request) {
        $data = $request->validate(['title'=>'required|string|max:255','summary'=>'required|string','url'=>'nullable|url','status'=>'nullable|string|max:50']);
        $data['user_id'] = $request->user()?->id;
        return response()->json(DeveloperProject::create($data), 201);
    }
    public function show(DeveloperProject $project) { return $project->load('author:id,name'); }
    public function update(Request $request, DeveloperProject $project) {
        $data = $request->validate(['title'=>'sometimes|string|max:255','summary'=>'sometimes|string','url'=>'nullable|url','status'=>'sometimes|string|max:50']);
        $project->update($data); return $project;
    }
    public function destroy(DeveloperProject $project) { $project->delete(); return response()->json(['message'=>'Deleted']); }
}

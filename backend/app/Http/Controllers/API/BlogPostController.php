<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function index() { return BlogPost::with('author:id,name')->latest()->get(); }
    public function store(Request $request) {
        $data = $request->validate(['title'=>'required|string|max:255','content'=>'required|string','status'=>'nullable|string|max:50']);
        $data['user_id'] = $request->user()?->id;
        return response()->json(BlogPost::create($data), 201);
    }
    public function show(BlogPost $blog) { return $blog->load('author:id,name'); }
    public function update(Request $request, BlogPost $blog) {
        $data = $request->validate(['title'=>'sometimes|string|max:255','content'=>'sometimes|string','status'=>'sometimes|string|max:50']);
        $blog->update($data); return $blog;
    }
    public function destroy(BlogPost $blog) { $blog->delete(); return response()->json(['message'=>'Deleted']); }
}

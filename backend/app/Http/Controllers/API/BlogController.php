<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        return Blog::with('author')->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content' => 'required|string',
            'content_en' => 'nullable|string',
            'status' => 'required|string|in:draft,published',
            'image' => 'nullable|string',
        ]);

        $validated['author_id'] = auth()->id();

        return Blog::create($validated);
    }

    public function show(Blog $blog)
    {
        return $blog->load('author');
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content' => 'required|string',
            'content_en' => 'nullable|string',
            'status' => 'required|string|in:draft,published',
            'image' => 'nullable|string',
        ]);

        $blog->update($validated);
        return $blog;
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return response()->noContent();
    }
}

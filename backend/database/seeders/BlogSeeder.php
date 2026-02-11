<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@novatech.com')->first();
        $dev = User::where('email', 'dev@novatech.com')->first();

        Blog::create([
            'title' => 'L\'avenir de l\'IA dans le développement web',
            'content' => 'L\'intelligence artificielle transforme radicalement la manière dont nous concevons les applications...',
            'author_id' => $admin->id,
            'status' => 'published',
            'image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        ]);

        Blog::create([
            'title' => 'Pourquoi choisir Laravel en 2026 ?',
            'content' => 'Laravel reste le framework PHP de référence grâce à sa simplicité et sa robustesse...',
            'author_id' => $dev->id,
            'status' => 'published',
            'image' => 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?auto=format&fit=crop&q=80&w=800',
        ]);
    }
}

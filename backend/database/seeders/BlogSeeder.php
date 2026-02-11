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
            'title_en' => 'The Future of AI in Web Development',
            'content' => 'L\'intelligence artificielle transforme radicalement la manière dont nous concevons les applications...',
            'content_en' => 'Artificial intelligence is radically transforming the way we design applications...',
            'author_id' => $admin->id,
            'status' => 'published',
            'image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
            'is_validated' => true,
        ]);
    }
}

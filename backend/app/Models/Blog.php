<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['title', 'title_en', 'content', 'content_en', 'author_id', 'status', 'image', 'is_validated'];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}

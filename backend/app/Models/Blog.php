<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['title', 'content', 'author_id', 'status', 'image'];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}

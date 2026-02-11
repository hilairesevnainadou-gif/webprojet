<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $fillable = ['title', 'description', 'dev_id', 'link', 'image'];

    public function developer()
    {
        return $this->belongsTo(User::class, 'dev_id');
    }
}

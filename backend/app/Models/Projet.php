<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $fillable = [
        'title', 'title_en', 'description', 'description_en',
        'dev_id', 'chef_projet_id', 'link', 'image',
        'is_validated', 'status', 'nature', 'is_visible_publicly'
    ];

    public function developer()
    {
        return $this->belongsTo(User::class, 'dev_id');
    }

    public function chefProjet()
    {
        return $this->belongsTo(User::class, 'chef_projet_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}

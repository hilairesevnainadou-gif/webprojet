<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'description', 'projet_id', 'assigned_to', 'status', 'priority', 'due_date'];

    public function project()
    {
        return $this->belongsTo(Projet::class, 'projet_id');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}

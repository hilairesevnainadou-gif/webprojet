<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $fillable = ['name', 'name_en', 'description', 'description_en', 'price', 'image', 'is_validated'];
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\DeveloperProject;
use App\Models\MarketplaceItem;
use App\Models\Quote;
use App\Models\Service;
use App\Models\User;

class StatsController extends Controller
{
    public function index()
    {
        return [
            'services' => Service::count(),
            'quotes' => Quote::count(),
            'blogPosts' => BlogPost::count(),
            'projects' => DeveloperProject::count(),
            'marketplaceItems' => MarketplaceItem::count(),
            'users' => User::count(),
        ];
    }
}

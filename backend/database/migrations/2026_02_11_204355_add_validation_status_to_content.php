<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $tables = ['services', 'blogs', 'projets', 'produits'];
        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->boolean('is_validated')->default(false);
            });
        }
    }

    public function down(): void
    {
        $tables = ['services', 'blogs', 'projets', 'produits'];
        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn('is_validated');
            });
        }
    }
};

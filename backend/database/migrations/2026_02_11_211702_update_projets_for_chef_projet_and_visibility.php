<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projets', function (Blueprint $table) {
            $table->foreignId('chef_projet_id')->nullable()->constrained('users')->onDelete('set null');
            $table->boolean('is_public')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('projets', function (Blueprint $table) {
            $table->dropForeign(['chef_projet_id']);
            $table->dropColumn(['chef_projet_id', 'is_public']);
        });
    }
};

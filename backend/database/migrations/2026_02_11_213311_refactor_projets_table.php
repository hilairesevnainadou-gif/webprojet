<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projets', function (Blueprint $table) {
            // Drop old columns if they exist (clean slate for this refactor)
            if (Schema::hasColumn('projets', 'is_public')) {
                $table->dropColumn('is_public');
            }

            $table->string('status')->default('ongoing'); // ongoing, development, production
            $table->string('nature')->default('private'); // private, public
            $table->boolean('is_visible_publicly')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('projets', function (Blueprint $table) {
            $table->dropColumn(['status', 'nature', 'is_visible_publicly']);
        });
    }
};

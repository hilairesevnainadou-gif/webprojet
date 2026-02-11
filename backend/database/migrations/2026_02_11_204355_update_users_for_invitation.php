<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('invitation_token')->nullable()->unique();
            $table->timestamp('invited_at')->nullable();
            $table->boolean('is_active')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['invitation_token', 'invited_at', 'is_active']);
        });
    }
};

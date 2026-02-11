<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('name_en')->nullable();
            $table->text('description_en')->nullable();
        });
        Schema::table('blogs', function (Blueprint $table) {
            $table->string('title_en')->nullable();
            $table->text('content_en')->nullable();
        });
        Schema::table('projets', function (Blueprint $table) {
            $table->string('title_en')->nullable();
            $table->text('description_en')->nullable();
        });
        Schema::table('produits', function (Blueprint $table) {
            $table->string('name_en')->nullable();
            $table->text('description_en')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en']);
        });
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'content_en']);
        });
        Schema::table('projets', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'description_en']);
        });
        Schema::table('produits', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en']);
        });
    }
};

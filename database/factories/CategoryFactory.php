<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            'id' => Str::uuid(), 
            'name' => $this->faker->unique()->words(5, true),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

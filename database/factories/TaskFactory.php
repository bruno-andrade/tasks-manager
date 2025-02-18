<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'id' => Str::uuid(), 
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->optional()->paragraph(),
            'status' => $this->faker->randomElement(['pendente', 'em_andamento', 'concluido']),
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

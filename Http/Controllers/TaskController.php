<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        $query = Task::with('category');

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $tasks = $query->paginate(25);

        return $this->success([
            'tasks' => TaskResource::collection($tasks),
            'pagination' => [
                'current_page' => $tasks->currentPage(),
                'total_pages' => $tasks->lastPage(),
                'per_page' => $tasks->perPage(),
                'total' => $tasks->total(),
                'next_page_url' => $tasks->nextPageUrl(),
                'prev_page_url' => $tasks->previousPageUrl(),
            ]
        ], "Tarefas listadas com sucesso");
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        return $this->success(new TaskResource($task), "Tarefa criada com sucesso", JsonResponse::HTTP_CREATED);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return $this->success(new TaskResource($task), "Tarefa atualizada com sucesso");
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return $this->success(null, "Tarefa deletada com sucesso", JsonResponse::HTTP_NO_CONTENT);
    }

    public function show(string $id)
    {
        $task = Task::findOrFail($id);

        return $this->success(new TaskResource($task), "Tarefa encontrada", JsonResponse::HTTP_OK);
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::with(['project', 'assignee']);

        if ($request->has('projet_id')) {
            $query->where('projet_id', $request->projet_id);
        }

        if ($request->has('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'projet_id' => 'required|exists:projets,id',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'required|in:todo,in_progress,done',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        return Task::create($validated)->load(['project', 'assignee']);
    }

    public function show(Task $task)
    {
        return $task->load(['project', 'assignee']);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'projet_id' => 'sometimes|exists:projets,id',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'sometimes|in:todo,in_progress,done',
            'priority' => 'sometimes|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);
        return $task->load(['project', 'assignee']);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->noContent();
    }
}

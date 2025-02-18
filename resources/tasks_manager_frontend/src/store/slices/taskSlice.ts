import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, createTask, updateTaskStatus, deleteTask, Task, getTaskById } from "@/services/taskService";

interface TaskState {
  tasks: {data: {
    tasks: Task[],
    pagination: {
      current_page: number,
      per_page: number,
      total: number,
      total_pages: number
    }
  }};
  task: Task | null;  // Add a `task` property to store the task by ID
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: { data: { tasks: [], pagination: { current_page: 1, per_page: 10, total: 0, total_pages: 1 } } },
  task: null,  // Initialize as null, to store the task fetched by ID
  loading: false,
  error: null,
};

// Thunks para buscar, criar, atualizar e deletar tarefas
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (categoryId?: string) => {
  return await getTasks(categoryId);
});

export const addTask = createAsyncThunk("tasks/addTask", async (task: Omit<Task, "id">) => {
  return await createTask(task);
});

export const fetchTask = createAsyncThunk("tasks/fetchTask", async (taskId: string) => {
  return await getTaskById(taskId);
});

export const changeTaskStatus = createAsyncThunk("tasks/changeTaskStatus", async ({ id, status }: { id: string; status: string }) => {
  return await updateTaskStatus(id, status);
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (id: string) => {
  await deleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        // state.tasks.data = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao buscar tarefas";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.data.tasks.push(action.payload);  // Adding new task to the tasks list
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.data.tasks.findIndex((task: { id: string; }) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks.data.tasks[index].status = action.payload.status;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks.data.tasks = state.tasks.data.tasks.filter((task: { id: string; }) => task.id !== action.payload);
      })
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;  // Update state with the fetched task
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao buscar a tarefa";
      });
  },
});

export default taskSlice.reducer;
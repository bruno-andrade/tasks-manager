'use client'
import { useEffect } from "react";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { fetchTasks, changeTaskStatus, removeTask } from "@/store/slices/taskSlice";

export default function TaskList({ categoryId }: { categoryId?: string }) {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks(categoryId));
  }, [dispatch, categoryId]);

  if (loading) return <p>Carregando...</p>;

  console.log(tasks)

  return (
    <div>
      {tasks.data.tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.data.tasks.map((task) => (
            <li key={task.id} className="border p-3 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-sm">Status: {task.status}</p>
              <button onClick={() => dispatch(changeTaskStatus({ id: task.id, status: "concluido" }))}>
                Marcar como Concluído
              </button>
              <button onClick={() => dispatch(removeTask(task.id))} className="text-red-500">Excluir</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
}
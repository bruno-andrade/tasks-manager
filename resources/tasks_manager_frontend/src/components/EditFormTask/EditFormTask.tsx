"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/store/slices/categorySlice';
import { RootState } from '@/store/store';
import { fetchTask } from '@/store/slices/taskSlice';

interface EditTaskProps {
  taskId: string;
}

export default function EditTaskForm({taskId}: EditTaskProps) {
  const dispatch = useDispatch();
  const { categories, loading: loadingCategories, error: categoryError } = useSelector((state: RootState) => state.categories);
  const { task, loading: loadingTasks, error: taskError } = useSelector((state: RootState) => state.tasks);
  
  const taskToEdit = taskId;


  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories() as any);
    dispatch(fetchTask(taskId as unknown as string) as any);
    

    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategoryId(task.category_id);
    }
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !categoryId) {
      setError('Title and category are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Dispatch the action to update the task
      // await dispatch(updateTask({ id: taskId, title, description, categoryId })).unwrap();
      // router.push('/tasks'); // Redirect to tasks list or any other page
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  if (loadingCategories || loadingTasks) return <div>Loading...</div>;
  if (categoryError || taskError) return <div>{categoryError || taskError}</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Task</h2>
      
      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Task Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Select Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  );
}
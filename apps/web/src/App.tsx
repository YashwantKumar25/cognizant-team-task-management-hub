
import React from 'react';
import TaskList from './features/tasks/TaskList';
import TaskForm from './features/tasks/TaskForm';

export default function App() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cognizant Team Task Management Hub</h1>
        <button
          className="btn-outline"
          onClick={() => document.documentElement.classList.toggle('dark')}
          title="Toggle dark mode"
        >
          Toggle Theme
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

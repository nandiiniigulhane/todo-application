import React, { useEffect, useState } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "http://localhost:8080/tasks";

  const fetchTasks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
      }),
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = async (task: Task) => {
    await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task,
        completed: !task.completed,
      }),
    });

    fetchTasks();
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="title">Task Manager</h1>
        <p className="subtitle">
          Stay organized, focused, and get things done.
        </p>
      </header>

      <form onSubmit={addTask} className="create-card">
        <div className="create-header">
          <div className="icon-wrapper">✨</div>
          <h2>Create a Task</h2>
        </div>

        <div className="input-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="task-desc">Description</label>
          <input
            id="task-desc"
            placeholder="Add some details... (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="create-footer">
          <button type="submit" className="add-btn">
            Add Task
          </button>
        </div>
      </form>

      <div className="task-list-container">
        {tasks.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📂</span>
            <p>No tasks yet. Create one above to get started!</p>
          </div>
        )}

        {tasks.map((task) => (
          <div
            className={`task-card ${task.completed ? "task-completed" : ""}`}
            key={task.id}
          >
            <div className="task-content">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  className="custom-checkbox"
                />
              </div>

              <div className="task-details">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                  <p className="task-desc">{task.description}</p>
                )}
              </div>
            </div>

            <div className="task-meta">
              <span className="task-date">
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : "Just now"}
              </span>
              <div className="task-actions">
                <button
                  type="button"
                  className="action-btn edit-btn"
                  title="Edit task"
                >
                  ✏️
                </button>
                <button
                  type="button"
                  className="action-btn delete-btn"
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

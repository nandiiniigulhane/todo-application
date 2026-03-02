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

  // New state to track which task is currently being edited
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

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

  // Unified function to handle both adding and updating
  const saveTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTaskId) {
      // Find the existing task to preserve its 'completed' status
      const existingTask = tasks.find((t) => t.id === editingTaskId);

      await fetch(`${API_URL}/${editingTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          completed: existingTask ? existingTask.completed : false,
        }),
      });

      // Clear edit state after saving
      setEditingTaskId(null);
    } else {
      // Standard create logic
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          completed: false,
          createdAt: new Date().toISOString(),
        }),
      });
    }

    // Reset inputs and refresh list
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // Triggered when the Edit button on a task card is clicked
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the form
  };

  // Allows the user to back out of editing mode
  const cancelEditing = () => {
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
  };

  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Your toggleComplete already uses PUT perfectly alongside your backend
  const toggleComplete = async (task: Task) => {
    await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

      {/* Dynamic Form (Handles both Create and Update) */}
      <form onSubmit={saveTask} className="create-card">
        <div className="create-header">
          <div className="icon-wrapper">{editingTaskId ? "✏️" : "✨"}</div>
          <h2>{editingTaskId ? "Edit Task" : "Create a Task"}</h2>
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
          {editingTaskId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="add-btn">
            {editingTaskId ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>

      {/* Task List Section */}
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
                  onClick={() => startEditing(task)}
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

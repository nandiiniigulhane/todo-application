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
      <h1 className="title">Task Manager</h1>

      {/* Add Task Card */}
      <form onSubmit={addTask} className="create-card">
        <div className="create-header">
          <span className="create-icon">📝</span>
          <h2>Create a Task</h2>
        </div>

        <div className="input-group">
          <label>Task Title</label>
          <input
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <input
            placeholder="Optional description..."
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

      {/* Empty State */}
      {tasks.length === 0 && <div className="empty-state">No tasks yet</div>}

      {/* Task List */}
      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div className="task-top">
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
                className="checkbox"
              />

              <div>
                <h3
                  className={`task-title ${
                    task.completed ? "completed-text" : ""
                  }`}
                >
                  {task.title}
                </h3>

                <p className="task-desc">{task.description}</p>
              </div>
            </div>

            <div className="task-actions">
              <button className="edit-btn">✏️</button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                🗑️
              </button>
            </div>
          </div>

          <div className="task-footer">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

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

  // POST
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

  // DELETE
  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  // PUT (toggle complete)
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

      {/* Create Task */}
      <form onSubmit={addTask} className="task-card">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <h3 className="task-title">{task.title}</h3>
          <p className="task-desc">{task.description}</p>

          <p className="task-meta">
            Status:
            <span className={task.completed ? "completed" : "not-completed"}>
              {task.completed ? " Completed" : " Not Completed"}
            </span>
          </p>

          <p className="task-meta">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>

          <button onClick={() => toggleComplete(task)}>Toggle Complete</button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

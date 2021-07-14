import "./App.css";
import { useState } from "react";
import TodoListItem from "./components/TodoListItem.js";
import { v4 as uuidv4 } from "uuid"; // gives us uniq ids for our tasks

function App() {
  const TASK_STATUS_PENDING = "PENDING";
  const TASK_STATUS_DONE = "DONE";
  const seedTasks = [
    {
      id: uuidv4(),
      task: "Do This!",
      status: TASK_STATUS_PENDING,
      priority: 2,
      completedAt: null,
    },
    {
      id: uuidv4(),
      task: "Do That!",
      status: TASK_STATUS_PENDING,
      priority: 3,
      completedAt: null,
    },
    {
      id: uuidv4(),
      task: "Listen to Yoda!",
      status: TASK_STATUS_PENDING,
      priority: 1,
      completedAt: null,
    },
    {
      id: uuidv4(),
      task: "Don't walk the dark path!",
      status: TASK_STATUS_PENDING,
      priority: 1,
      completedAt: null,
      createdAt: +new Date(),
    },
    {
      id: uuidv4(),
      task: "Get some sleep!",
      status: TASK_STATUS_PENDING,
      priority: 4,
      completedAt: null,
      createdAt: +new Date(),
    },
  ];
  const [tasks, setTasks] = useState(seedTasks);
  // Rende rour pending and done tasks lists
  const todoListItemsPending = tasks
    .filter((task) => {
      return task.status !== TASK_STATUS_DONE;
    })
    // TODO: Ask Namir: Wtf?! ;-)
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .reverse()
    .sort((a, b) => {
      return a.priority - b.priority;
    })
    .map((e, i) => {
      return (
        <TodoListItem
          task={e}
          key={i}
          onCrossClick={handleTaskCrossClick}
          onBtnClick={handleTaskBtnClick}
        />
      );
    });
  const todoListItemsDone = tasks
    .filter((task) => {
      return task.status !== TASK_STATUS_PENDING;
    })
    // TODO: Ask Namir: Wtf?! ;-)
    .sort((a, b) => {
      return new Date(b.completedAt) - new Date(a.completedAt);
    })
    .reverse()
    .sort((a, b) => {
      return a.priority - b.priority;
    })
    .map((e, i) => {
      return (
        <TodoListItem
          task={e}
          key={i}
          onCrossClick={handleTaskCrossClick}
          onBtnClick={handleTaskBtnClick}
        />
      );
    });

  // remove the current task
  function handleTaskCrossClick(currentTask) {
    setTasks(
      tasks.filter((task) => {
        return task.id !== currentTask.id;
      })
    );
  }

  // toggle the current tasks's status
  function handleTaskBtnClick(currentTask) {
    setTasks(
      tasks.map((task) => {
        if (task.id === currentTask.id) {
          task.status =
            task.status === TASK_STATUS_PENDING
              ? TASK_STATUS_DONE
              : TASK_STATUS_PENDING;
          task.completedAt =
            task.status === TASK_STATUS_DONE ? +new Date() : null;
        }

        return task;
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        task: form.taskInput.value,
        priority: form.taskPriority.value,
        status: TASK_STATUS_PENDING,
        completedAt: null,
        createdAt: +new Date(),
      },
    ]);
  }

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="taskInput"
            type="text"
            placeholder="What needs to get done?!"
          />

          <select name="taskPriority" id="taskPriority">
            <option value="1">High Priority</option>
            <option selected value="2">
              Medium Priority
            </option>
            <option select value="3">
              Low Priority
            </option>
            <option select value="4">
              Priority?
            </option>
          </select>

          <button type="submit">Add</button>
        </form>
      </header>
      <main>
        <div class="TasksTile TasksTile--pending">
          <ul>{todoListItemsPending}</ul>
        </div>
        <div class="TasksTile TasksTile--done">
          <ul>{todoListItemsDone}</ul>
        </div>
      </main>
    </div>
  );
}

export default App;

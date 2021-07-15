import "./App.css";
import { useState } from "react";
import TodoListItem from "./components/TodoListItem.js";
import { v4 as uuidv4 } from "uuid"; // gives us uniq ids for our tasks

function App() {
  const TASK_STATUS_PENDING = "PENDING"; // == BACKLOG
  const TASK_STATUS_ACTIVE = "ACTIVE";
  const TASK_STATUS_DONE = "DONE";
  const TASK_STATUS_TRASHED = "TRASHED";
  const TASK_STATUSES = [
    TASK_STATUS_PENDING,
    TASK_STATUS_ACTIVE,
    TASK_STATUS_DONE,
    TASK_STATUS_TRASHED,
  ];

  const seedTasks = [
    {
      id: uuidv4(),
      task: "Do This!",
      status: TASK_STATUS_PENDING,
      priority: 2,
      completedAt: null,
      trashedAt: null,
      activatedAt: null,
    },
    {
      id: uuidv4(),
      task: "Do That!",
      status: TASK_STATUS_PENDING,
      priority: 3,
      completedAt: null,
      trashedAt: null,
      activatedAt: null,
    },
    {
      id: uuidv4(),
      task: "Listen to Yoda!",
      status: TASK_STATUS_PENDING,
      priority: 1,
      completedAt: null,
      trashedAt: null,
      activatedAt: null,
    },
    {
      id: uuidv4(),
      task: "Don't walk the dark path!",
      status: TASK_STATUS_PENDING,
      priority: 1,
      completedAt: null,
      trashedAt: null,
      activatedAt: null,
      createdAt: +new Date(),
    },
    {
      id: uuidv4(),
      task: "Get some sleep!",
      status: TASK_STATUS_PENDING,
      priority: 4,
      completedAt: null,
      trashedAt: null,
      createdAt: +new Date(),
    },
  ];
  const [tasks, setTasks] = useState(seedTasks);
  // Render our pending, done and soft deleted tasks lists
  const todoListItemsPending = renderTaskItems(TASK_STATUS_PENDING);
  const todoListItemsActive = renderTaskItems(TASK_STATUS_ACTIVE);
  const todoListItemsDone = renderTaskItems(TASK_STATUS_DONE);
  const todoListItemsTrashed = renderTaskItems(TASK_STATUS_TRASHED);

  function renderTaskItems(status) {
    return (
      tasks
        .filter((task) => {
          return task.status === status;
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
              onCrossClick={handleTaskTrashClick}
              onBtnClick={handleTaskStatusToggleClick}
            />
          );
        })
    );
  }

  // Just soft delete the current task
  function handleTaskTrashClick(currentTask) {
    console.log("handleTaskTrashClick");
    setTasks(
      tasks.map((task) => {
        if (task.id === currentTask.id) {
          task.status = TASK_STATUS_TRASHED;
          task.trashedAt = +new Date();
        }

        return task;
      })
    );
  }

  // TODO:
  // Remove the current task for good
  // function handleTaskDeleteClick(currentTask) {
  //      setTasks(
  //     tasks.filter((task) => {
  //       return task.id !== currentTask.id;
  //     })
  //   );
  // }

  // toggle the current tasks's status
  function handleTaskStatusToggleClick(currentTask) {
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
        <div className="TasksTile TasksTile--pending">
          <ul>
            <li className="listHeader">Pending Tasks</li>
            {todoListItemsPending}
          </ul>
        </div>
        <div className="TasksTile TasksTile--done">
          <ul>
            <li className="listHeader">Completed Tasks</li>
            {todoListItemsDone}
          </ul>
        </div>
        <div className="TasksTile TasksTile--trashed">
          <ul>
            <li className="listHeader">Trashed Tasks</li>
            {todoListItemsTrashed}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;

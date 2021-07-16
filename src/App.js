import "./App.css";
import { useState } from "react";
import TodoListItem from "./components/TodoListItem.js";
import { v4 as uuidv4 } from "uuid"; // gives us uniq ids for our tasks

// importing images
// import logo from "./assets/logo512.png"

function App() {
  const TASK_STATUS_PENDING = "PENDING"; // == TASKS BACKLOG
  const TASK_STATUS_ACTIVE = "ACTIVE"; // == TASKS IN PROGRESS
  const TASK_STATUS_DONE = "DONE";
  const TASK_STATUS_TRASHED = "TRASHED";
  // const TASK_STATUSES = [
  //   TASK_STATUS_PENDING,
  //   TASK_STATUS_ACTIVE,
  //   TASK_STATUS_DONE,
  //   TASK_STATUS_TRASHED,
  // ];

  const seedTasks = [
    {
      id: uuidv4(),
      task: "Do This!",
      status: TASK_STATUS_PENDING,
      priority: 2,
      completedAt: null,
      trashedAt: null,
      activatedAt: null,
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Do That!",
      status: TASK_STATUS_PENDING,
      priority: 3,
      completedAt: null,
      trashedAt: null,
      activatedAt: null,
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Listen to Yoda!",
      status: TASK_STATUS_PENDING,
      priority: 1,
      completedAt: null,
      trashedAt: null,
      activatedAt: null,
      inPlaceEditMode: false,
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
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Get some sleep!",
      status: TASK_STATUS_PENDING,
      priority: 4,
      completedAt: null,
      trashedAt: null,
      createdAt: +new Date(),
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "I'm on it!",
      status: TASK_STATUS_ACTIVE,
      priority: 1,
      completedAt: null,
      trashedAt: null,
      createdAt: +new Date(),
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Nearly there!!",
      status: TASK_STATUS_ACTIVE,
      priority: 2,
      completedAt: null,
      trashedAt: null,
      createdAt: +new Date(),
      inPlaceEditMode: false,
    },
  ];
  const [tasks, setTasks] = useState(seedTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const pendingTasks = scopedTaks(TASK_STATUS_PENDING);
  const activeTasks = scopedTaks(TASK_STATUS_ACTIVE);
  const completedTasks = scopedTaks(TASK_STATUS_DONE);
  const trashedTasks = scopedTaks(TASK_STATUS_TRASHED);

  // Render our pending, done and soft deleted tasks lists
  const todoListItemsPending = renderTaskItems(pendingTasks);
  // TODO:
  const todoListItemsActive = renderTaskItems(activeTasks);
  const todoListItemsDone = renderTaskItems(completedTasks);
  const todoListItemsTrashed = renderTaskItems(trashedTasks);

  // Scopes "tasks"-state using the provided status
  // and applying a potential filter value
  function scopedTaks(status) {
    return tasks.filter((task) => {
      if (searchTerm) {
        return (
          task.status === status && task.task.toLowerCase().includes(searchTerm)
        );
      } else {
        return task.status === status;
      }
    });
  }

  function renderTaskItems(collection) {
    return (
      collection
        // .filter((task) => {
        //   return task.status === status;
        // })
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
              onTrashClick={handleTaskTrashClick}
              onBtnClick={handleTaskStatusToggleClick}
              onEditClick={handleTaskEditClick}
              onSubmitUpdate={handleSubmitUpdate}
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

  // Toggle the inLineEdit-boolean
  function handleTaskEditClick(currentTask) {
    console.log("handleTaskEditClick");
    setTasks(
      tasks.map((task) => {
        if (task.id === currentTask.id) {
          task.inPlaceEditMode = true;
        }

        return task;
      })
    );
  }

  // TODO:
  // Only for already trashed task:
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
    console.log("handleTaskStatusToggleClick");
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

  // Handles task Update
  function handleSubmitUpdate(currentTask, event) {
    console.log("handleSubmitUpdate");
    event.preventDefault();

    const form = event.target;

    setTasks(
      tasks.map((task) => {
        if (task.id === currentTask.id) {
          task.task = form.taskInput.value || "Unspecified Task";
          task.priority = form.taskPriority.value || 2;
          task.inPlaceEditMode = false;
        }

        return task;
      })
    );
  }

  // Handles task Creation
  function handleSubmitCreate(event) {
    console.log("SUBMIT");
    event.preventDefault();
    const form = event.target;

    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        task: form.taskInput.value || "Unspecified Task",
        priority: form.taskPriority.value || 2,
        status: TASK_STATUS_PENDING,
        createdAt: +new Date(),
        completedAt: null,
        trashedAt: null,
        activatedAt: null,
        inPlaceEditMode: false,
      },
    ]);
  }

  function handleLiveSearch(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  function ListHeader({ caption, count }) {
    console.log("count: " + count);
    return (
      <li className="listHeader">
        {count} {caption}
      </li>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
        <form onSubmit={handleSubmitCreate}>
          <input
            id="taskInput"
            type="text"
            placeholder="What needs to get done?!"
          />

          <select defaultValue="2" name="taskPriority" id="taskPriority">
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
            <option value="4">Priority?</option>
          </select>

          <button type="submit">Add</button>
        </form>
        <input
          id="tasksLiveSearch"
          type="text"
          placeholder="What are you looking for?"
          onChange={handleLiveSearch}
        />
      </header>
      <main>
        <div className="TasksTile TasksTile--pending">
          <ul>
            <ListHeader
              caption="Tasks in Backlog (max 10)"
              count={pendingTasks.length}
            />
            {todoListItemsPending}
          </ul>
        </div>
        <div className="TasksTile TasksTile--pending">
          <ul>
            <ListHeader caption="Active Tasks" count={activeTasks.length} />
            {todoListItemsActive}
          </ul>
        </div>
        <div className="TasksTile TasksTile--done">
          <ul>
            <ListHeader
              caption="Completed Tasks"
              count={completedTasks.length}
            />
            {todoListItemsDone}
          </ul>
        </div>
        <div className="TasksTile TasksTile--trashed">
          <ul>
            <ListHeader caption="Trashed Tasks" count={trashedTasks.length} />
            {todoListItemsTrashed}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;

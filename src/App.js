import "./App.css";
import "./media-queries.css";
import { useEffect, useState } from "react";
import TodoListItem from "./components/TodoListItem.js";
import TodoListHeader from "./components/TodoListHeader.js";
// external libraries
import { v4 as uuidv4 } from "uuid"; // gives us uniq ids for our tasks
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// importing images
// import logo from "./assets/logo512.png"

function App() {
  /* TODO: Refactor this notification BS */
  const notifyTaskCreated = () =>
    toast.success(
      <div>
        <h3>Task successfully created</h3>
        <div>You task was successfully created and added to your backlog.</div>
      </div>
    );
  const notifyTaskCompleted = () =>
    toast.success(
      <div>
        <h3>Task completed</h3>
        <div>
          You task was successfully marked as completed and moved to the
          appropriate list. You can watch it there fo a while... and... be just
          proud with your recent accomplishments! Ah- that feels good, doesn't
          it?! Annother BS of your chest, sigh... Keep finishing tasks!
        </div>
      </div>
    );
  const notifyTaskReopened = () =>
    toast.success(
      <div>
        <h3>Task reopened</h3>
        <div>
          You task was successfully reopened and moved to the tasks-backlog
          again ...
        </div>
      </div>
    );
  const notifyTaskArchived = () =>
    toast.success(
      <div>
        <h3>Task successfully archived</h3>
        <div>
          You task was successfully archived and moved to the corresponding
          list. You can leave it there for a while and admire it or whatever
          turns you on. And IF you finally decide to let go, you can always
          delete archived tasks for good.
        </div>
      </div>
    );
  const notifyTaskDeleted = () =>
    toast.success(
      <div>
        <h3>Task successfully deleted</h3>
        <div>
          Now it's done: Your task is gone -but don't you cry, young Padawan:
          There's allways a new one!
        </div>
      </div>
    );

  const notifyTaskActivated = () =>
    toast.success(
      <div>
        <h3>Task successfully activated</h3>
        <div>
          Now we have deal (Bello and you that is): Your task was successfully
          activated and has now the sate 'in progress' => So get to it! Wuff!
        </div>
      </div>
    );

  const notifyTaskReBacklogged = () =>
    toast.success(
      <div>
        <h3>Task successfully backlogged</h3>
        <div>
          Ohh keeyyy: You wanted to chicken out by moving your task to the
          backlog again. Bello doesn't like that - once the bone is thrown, you
          gotta ... fetch it? ... chew it? ... lick it clean? Doesn't matter =>
          You get the picture! Wuff!
        </div>
      </div>
    );

  const notifyTaskDeArchived = () =>
    toast.success(
      <div>
        <h3>Task successfully dearchived</h3>
        <div>
          Your task was successfully dearchived an dmove tothe backlog again
        </div>
      </div>
    );

  const notifyScoredUp = () =>
    toast.success(
      <div>
        <h3>
          <i class="fas fa-trophy"></i>
          <span> +1</span>
        </h3>
        <div>You earned 1 task completion point!</div>
      </div>
    );

  const notifyScoredDown = () =>
    toast.error(
      <div>
        <h3>
          <i class="fas fa-trophy"></i>
          <span> -1</span>
        </h3>
        <div>You lost 1 task completion point!</div>
      </div>
    );

  // const notifyTaskDeleted = () =>
  //   toast.error(
  //     <div>
  //       <h3>Task successfully deleted</h3>
  //       <div>
  //         Now it's done: Your task is gone -but don't you cry, young Padawan:
  //         There's allways a new one!
  //       </div>
  //     </div>
  //   );

  const notifyActiveTasksLimitReached = () =>
    toast.error(
      <div>
        <h3>Active-tasks-limit reached!</h3>
        <div>
          Can't activate this task since the max number of active tasks is
          already reached. Just finish one or more of your active tasks before
          you start a new one!
        </div>
      </div>
    );
  const notifyTasksBacklogLimitReached = () =>
    toast.error(
      <div>
        <h3>Backlog-limit reached!</h3>
        <div>
          Can't backlog this task since the max number of backlogged tasks is
          already reached. Just finish one or more of your backlogged Tasks
          before you move this task to you backlog!"
        </div>
      </div>
    );

  const TASK_STATUS_PENDING = "PENDING"; // == TASKS BACKLOG
  const TASK_STATUS_ACTIVE = "ACTIVE"; // == TASKS IN PROGRESS
  const TASK_STATUS_DONE = "DONE";
  const TASK_STATUS_ARCHIVED = "ARCHIVED";

  const seedTasks = [
    {
      id: uuidv4(),
      task: "Do This!",
      status: TASK_STATUS_PENDING,
      priority: 2,
      completedAt: null,
      archivedAt: null,
      activatedAt: null,
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Do That!",
      status: TASK_STATUS_PENDING,
      priority: 3,
      completedAt: null,
      archivedAt: null,
      activatedAt: null,
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Listen to Yoda!",
      status: TASK_STATUS_PENDING,
      priority: 1,
      completedAt: null,
      archivedAt: null,
      activatedAt: null,
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Don't walk the dark path!",
      status: TASK_STATUS_PENDING,
      priority: 1,
      completedAt: null,
      archivedAt: null,
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
      archivedAt: null,
      createdAt: +new Date(),
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Do. Or do not. There is no try.",
      status: TASK_STATUS_ACTIVE,
      priority: 1,
      completedAt: null,
      archivedAt: null,
      createdAt: +new Date(),
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "I'm on it!",
      status: TASK_STATUS_ACTIVE,
      priority: 2,
      completedAt: null,
      archivedAt: null,
      createdAt: +new Date(),
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Done for good!",
      status: TASK_STATUS_DONE,
      priority: 2,
      completedAt: +new Date(),
      archivedAt: null,
      createdAt: +new Date(),
      inPlaceEditMode: false,
    },
    {
      id: uuidv4(),
      task: "Let's keep that one!",
      status: TASK_STATUS_ARCHIVED,
      priority: 2,
      completedAt: +new Date(),
      archivedAt: null,
      createdAt: +new Date(),
      inPlaceEditMode: false,
    },
  ];
  const [tasks, setTasks] = useState(seedTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [userScore, setuserScore] = useState(0);
  // TODO: make those editable
  const [activeTasksLimit, setActiveTasksLimit] = useState(3);
  const [tasksBacklogLimit, setTasksBacklogLimit] = useState(6);
  const pendingTasks = scopedTaks(TASK_STATUS_PENDING);
  const activeTasks = scopedTaks(TASK_STATUS_ACTIVE);
  const completedTasks = scopedTaks(TASK_STATUS_DONE);
  const archivedTasks = scopedTaks(TASK_STATUS_ARCHIVED); // TODO: rename to archived

  // Render our pending, done and soft deleted tasks lists
  const todoListItemsPending = renderTaskItems(pendingTasks);
  const todoListItemsActive = renderTaskItems(activeTasks);
  const todoListItemsDone = renderTaskItems(completedTasks);
  const todoListItemsArchived = renderTaskItems(archivedTasks); // TODO: Rename to archived

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
              onArchiveClick={handleTaskArchiveClick} // TODO: onArchiveClick
              onDearchiveClick={handleTaskDearchiveClick} // TODO: On DeArchiveClick
              onToggleCompletedClick={handleTaskStatusCompletedToggleClick}
              onToggleActivatedClick={handleTaskActiveStatusToggleClick}
              onEditClick={handleTaskEditClick}
              onSubmitUpdate={handleSubmitUpdate}
            />
          );
        })
    );
  }

  //  TODO: Recconceptionalize to archive
  // Just soft delete the current task
  function handleTaskArchiveClick(currentTask) {
    console.log("handleTaskArchiveClick");
    if (currentTask.status === TASK_STATUS_ARCHIVED) {
      if (window.confirm("Kill for good?!")) {
        deleteTask(currentTask);
        notifyTaskDeleted();
      }
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === currentTask.id) {
            task.status = TASK_STATUS_ARCHIVED;
            task.archivedAt = +new Date();
            notifyTaskArchived();
          }

          return task;
        })
      );
    }
  }

  // Just soft delete the current task
  function handleTaskDearchiveClick(currentTask) {
    console.log("handleTaskDearchiveClick");
    setTasks(
      tasks.map((task) => {
        if (task.id === currentTask.id) {
          task.status = TASK_STATUS_PENDING;
          task.archivedAt = null;
          notifyTaskDeArchived();
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
  // helper function
  // Only for already archived task:
  // Remove the current task for good
  function deleteTask(currentTask) {
    console.log("Delete task");
    console.log("---task to be deleted: " + currentTask.task);

    setTasks(
      tasks.filter((task) => {
        // console.log("")
        return task.id !== currentTask.id;
      })
    );
  }

  // toggle the current tasks's status
  // TODO: for real bro? Refactor this BS
  function handleTaskStatusCompletedToggleClick(currentTask) {
    console.log("handleTaskStatusCompletedToggleClick");
    setTasks(
      tasks.map((task) => {
        if (task.id === currentTask.id) {
          if (
            task.status === TASK_STATUS_PENDING ||
            task.status === TASK_STATUS_DONE
          ) {
            task.status === TASK_STATUS_PENDING
              ? setTaskCompleted(task)
              : resetTaskPending(task);
          } else if (task.status === TASK_STATUS_ACTIVE) {
            setTaskCompleted(task);
          }
        }

        return task;
      })
    );
  }

  function setTaskCompleted(task) {
    task.status = TASK_STATUS_DONE;
    task.completedAt = +new Date();
    notifyTaskCompleted();
    notifyScoredUp();
    setuserScore(userScore + 1);
    return task;
  }

  function resetTaskPending(task) {
    task.status = TASK_STATUS_PENDING;
    task.completedAt = null;
    setuserScore(userScore - 1);
    notifyTaskReopened();
    notifyScoredDown();
    return task;
  }

  // toggle the current tasks's status between pending <-> active
  // TODO:Honor actveTasksLimit + tasksBacklogLimit!
  function handleTaskActiveStatusToggleClick(currentTask) {
    console.log("handleTaskActiveStatusToggleClick");
    setTasks(
      tasks.map((task) => {
        if (task.id === currentTask.id) {
          if (task.status === TASK_STATUS_PENDING) {
            if (activeTasks.length >= activeTasksLimit) {
              notifyActiveTasksLimitReached();
              return task;
            }
          } else if (task.status === TASK_STATUS_ACTIVE) {
            if (pendingTasks.length >= tasksBacklogLimit) {
              notifyTasksBacklogLimitReached();
              return task;
            }
          }
          task.status =
            task.status === TASK_STATUS_PENDING
              ? TASK_STATUS_ACTIVE
              : TASK_STATUS_PENDING;
          task.activatedAt =
            task.status === TASK_STATUS_ACTIVE ? +new Date() : null;
          task.status === TASK_STATUS_ACTIVE
            ? notifyTaskActivated()
            : notifyTaskReBacklogged();
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

    if (pendingTasks.length >= tasksBacklogLimit) {
      notifyTasksBacklogLimitReached();
      return;
    }

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
        archivedAt: null,
        activatedAt: null,
        inPlaceEditMode: false,
      },
    ]);

    notifyTaskCreated();
  }

  function handleLiveSearch(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  /* useEffect experiments*/
  // function VisitsCounter() {
  //   const [visits, setVisits] = useState(0);

  //   useEffect(() => {
  //     setVisits(Number(localStorage.getItem("visitsCounter") || 0) + 1);
  //   }, []);

  //   useEffect(() => {
  //     localStorage.setItem("visitsCounter", visits);
  //   }, [visits]);

  //   return <p>{visits}</p>;
  // }

  return (
    <div className="App">
      <header>
        <form onSubmit={handleSubmitCreate}>
          <input
            id="taskInput"
            type="text"
            placeholder="What needs to get done?!"
          />
          <select defaultValue="" name="taskPriority" id="taskPriority">
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
            <option value="4">Wuff!</option>
            <option value="" disabled selected default>
              Priority?
            </option>
          </select>
          <button type="submit">Add</button>
        </form>
        <h1>
          <i className="fas fa-dog"></i>
          <span>Bello</span>
        </h1>
        <input
          id="tasksLiveSearch"
          type="text"
          placeholder="What are you looking for?"
          onChange={handleLiveSearch}
        />
        <div className="userScoreWrapper">
          <i class="fas fa-trophy"></i>
          <span>{userScore}</span>
        </div>
      </header>
      <main>
        <div className="TasksTile TasksTile--pending">
          <ul>
            <TodoListHeader
              caption="Tasks-Backlog"
              iconClass="fas fa-clipboard-list"
              count={`${pendingTasks.length} / ${tasksBacklogLimit}`}
            />
            {todoListItemsPending}
          </ul>
        </div>
        <div className="TasksTile TasksTile--active">
          <ul>
            <TodoListHeader
              caption="Active Tasks"
              iconClass="fas fa-plane-departure"
              count={`${activeTasks.length} / ${activeTasksLimit}`}
            />
            {todoListItemsActive}
          </ul>
        </div>
        <div className="TasksTile TasksTile--done">
          <ul>
            <TodoListHeader
              caption="Completed Tasks"
              iconClass="far fa-check-circle"
              count={completedTasks.length}
            />
            {todoListItemsDone}
          </ul>
        </div>
        <div className="TasksTile TasksTile--archived">
          <ul>
            <TodoListHeader
              caption="Archived Tasks"
              iconClass="fas fa-box"
              count={archivedTasks.length}
            />
            {todoListItemsArchived}
          </ul>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;

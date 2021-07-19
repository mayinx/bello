// import { useLayoutEffect } from "react";

const taskPriorityOptionsForSelect = [
  {
    label: "High Priority",
    value: 1,
  },
  {
    label: "Medium Priority",
    value: 2,
  },
  {
    label: "Low Priority",
    value: 3,
  },
  {
    label: "Wuff!",
    value: 4,
  },
];

export default function TodoListItem(props) {
  return props.task.inPlaceEditMode
    ? TodoListItemInPlaceEditMode(props)
    : TodoListItemPresentationMode(props);
}

function TodoListItemPresentationMode(props) {
  return (
    <li
      id={props.task.id}
      className={
        "TodoListItem TodoListItem--" +
        props.task.status.toLowerCase() +
        " TodoListItem--priority-" +
        props.task.priority
      }
    >
      <div className="TodoListItem--task-header">
        <span>
          <i className="fas fa-tasks"></i>
        </span>
        <div className="TodoListItem--task-caption">{props.task.task}</div>
      </div>
      <div className="TodoListItem--task-actions">
        <TodoListItemActions {...props} />
      </div>
    </li>
  );
}

function TodoListItemInPlaceEditMode(props) {
  return (
    <li
      id={props.task.id}
      className={
        "TodoListItem TodoListItem--" +
        props.task.status.toLowerCase() +
        " TodoListItem--priority-" +
        props.task.priority
      }
    >
      <form
        onSubmit={(e) => {
          props.onSubmitUpdate(props.task, e);
        }}
      >
        <div className="TodoListItem--task-header">
          <span>
            <i className="fas fa-tasks"></i>
          </span>
          <div className="TodoListItem--task-caption">
            <input
              type="text"
              id="taskInput" // TODO: Should be unique!
              className="taskInput"
              name="taskInput"
              defaultValue={props.task.task}
              autofocus="autofocus"
            ></input>
          </div>
        </div>
        <div className="TodoListItem--task-actions">
          <div>
            <select
              defaultValue={props.task.priority}
              name="taskPriority"
              id="taskPriority" // TODO: Should be unique!
              className="taskPriority"
            >
              {taskPriorityOptionsForSelect.map((option) => {
                return <option value={option.value}>{option.label}</option>;
              })}
            </select>
          </div>
          <button type="submit" className="toggleTaskStatus">
            Save
          </button>
        </div>
      </form>
    </li>
  );
}

// helper- create sappendix for
// function ItemActionsStatusAppendix(task) {
//   let lower = task.status.toLowerCase();
//   return lower.charAt(0).toUpperCase() + lower.slice(1);
// }

function TodoListItemActions(props) {
  // TODO: Ask Namir: That didn't work for some reason?!:
  //const TagName = "TodoListItemActions" + ItemActionsStatusAppendix(props.task);
  const components = {
    PENDING: TodoListItemActionsPending,
    ACTIVE: TodoListItemActionsActive,
    DONE: TodoListItemActionsDone,
    TRASHED: TodoListItemActionsTrashed,
  };

  const TagName = components[props.task.status];
  return <TagName {...props} />;
}

function TodoListItemActionsPending(props) {
  return (
    <>
      <button
        onClick={(e) => {
          props.onTrashClick(props.task);
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      <button
        onClick={(e) => {
          props.onEditClick(props.task);
        }}
      >
        <i className="fas fa-pencil-alt"></i>
      </button>
      <button
        className="toggleTaskStatus"
        onClick={(e) => {
          props.onToggleCompletedClick(props.task);
        }}
      >
        <i className="far fa-check-circle"></i>
      </button>
      <button
        onClick={(e) => {
          props.onToggleActivatedClick(props.task);
        }}
      >
        <i className="fas fa-plane-departure"></i>
      </button>
    </>
  );
}

function TodoListItemActionsActive(props) {
  return (
    <>
      <button
        onClick={(e) => {
          props.onTrashClick(props.task);
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      <button
        onClick={(e) => {
          props.onEditClick(props.task);
        }}
      >
        <i className="fas fa-pencil-alt"></i>
      </button>
      <button
        onClick={(e) => {
          props.onToggleActivatedClick(props.task);
        }}
      >
        <i className="fas fa-clipboard-list"></i>
      </button>
      <button
        className="toggleTaskStatus"
        onClick={(e) => {
          props.onToggleCompletedClick(props.task);
        }}
      >
        <i className="far fa-check-circle"></i>
      </button>
    </>
  );
}

function TodoListItemActionsDone(props) {
  return (
    <>
      <button
        onClick={(e) => {
          props.onTrashClick(props.task);
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      <button
        onClick={(e) => {
          props.onEditClick(props.task);
        }}
      >
        <i className="fas fa-pencil-alt"></i>
      </button>
      <button
        className="toggleTaskStatus"
        onClick={(e) => {
          props.onToggleCompletedClick(props.task);
        }}
      >
        {/* <i className="far fa-check-circle"></i> */}
        <i className="fas fa-undo"></i>
      </button>
    </>
  );
}

function TodoListItemActionsTrashed(props) {
  return (
    <>
      <button
        onClick={(e) => {
          props.onEditClick(props.task);
        }}
      >
        <i className="fas fa-pencil-alt"></i>
      </button>
      <button
        onClick={(e) => {
          props.onUntrashClick(props.task);
        }}
      >
        <i className="fas fa-trash-restore-alt"></i>
      </button>

      <button
        onClick={(e) => {
          props.onTrashClick(props.task);
        }}
      >
        <i className="fas fa-times-circle"></i>
      </button>
    </>
  );
}

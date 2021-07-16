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
    label: "Priority?",
    value: 4,
  },
];

export default function TodoListItem({
  task,
  onTrashClick,
  onBtnClick,
  onEditClick,
  onSubmitUpdate,
}) {
  const argsObj = {
    task,
    onTrashClick,
    onBtnClick,
    onEditClick,
    onSubmitUpdate,
  };

  return task.inPlaceEditMode
    ? TodoListItemInPlaceEditMode(argsObj)
    : TodoListItemPresentationMode(argsObj);
}

function TodoListItemPresentationMode({
  task,
  onTrashClick,
  onBtnClick,
  onEditClick,
  onSubmitUpdate,
}) {
  return (
    <li
      id={task.id}
      className={
        "TodoListItem TodoListItem--" +
        task.status.toLowerCase() +
        " TodoListItem--priority-" +
        task.priority
      }
    >
      <div className="TodoListItem--task-header">
        <span>
          <i class="fas fa-tasks"></i>
        </span>
        <div className="TodoListItem--task-caption">{task.task}</div>
      </div>
      <div className="TodoListItem--task-actions">
        <button
          onClick={(e) => {
            onTrashClick(task);
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <button
          onClick={(e) => {
            onEditClick(task);
          }}
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          className="toggleTaskStatus"
          onClick={(e) => {
            onBtnClick(task);
          }}
        >
          <i className="far fa-check-circle"></i>
        </button>
      </div>
    </li>
  );
}

function TodoListItemInPlaceEditMode({
  task,
  onTrashClick,
  onBtnClick,
  onEditClick,
  onSubmitUpdate,
}) {
  return (
    <li
      id={task.id}
      className={
        "TodoListItem TodoListItem--" +
        task.status.toLowerCase() +
        " TodoListItem--priority-" +
        task.priority
      }
    >
      <form
        onSubmit={(e) => {
          onSubmitUpdate(task, e);
        }}
      >
        <div className="TodoListItem--task-header">
          <span>
            <i class="fas fa-tasks"></i>
          </span>
          <div className="TodoListItem--task-caption">
            <input
              type="text"
              id="taskInput" // TODO: Should be unique!
              class="taskInput"
              name="taskInput"
              defaultValue={task.task}
              autofocus="autofocus"
            ></input>
          </div>
        </div>
        <div className="TodoListItem--task-actions">
          <div>
            <select
              defaultValue={task.priority}
              name="taskPriority"
              id="taskPriority" // TODO: Should be unique!
              class="taskPriority"
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

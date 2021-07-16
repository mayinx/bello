export default function TodoListItem({
  task,
  onTrashClick,
  onBtnClick,
  onEditClick,
}) {
  if (task.inPlaceEditMode) {
    console.log("IN PLACE EDIT MODE!");
  } else {
    console.log("REGULAR MODE");
  }

  const argsObj = {
    task,
    onTrashClick,
    onBtnClick,
    onEditClick,
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
        <div className="TodoListItem--task-caption">
          <input name="task"></input>
        </div>
      </div>
      <div className="TodoListItem--task-actions">
        <div>
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
        </div>
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

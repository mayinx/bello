// export default function TodoListItem(product, onCrossClick, onBtnClick) {
export default function TodoListItem({ task, onCrossClick, onBtnClick }) {
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
      <button
        onClick={(e) => {
          onCrossClick(task);
        }}
      >
        X
      </button>
      <span className="TodoListItem--task-caption">{task.task}</span>
      <button
        onClick={(e) => {
          onBtnClick(task);
        }}
      >
        {task.status}
      </button>
    </li>
  );
}

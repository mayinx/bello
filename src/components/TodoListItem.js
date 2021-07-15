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
        <i className="fas fa-trash-alt"></i>
      </button>
      <span className="TodoListItem--task-caption">{task.task}</span>
      <button
        className="toggleTaskStatus"
        onClick={(e) => {
          onBtnClick(task);
        }}
      >
        <i className="far fa-check-circle"></i>
      </button>
    </li>
  );
}

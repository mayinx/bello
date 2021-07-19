export default function TodoListHeader({ caption, iconClass, count }) {
  return (
    <li className="TodoListHeader">
      <span>
        <i className={iconClass}></i>
      </span>
      <span>
        <strong>{caption}</strong>
      </span>
      <span>({count})</span>
    </li>
  );
}

import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo, editTodo } from './store';
import { useState } from 'react';

const TaskItem = (props) => {
  const { task } = props;
  const dispatch = useDispatch();

  const [showText, setShowText] = useState(false);

  const [text, setText] = useState(task.text);

  const showEditForm = (id) => {
    const editForm = document.getElementById(`edit-form-${id}`);

    editForm.style.display = "block";
    setShowText(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editTodo({
      id: task.id,
      text: text
    }))
    setShowText(false);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch(toggleComplete(task.id))}
          style={{ width: "20px", height: "20px" }}
        />
        {task.text}

        <span
          onClick={() => dispatch(deleteTodo(task.id))}
          role="button"
          style={{ padding: "5px", marginLeft: "20px" }}
        >
          X
        </span>
        <span
          onClick={() => showEditForm(task.id)}
          role="button"
          style={{ padding: "5px", marginLeft: "20px" }}
        >
          Edit
        </span>
        <form onSubmit={handleSubmit}>
          <input
            style={ ! showText ? { display: "none" } : { display: "block" }}
            id={`edit-form-${task.id}`}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </label>
    </div>
  );
};

export default TaskItem;

import { useState } from "react";
import classes from "./Task.module.css";
import { BsPencilFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

export default function Task({ task, handleDragStart, tasksSetterFunction }) {
  const [editingTask, setEditingTask] = useState(false);
  const [taskText, setTaskText] = useState(task.taskText);

  function handleTaskEditClick() {
    setEditingTask(true);
    setTaskText(task.taskText);
  }

  function handleEditTaskInputChange(e) {
    setTaskText(e.target.value);
  }

  function handleSaveEditedTaskClick() {
    tasksSetterFunction((prevTasks) =>
      prevTasks.map((prevTask) => {
        if (prevTask.taskId !== task.taskId) {
          return prevTask;
        } else {
          return { ...prevTask, taskText: taskText };
        }
      })
    );
    setEditingTask(false);
  }

  function handleTaskDeleteClick() {
    tasksSetterFunction((prevTasks) =>
      prevTasks.filter((prevTask) => prevTask.taskId !== task.taskId)
    );
  }

  return (
    <li className={classes.task} draggable onDragStart={(e) => handleDragStart(e, task)}>
      {editingTask ? (
        <input type="text" value={taskText} onChange={handleEditTaskInputChange} />
      ) : (
        <p>{task.taskText}</p>
      )}

      <div className={classes.taskIcons}>
        {editingTask ? (
          <TiTick onClick={handleSaveEditedTaskClick} />
        ) : (
          <BsPencilFill onClick={handleTaskEditClick} className={classes.editIcon} />
        )}

        <RxCross1 className={classes.deleteIcon} onClick={handleTaskDeleteClick} />
      </div>
    </li>
  );
}

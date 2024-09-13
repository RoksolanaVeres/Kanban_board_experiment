import classes from "./TasksColumn.module.css";
import AddTaskButton from "./AddTaskButton";

export default function TasksColumn({ header, tasks, onDropFunction, tasksSetterFunction }) {
  function handleDragStart(e, taskData) {
    e.dataTransfer.setData("taskData", JSON.stringify(taskData));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className={classes.tasksColumn} onDragOver={handleDragOver} onDrop={onDropFunction}>
      <h2 className={classes.tasksColumnHeader}>{header}</h2>
      <ul className={classes.tasksList}>
        {tasks.map((task) => {
          return (
            <li
              className={classes.task}
              key={task.taskId}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
            >
              {task.taskText}
            </li>
          );
        })}
      </ul>
      <AddTaskButton tasksSetterFunction={tasksSetterFunction} />
    </div>
  );
}

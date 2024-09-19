import classes from "./TasksColumn.module.css";
import AddTaskButton from "./AddTaskButton";
import Task from "./Task";

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
            <Task
              key={task.taskId}
              task={task}
              handleDragStart={handleDragStart}
              tasksSetterFunction={tasksSetterFunction}
            />
          );
        })}
      </ul>
      <AddTaskButton tasksSetterFunction={tasksSetterFunction} />
    </div>
  );
}

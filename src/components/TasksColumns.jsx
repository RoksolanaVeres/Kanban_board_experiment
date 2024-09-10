import { useState } from "react";
import classes from "./TasksColumns.module.css";

const INITIAL_TASKS = [
  { taskId: crypto.randomUUID(), taskText: "Task 1" },
  { taskId: crypto.randomUUID(), taskText: "Task 2" },
  { taskId: crypto.randomUUID(), taskText: "Task 3" },
  { taskId: crypto.randomUUID(), taskText: "Task 4" },
  { taskId: crypto.randomUUID(), taskText: "Task 5" },
];

export default function TasksColumns() {
  const [tasksToDo, setTasksToDo] = useState(INITIAL_TASKS);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksReview, setTasksReview] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);

  function handleToDoDrop(e) {
    e.preventDefault();
    let droppedTask = JSON.parse(e.dataTransfer.getData("taskData"));
    setTasksToDo((prevTasks) => [
      ...prevTasks.filter((task) => task.taskId !== droppedTask.taskId),
      { taskId: droppedTask.taskId, taskText: droppedTask.taskText },
    ]);
  }

  function handleInProgressDrop(e) {
    e.preventDefault();
    let droppedTask = JSON.parse(e.dataTransfer.getData("taskData"));
    console.log(droppedTask);
    setTasksInProgress((prevTasks) => [
      ...prevTasks.filter((task) => task.taskId !== droppedTask.taskId),
      { taskId: droppedTask.taskId, taskText: droppedTask.taskText },
    ]);
  }

  function handleReviewDrop(e) {
    e.preventDefault();
    let droppedTask = JSON.parse(e.dataTransfer.getData("taskData"));
    setTasksReview((prevTasks) => [
      ...prevTasks.filter((task) => task.taskId !== droppedTask.taskId),
      { taskId: droppedTask.taskId, taskText: droppedTask.taskText },
    ]);
  }

  function handleDoneDrop(e) {
    e.preventDefault();
    let droppedTask = JSON.parse(e.dataTransfer.getData("taskData"));
    setTasksDone((prevTasks) => [
      ...prevTasks.filter((task) => task.taskId !== droppedTask.taskId),
      { taskId: droppedTask.taskId, taskText: droppedTask.taskText },
    ]);
  }

  return (
    <div className={classes.columnsContainer}>
      <TasksColumn header="To Do" tasks={tasksToDo} onDropFunction={handleToDoDrop} />
      <TasksColumn
        header="In Progress"
        tasks={tasksInProgress}
        onDropFunction={handleInProgressDrop}
      />
      <TasksColumn header="Review" tasks={tasksReview} onDropFunction={handleReviewDrop} />
      <TasksColumn header="Done" tasks={tasksDone} onDropFunction={handleDoneDrop} />
    </div>
  );
}

function TasksColumn({ header, tasks, onDropFunction }) {
  function handleDragStart(e, taskData) {
    e.dataTransfer.setData("taskData", JSON.stringify(taskData));
    // console.log(taskData);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className={classes.tasksColumn} onDragOver={handleDragOver} onDrop={onDropFunction}>
      <h1>{header}</h1>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.taskId} draggable onDragStart={(e) => handleDragStart(e, task)}>
              {task.taskText}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

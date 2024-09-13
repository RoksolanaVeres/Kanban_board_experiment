import { useState } from "react";
import classes from "./App.module.css";
import TasksColumn from "./components/TasksColumn";

const INITIAL_TASKS = [
  { taskId: crypto.randomUUID(), taskText: "Task 1" },
  { taskId: crypto.randomUUID(), taskText: "Task 2" },
  { taskId: crypto.randomUUID(), taskText: "Task 3" },
  { taskId: crypto.randomUUID(), taskText: "Task 4" },
  { taskId: crypto.randomUUID(), taskText: "Task 5" },
];

export default function App() {
  const [tasksToDo, setTasksToDo] = useState(INITIAL_TASKS);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksReview, setTasksReview] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);

  const columnSetterFunctions = [setTasksToDo, setTasksInProgress, setTasksReview, setTasksDone];

  function handleDropTaskIntoColumn(e, tasksSetterFunction) {
    // drop task into a column
    e.preventDefault();
    let droppedTask = JSON.parse(e.dataTransfer.getData("taskData"));
    tasksSetterFunction((prevTasks) => [
      ...prevTasks.filter((task) => task.taskId !== droppedTask.taskId),
      { taskId: droppedTask.taskId, taskText: droppedTask.taskText },
    ]);

    // remove dropped task from other columns
    let columnsToRemoveTaskFrom = columnSetterFunctions.filter(
      (columnSetterFunction) => columnSetterFunction !== tasksSetterFunction
    );

    columnsToRemoveTaskFrom.forEach((columnSetterFn) =>
      columnSetterFn((prevTasks) => [
        ...prevTasks.filter((prevTask) => prevTask.taskId !== droppedTask.taskId),
      ])
    );
  }

  return (
    <main className={classes.mainContainer}>
      <h1 className={classes.mainHeader}>Kanban Board</h1>
      <div className={classes.columnsContainer}>
        <TasksColumn
          header="To Do"
          tasks={tasksToDo}
          onDropFunction={(e) => handleDropTaskIntoColumn(e, setTasksToDo)}
          tasksSetterFunction={setTasksToDo}
        />
        <TasksColumn
          header="In Progress"
          tasks={tasksInProgress}
          onDropFunction={(e) => handleDropTaskIntoColumn(e, setTasksInProgress)}
          tasksSetterFunction={setTasksInProgress}
        />
        <TasksColumn
          header="Review"
          tasks={tasksReview}
          onDropFunction={(e) => handleDropTaskIntoColumn(e, setTasksReview)}
          tasksSetterFunction={setTasksReview}
        />
        <TasksColumn
          header="Done"
          tasks={tasksDone}
          onDropFunction={(e) => handleDropTaskIntoColumn(e, setTasksDone)}
          tasksSetterFunction={setTasksDone}
        />
      </div>
    </main>
  );
}

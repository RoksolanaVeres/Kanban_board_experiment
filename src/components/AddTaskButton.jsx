import { useState } from "react";
import classes from "./AddTaskButton.module.css";

export default function AddTaskButton({ tasksSetterFunction }) {
  const [addTask, setAddTask] = useState(false);

  function handleAddTaskClick() {
    setAddTask(true);
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    const tasksFormData = new FormData(e.target);
    const taskEntered = tasksFormData.get("taskText");

    tasksSetterFunction((prevTasks) => [
      ...prevTasks,
      { taskId: crypto.randomUUID(), taskText: taskEntered },
    ]);
    setAddTask(false);
  }

  return (
    <>
      {addTask ? (
        <form action="" onSubmit={handleTaskSubmit}>
          <input type="text" name="taskText" />
        </form>
      ) : (
        <button onClick={handleAddTaskClick}>Add Task</button>
      )}
    </>
  );
}

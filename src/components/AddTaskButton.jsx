import { useEffect, useRef, useState } from "react";
import classes from "./AddTaskButton.module.css";

export default function AddTaskButton({ tasksSetterFunction }) {
  const [addTask, setAddTask] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setAddTask(false);
      }
    }
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  function handleAddTaskClick() {
    setAddTask(true);
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    const tasksFormData = new FormData(e.target);
    const taskEntered = tasksFormData.get("taskText");

    if (taskEntered.trim() === "") {
      return;
    }

    tasksSetterFunction((prevTasks) => [
      ...prevTasks,
      { taskId: crypto.randomUUID(), taskText: taskEntered },
    ]);
    setAddTask(false);
  }

  return (
    <>
      {addTask ? (
        <form ref={formRef} action="" onSubmit={handleTaskSubmit} className={classes.addTaskForm}>
          <input type="text" name="taskText" className={classes.addTaskInput} />
        </form>
      ) : (
        <button onClick={handleAddTaskClick}>Add Task</button>
      )}
    </>
  );
}

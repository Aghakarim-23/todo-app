import React, { useEffect, useState } from "react";
import { Trash, SquarePen, CircleCheck } from "lucide-react";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    console.log(savedTasks);
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      taskId: Date.now(),
      text: task,
      isEditing: false,
      completed: false
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTask("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => id !== task.taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.taskId === id ? { ...task, isEditing: true, completed: false } : task
    );

    setTasks(updatedTasks);
    console.log(updatedTasks);
  };

  const handleChangeTaskText = (id, newTask) => {
    const updatedTasks = tasks.map((task) =>
      id === task.taskId ? { ...task, text: newTask } : task
    );
    setTasks(updatedTasks);
  };

  const handleSaveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      id === task.taskId ? { ...task, isEditing: false } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const completeTask = (id) => {
      const updatedTask = tasks.map((task) => id === task.taskId ? 

      { ...task, completed: !task.completed} : task ) 
      setTasks(updatedTask)

      localStorage.setItem("tasks", JSON.stringify(updatedTask))

  }


  return (
    <div className="flex justify-center items-center flex-col max-w-[70%] mx-auto">
      <h1 className="mt-50 text-3xl">To Do List</h1>
      <form
        className="my-5  md:max-w-[45%] w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Add your task..."
          className="border border-zinc-500 pl-2 py-2 w-[70%] outline-0"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="border border-zinc-500 border-l-0 cursor-pointer px-2 py-2 bg-green-500 w-[30%] text-white"
          onClick={addTask}
        >
          Add
        </button>
      </form>

      <div className="flex flex-col gap-3 md:max-w-[45%] w-full">
        {tasks.length === 0 ? (
          <div>Task list is empty</div>
        ) : (
          tasks.map((task, index) =>
            task.isEditing ? (
              <input
                key={index}
                type="text"
                value={task.text}
                onChange={(e) =>
                  handleChangeTaskText(task.taskId, e.target.value)
                }
                className="border pl-2 py-2"
                onBlur={() => handleSaveTask(task.taskId)}
              />
            ) : (
              <div
                key={index}
                className="flex justify-between border h-[3rem] items-center pl-2"
              >
                <p className={`w-[65%] ${task.completed ? "line-through" : ""}`}>{task.text}</p>
                 <span className="w-[15%] flex justify-center border-l-2 pl-2  h-full items-center "
                  onClick={() => completeTask(task.taskId)}
                 >
                      <CircleCheck  className={`${task.completed ? "text-green-500" : ""}`}/>
                </span>
                <span
                  className="w-[15%] flex justify-center border-l-2 pl-2  h-full items-center "
                  onClick={() => editTask(task.taskId)}
                >
                  <SquarePen className="text-blue-500 cursor-pointer" />
                </span>
                <span
                  className="w-[15%] flex justify-center border-l-2 pl-2  h-full items-center "
                  onClick={() => deleteTask(task.taskId)}
                >
                  <Trash className="text-red-500 cursor-pointer" />
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default App;

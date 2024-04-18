import { Task } from "@/types/Task";
import { useEffect, useState } from "react";

const TaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTaskList();
  });

  const loadTaskList = async () => {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const lists: Task[] = await res.json();
    setTaskList(lists);
    setLoading(false);
  };

  return (
    <div className="">
      <h1 className="p-3 text-3xl">Task List</h1>
      {loading && <div>Loading...</div>}
      <ul className="m-3">
        {taskList.map((task) => (
          <li key={task.id}>
            Task [{task.id}]: {task.title} - {task.completed.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

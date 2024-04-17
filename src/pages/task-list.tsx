import { Task } from "@/types/Task";

type TaskListProps = {
  taskList: Task[];
};

const TaskList = ({ taskList }: TaskListProps) => {
  return (
    <div className="">
      <h1 className="p-3 text-3xl">Task List</h1>
      <ul className="m-3">
        {taskList.map((task) => (
          <li key={task.id}>Task [{task.id}]: {task.title} - {task.completed.toString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

export const getServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const taskList: Task[] = await res.json();

  return {
    props: { taskList },
  };
};

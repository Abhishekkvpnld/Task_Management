import { BiPlus } from "react-icons/bi";
import ListCard from "./ListCard";

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: string;
  attachment: string;
};

type Props = {
  bgColor: string;
  addTask: boolean;
  data: Task[];
  title: string;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrop: (taskId: string, newStatus: string) => void;
};

const Section = ({
  bgColor,
  addTask,
  data,
  title,
  setDelete,
  setAddTask,
  handleDrop,
}: Props) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        let status;
        if (title == "TO-DO") {
          status = "todo";
        } else if (title == "IN-PROGRESS") {
          status = "inprogress";
        } else {
          status = "complete";
        }
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) {
          handleDrop(taskId, status.toLowerCase());
        }
      }}
      className="bg-slate-100 max-w-[90%] rounded-lg w-full min-h-40 mt-3 flex flex-col shadow-sm"
    >
      <div
        className={`w-full ${bgColor} rounded-t-lg px-4 font-semibold text-sm py-1`}
      >
        {title}
      </div>
      {addTask && (
        <div className="px-10 w-full text-sm border-b border-gray-300 h-10 flex items-center gap-1">
          <BiPlus size={20} />{" "}
          <button
            onClick={() => setAddTask((prev) => !prev)}
            className="text-xs font-semibold hover:scale-110 transition-all"
          >
            ADD TASK
          </button>
        </div>
      )}

      {data?.map((dc) => (
        <div key={dc?.id} className="flex flex-col w-full">
          <ListCard title={title} setDelete={setDelete} data={dc} />
        </div>
      ))}
    </div>
  );
};

export default Section;

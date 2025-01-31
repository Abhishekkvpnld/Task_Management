import { BiPlus } from "react-icons/bi";
import ListCard from "./ListCard";

type Props = {
  bgColor: string;
  addTask: boolean;
  data: object[];
  title: string;
};

const Section = ({ bgColor, addTask, data, title }: Props) => {
  return (
    <div className="bg-slate-100 max-w-[90%] rounded-lg w-full min-h-40 mt-8 flex flex-col shadow-sm">
      <div
        className={`w-full ${bgColor} rounded-t-lg px-4 font-semibold text-sm py-1`}
      >
        {title}
      </div>
      {addTask && (
        <div className="px-10 w-full text-sm border-b border-gray-300 h-10 flex items-center gap-1">
          <BiPlus size={20} />{" "}
          <button className="text-xs font-semibold hover:scale-110 transition-all">
            ADD TASK
          </button>
        </div>
      )}

      <div className="flex flex-col w-full">
        <ListCard />
      </div>
    </div>
  );
};

export default Section;

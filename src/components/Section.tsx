import { BiPlus } from "react-icons/bi";
import ListCard from "./ListCard";

type Props = {
  bgColor: string;
  addTask: boolean;
  data: object[];
  title: string;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>
};

const Section = ({ bgColor, addTask, data, title,setDelete}: Props) => {

  
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

      {data?.map((dc) => (
        <div key={dc?.id} className="flex flex-col w-full">
          <ListCard setDelete={setDelete} data={dc}/>
        </div>
      ))}
    </div>
  );
};

export default Section;

import BoardCard from "./BoardCard";

type Props = {
  title: string;
  bgColor: string;
  data: object[];
};

const SectionBoard = ({ title, bgColor, data }: Props) => {
  return (
    <div className="min-w-[25%] flex flex-col p-4 border shadow-sm  mt-4 rounded-lg bg-slate-100 min-h-80">
      <div className={`rounded-md py-1 ${bgColor} w-[50%] px-4 text-sm`}>
        {title}
      </div>

      <BoardCard/>
    </div>
  );
};

export default SectionBoard;

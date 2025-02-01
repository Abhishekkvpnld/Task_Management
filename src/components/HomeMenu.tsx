import { CiSearch } from "react-icons/ci";

type Props = {
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeMenu = ({ setAddTask }: Props) => {
  return (
    <div className="flex items-center w-full justify-between px-6 mt-1">
      <div className="flex items-center gap-2">
        <h6 className="text-slate-500">Filter by:</h6>
        <select
          name=""
          id=""
          className=" border-slate-400 border-2 hover:border-black hover:bg-slate-100 text-sm py-1 hover:text-black text-slate-500 px-2  rounded-full"
        >
          <option value="">
            Category
          </option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>

        <select
          name=""
          id=""
          className=" border-slate-400 border-2 hover:bg-slate-100 hover:text-black hover:border-black text-slate-500 px-2 text-sm py-1 rounded-full"
        >
          <option value="">
            Due Date
          </option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending </option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <div className="border-r-red-200 border border-black rounded-full flex items-center gap-2 h-7 px-1">
          <CiSearch className="font-semibold" />
          <input
            type="text"
            placeholder="Search"
            className="border-none h-full bg-transparent "
          />
        </div>
        <button
          onClick={() => setAddTask((prev) => !prev)}
          className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-800 hover:shadow-lg px-3 rounded-2xl py-2"
        >
          ADD TASK
        </button>
      </div>
    </div>
  );
};

export default HomeMenu;

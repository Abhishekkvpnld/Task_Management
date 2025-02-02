import { CgClose } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

type Props = {
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  category: string;
  filter: string;
};

const HomeMenu = ({
  setAddTask,
  setCategory,
  category,
  setFilter,
  filter,
  search,
  setSearch,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 md:gap-0 items-start md:flex-row md:items-center w-full md:justify-between px-6 mt-1">
      <div className="flex items-center gap-2">
        <h6 className="text-sm text-slate-500">Filter by:</h6>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className=" border-slate-400 border-2 hover:border-black hover:bg-slate-100 text-xs md:text-sm py-1 hover:text-black text-slate-500 px-2  rounded-full"
        >
          <option value="">Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xs md:text-sm border-slate-400 border-2 hover:bg-slate-100 hover:text-black hover:border-black text-slate-500 px-2 py-1 rounded-full"
        >
          <option value="">Due Date</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending </option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <div className="border-r-red-200 h-6 px-2 border text-xs md:text-sm border-black rounded-full flex items-center gap-2 md:h-7">
          <CiSearch className="font-semibold" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="border-none h-full bg-transparent "
          />
        {search &&  <CgClose
            className="hover:scale-110 transition-all hover:text-red-700"
            onClick={() => setSearch("")}
          />}
        </div>
        <button
          onClick={() => setAddTask((prev) => !prev)}
          className="text-xs md:text-sm font-medium text-white bg-purple-600 hover:bg-purple-800 hover:shadow-lg px-2 md:px-3 rounded-2xl py-1 md:py-2"
        >
          ADD TASK
        </button>
      </div>
    </div>
  );
};

export default HomeMenu;

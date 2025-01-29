import { CiSearch } from "react-icons/ci";

const HomeMenu = () => {
  return (
    <div className="flex items-center justify-between px-6 mt-1">
      <div className="flex items-center gap-2">
        <h6 className="text-slate-500">Filter by:</h6>
        <select
          name=""
          id=""
          className=" border-slate-400 border-2 text-slate-500 px-2 py-1 rounded-full"
        >
          <option disabled value="">
            Category
          </option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>

        <select
          name=""
          id=""
          className=" border-slate-400 border-2 text-slate-500 px-2 py-1 rounded-full"
        >
          <option disabled value="">
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
        <button className="text-sm font-medium text-white bg-purple-800 px-3 rounded-2xl py-2">
          ADD TASK
        </button>
      </div>
    </div>
  );
};

export default HomeMenu;

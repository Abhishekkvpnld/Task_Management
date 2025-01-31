import { useState } from "react";

const ListCard = () => {
  const [opt, setOpt] = useState(false);

  return (
    <div className="grid grid-cols-5 gap-1 items-center px-2 border-b border-slate-300 py-2 justify-between w-full">
      <div className="flex text-xs items-center gap-1">
        icon1 icon2 icon3
        <h1>title Lorem ipsum, dolor</h1>
      </div>

      <div className="text-xs ">20 jan 2022</div>

      <div className="text-xs ">
        <select className="bg-slate-300 py-2 px-2 rounded-lg" name="" id="">
          <option value="todo">TO-DO</option>
          <option value="progress">IN-PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>

      <div className="text-xs">PERSONAL</div>
      <div className="text-xs " onClick={() => setOpt((prev) => !prev)}>
        3Dots
        {opt && (
          <div className="flex text-xs  flex-col gap-1 bg-red-100">
            <button className="text-xs ">Edit</button>
            <button className="text-xs ">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCard;

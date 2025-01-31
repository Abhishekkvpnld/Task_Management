import { LuClipboardList } from "react-icons/lu";

const Login = () => {
  return (
    <div className="w-[100vw] flex items-center justify-between h-[100vh] bg-[#FFF9F9] p-6">
      <div className="flex-1 h-full flex flex-col justify-center gap-5 max-w-[30%] px-6">
        <div className="flex flex-col">
          <h1 className="flex items-center gap-2 font-semibold my-1 text-xl text-[#b300b3]">
            <span>
              <LuClipboardList />
            </span>{" "}
            TaskBuddy
          </h1>
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
            illum nesciunt{" "}
          </p>
        </div>
        <button className="w-50% border border-black py-2 flex items-center justify-center gap-2 rounded-2xl bg-black font-semibold text-white">
          {" "}
          <img src="/google.png" className="w-7" alt="img" /> Continue with
          Google
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full h-full  p-5  relative">
        <div className="w-96 border-[#ff80ff] flex items-center justify-center h-96 border rounded-full">
          <div className="w-80 h-80 flex items-center justify-center border rounded-full border-[#ff99ff] ">
            <div className="w-60 h-60 border rounded-full border-[#800080] "></div>
          </div>
        </div>
        <img src="/homeImg.png" className="absolute ml-40 w-96 h-96" alt="" />
      </div>
    </div>
  );
};

export default Login;

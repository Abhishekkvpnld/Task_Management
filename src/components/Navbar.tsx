import { LuClipboardList } from "react-icons/lu";
import { CiGrid2H } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
  const [profile, setProfile] = useState<boolean>(false);

  const user = true;

  return (
    <div className="bg-transparent w-full flex items-center justify-between px-6 py-2">
      <div className="flex items-center flex-col justify-center gap-4">
        <div className="flex items-center gap-1">
          <LuClipboardList />
          <h1 className="font-semibold text-lg"> TaskBuddy</h1>
        </div>

        <div className="flex items-center justify-between gap-3 text-[#2F2F2F]">
          <div className="flex items-center justify-center gap-1">
            <CiGrid2H />
            <h5 className="text-sm font-semibold text-slate-600">List</h5>
          </div>

          <div className="flex items-center justify-center gap-1">
            <CiGrid41 />
            <h4 className="text-sm font-semibold text-slate-600">Board</h4>
          </div>
        </div>
      </div>

      {user ? (
        <div className="flex items-start justify-center flex-col gap-2">
          <div className="flex items-center gap-2">
            <img
              className="w-9 h-9 rounded-full"
              src="/profile.png"
              alt="profile"
              onClick={() => setProfile((prev) => !prev)}
            />
            <p className="font-semibold text-slate-600">username</p>
          </div>
          {profile && (
            <button className="flex items-center gap-1 text-sm border font-semibold  border-slate-400 px-3 py-2 rounded-lg bg-rose-50 hover:shadow-md hover:bg-red-100">
              <span>
                <RiLogoutBoxLine />
              </span>
              Logout
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <button>Login</button>
          <button>Signup</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

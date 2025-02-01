import { LuClipboardList } from "react-icons/lu";
import { CiGrid2H } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";

type Props = {
  setList: React.Dispatch<React.SetStateAction<boolean>>;
  list: boolean;
};

const Navbar = ({ setList, list }: Props): JSX.Element => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<boolean>(false);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error?.message);
    }
  };

  if (!user) {
    return navigate("/login");
  }

  return (
    <div className="bg-transparent w-full flex items-center justify-between px-6 py-2">
      <div className="flex items-center flex-col justify-center gap-4">
        <div className="flex items-center gap-1">
          <LuClipboardList />
          <h1 className="font-semibold text-lg"> TaskBuddy</h1>
        </div>

        <div className="flex items-center justify-between gap-3 text-[#2F2F2F]">
          <div
            onClick={() => setList(true)}
            className="flex items-center justify-center gap-1 hover:scale-105 transition-all cursor-pointer"
          >
            <CiGrid2H />
            <h5
              className={`text-sm font-semibold ${
                !list ? "text-slate-600" : "text-red-700"
              } hover:text-black`}
            >
              List
            </h5>
          </div>

          <div
            onClick={() => setList(false)}
            className="flex items-center justify-center gap-1 hover:scale-105 transition-all cursor-pointer"
          >
            <CiGrid41 />
            <h4
              className={`${
                list ? "text-slate-600" : "text-red-700"
              } text-sm font-semibold text-slate-600 hover:text-black`}
            >
              Board
            </h4>
          </div>
        </div>
      </div>

      {user ? (
        <div className="flex items-start justify-center flex-col gap-2">
          <div className="flex items-center gap-2">
            <img
              className="w-9 h-9 rounded-full"
              src={"/profile.png"}
              alt="profile"
              onClick={() => setProfile((prev) => !prev)}
            />
            <p className="font-semibold text-slate-600">
              {user?.displayName?.split(" ")[0]}
            </p>
          </div>
          {profile && (
            <button
              onClick={logout}
              className="flex items-center gap-1 text-sm border font-semibold  border-slate-400 px-3 py-2 rounded-lg bg-blue-50 hover:shadow-md hover:scale-110 transition-all hover:bg-blue-100"
            >
              <span>
                <RiLogoutBoxLine />
              </span>
              Logout
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/login")}
            className="border px-5 font-semibold py-2 rounded-full bg-black text-white hover:text-black hover:bg-blue-100 hover:shadow-md"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

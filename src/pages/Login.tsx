import { LuClipboardList } from "react-icons/lu";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
      toast.success("Logged In Successfully...✅");
    } catch (error) {
      console.error("Login Error:", error?.message);
    }
  };

  return (
    <div className="w-[100vw] flex-col  gap-11 md:gap-0 overflow-hidden md:flex-row flex items-center justify-between h-[100vh] bg-[#FFF9F9] p-6">
      <div className="flex-1 h-full flex flex-col justify-center gap-5 max-w-[80%] md:max-w-[30%] px-6">
        <div className="flex flex-col w-fit">
          <h1 className="flex items-center gap-2 font-semibold my-1 text-xl text-[#b300b3]">
            <span>
              <LuClipboardList />
            </span>{" "}
            TaskBuddy
          </h1>
          <p className="text-xs">
            Lorem ipsum dolor Aspernatur Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero eaque non odio maiores quam,ipsum!
            illum nesciunt{" "}
          </p>
        </div>
        <button
          onClick={handleGoogle}
          className="w-50% border border-black py-2 flex items-center justify-center gap-2 rounded-2xl bg-black font-semibold text-white"
        >
          {" "}
          <img src="/google.png" className="w-7" alt="img" /> Continue with
          Google
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full h-full  p-5  relative">
        <div className="w-60 h-60 md:w-96  border-[#ff80ff] flex items-center justify-center md:h-96 border rounded-full">
          <div className="w-52 h-52 md:w-80 md:h-80 flex items-center justify-center border rounded-full border-[#ff99ff] ">
            <div className="w-36 h-36 md:w-60 md:h-60 border rounded-full border-[#800080] "></div>
          </div>
        </div>
        <img src="/homeImg.png"  className=" hidden  md:block absolute ml-40 w-96 h-96" alt="" />
      </div>
    </div>
  );
};

export default Login;

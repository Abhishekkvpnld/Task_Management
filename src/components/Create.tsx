import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { database } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

type Props = {
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const Create = ({ setAddTask, setCreate }: Props):JSX.Element => {

  const navigate = useNavigate();
   const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "Work",
    dueDate: "",
    status: "",
    attachment: "",
  });

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "task-management");
      formData.append("folder", "task-management");

      try {
        const cloudName = import.meta.env.VITE_CLOUD_NAME;
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        setTask((prev) => ({
          ...prev,
          attachment: response?.data?.secure_url,
        }));
        toast.success("Upload successful!");
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  const handleCategoryChange = (category: string) => {
    setTask((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !task.category ||
      !task.description ||
      !task.dueDate ||
      !task.status ||
      !task.title
    ) {
      return toast.error("Please Provide All Details");
    }

    try {
      const dbCollection = collection(database, "task");
      await addDoc(dbCollection, task);
      setCreate(prev=>!prev)
      setTask({
        title: "",
        description: "",
        category: "Work",
        dueDate: "",
        status: "",
        attachment: "",
      });
      setAddTask(false);
      toast.success("Task Created Successfully");
    } catch (error: unknown) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  return (
    <div className="min-w-[100vw] flex items-center justify-center fixed min-h-[100vh] bg-white bg-opacity-70">
      <form
        className="border shadow-lg mt-11 w-[80%]  md:w-[60%] lg:w-[50%] rounded-2xl bg-white p-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex items-center justify-between h-10">
          <h1 className="text-xl font-semibold">Create Task</h1>
          <button
            onClick={() => setAddTask(false)}
            className="hover:scale-110 transition-all"
          >
            <CgClose size={20} />
          </button>
        </div>

        <hr className="w-full mt-2 border" />

        <div className="flex flex-col gap-2 mt-5">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="border-slate-300 border-2 px-3 py-2 w-[90%] rounded-lg"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            name="description"
            className="w-[90%] px-4 min-h-32 py-2 border-2 rounded-lg"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between mt-5 px-4">
          <div className="flex flex-col gap-2">
            <h6 className="text-sm font-semibold text-slate-500">
              Task Category
            </h6>
            <div className="flex items-center gap-2">
              {["Work", "Personal"].map((cat) => (
                <button
                  key={cat}
                  className={`text-xs lg:text-sm border px-4 lg:px-8 py-2 rounded-full ${
                    task.category === cat
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryChange(cat);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold text-slate-500">Due on*</h6>
              <input
                type="date"
                className="text-xs lg:text-sm border border-slate-400 px-2 rounded-lg py-1 text-slate-500"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold text-slate-500">
                Task Status*
              </h6>
              <select
                className="border text-xs lg:*:text-sm border-slate-400 px-2 py-1 rounded-lg text-slate-500"
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
              >
                <option value="">Choose</option>
                <option value="todo">TO-DO</option>
                <option value="inprogress">IN-PROGRESS</option>
                <option value="complete">COMPLETE</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <h1 className="text-lg font-medium text-slate-600">Attachments</h1>
          <button
            onClick={handleButtonClick}
            className="w-[90%] py-2 border-2 text-slate-500 font-semibold hover:underline border-slate-200 rounded-lg"
          >
            {task.attachment
              ? `Selected File: Task File`
              : `Drop your file here`}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {task?.attachment && (
          <div className="mx-5 my-5">
            <img
              className="w-32 h-32 border p-2"
              src={task?.attachment}
              alt="prev"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white mt-5 rounded-3xl py-2 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;

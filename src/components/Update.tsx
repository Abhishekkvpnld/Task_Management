import { useEffect, useRef, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import toast from "react-hot-toast";
import { useUser } from "../context/userContext";

type Data = {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: string;
  attachment: string;
};

const Update = () => {
  const navigate = useNavigate();
  const params = useParams();
  const docId: string | undefined = params.id;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useUser();

  const [data, setData] = useState<Data | null>(null);
  const [task, setTask] = useState<Data>({
    title: "",
    description: "",
    category: "Work",
    dueDate: "",
    status: "todo",
    attachment: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchDataById = async (docId: string) => {
    try {
      const docRef = doc(database, "task", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const taskData = docSnap.data() as Data;
        setData(taskData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  useEffect(() => {
    if (docId) {
      fetchDataById(docId);
    }
  }, [docId]);

  useEffect(() => {
    if (data) {
      setTask(data);
    }
  }, [data]);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docId) return;

    setLoading(true);
    try {
      const docRef = doc(database, "task", docId);
      await updateDoc(docRef, task);
      console.log("Document successfully updated!");
      toast.success("Task updated successfuly");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[100vw] flex items-center justify-center absolute min-h-[100vh] bg-white bg-opacity-70">
      <form
        onSubmit={handleUpdate}
        className="border shadow-lg mt-11 w-[80%]  md:w-[60%] lg:w-[50%] rounded-2xl bg-white p-4"
      >
        <div className="w-full flex items-center justify-between h-10">
          <h1 className="text-xl font-semibold">Update Your Task</h1>
          <HiHome
            onClick={() => navigate("/")}
            className="hover:scale-125 cursor-pointer transition-all"
            title="home"
          />
        </div>

        <hr className="w-full mt-2 border" />

        <div className="flex flex-col gap-2 mt-5">
          <input
            value={task.title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Task Title"
            className="border-slate-300 border-2 px-3 py-2 w-[90%] rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            name="description"
            className="w-[90%] px-4 min-h-32 py-2 border-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between mt-5 px-4">
          <div className="flex flex-col gap-2">
            <h6 className="text-sm font-semibold text-slate-500">
              Task Category
            </h6>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`text-xs lg:text-sm border px-4 lg:px-8 py-2 rounded-full ${
                  task.category === "Work"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
                onClick={() =>
                  setTask((prev) => ({ ...prev, category: "Work" }))
                }
              >
                Work
              </button>
              <button
                type="button"
                className={`text-xs lg:text-sm border px-4 lg:px-8 py-2 rounded-full ${
                  task.category === "Personal"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
                onClick={() =>
                  setTask((prev) => ({ ...prev, category: "Personal" }))
                }
              >
                Personal
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold text-slate-500">Due on*</h6>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="text-xs lg:text-sm border border-slate-400 px-2 rounded-lg py-1 text-slate-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold text-slate-500">
                Task Status*
              </h6>
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="border text-xs lg:*:text-sm border-slate-400 px-2 py-1 rounded-lg text-slate-500"
              >
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
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-[90%] py-2 border-2 text-slate-500 font-semibold hover:underline border-slate-200 rounded-lg"
          >
            Drop your file here or{" "}
            <span className="underline text-blue-600">Update</span>
          </button>
          <input type="file" ref={fileInputRef} className="hidden" />
        </div>

        {task.attachment && (
          <div className="mx-5 my-5">
            <img
              className="w-32 h-32 border p-2"
              src={task.attachment}
              alt="prev"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-5 rounded-3xl py-2 font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
          }`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Update;

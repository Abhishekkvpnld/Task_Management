import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin5Line, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

type Props = {
  data: {
    id: string;
    description: string;
    category: string;
    dueDate: string;
    status: string;
    attachment: string;
  };
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardCard = ({ data, setDelete }: Props) => {
  const [opt, setOpt] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (docId: string) => {
    if (!docId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      const docRef = doc(database, "task", docId);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
      setDelete((prev) => !prev);
      toast.success("Document successfully deleted!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error(error?.message);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("taskId", data?.id)}
      className="w-full rounded-lg min-h-28 bg-white mt-4 flex flex-col justify-between p-3"
    >
      <div className="flex items-center justify-between">
        <div>{data?.title}</div>
        <div
          className="text-xs relative"
          onClick={() => setOpt((prev) => !prev)}
        >
          <HiDotsHorizontal
            size={20}
            className="cursor-pointer hover:scale-105 transition-all"
          />
          {opt && (
            <div className="absolute  w-28 flex flex-col gap-2 bg-blue-100 py-2 text-xs shadow-md p-1 rounded-lg">
              <button
                onClick={() => navigate(`/update/${data?.id}`)}
                className="text-xs flex hover:scale-105 transition-all items-center justify-center gap-3"
              >
                <RiEdit2Fill size={15} /> Edit
              </button>
              <button
                onClick={() => handleDelete(data?.id)}
                className="text-xs flex items-center hover:text-red-600 justify-center hover:scale-105 transition-all gap-3"
              >
                <RiDeleteBin5Line size={15} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 text-slate-500">
        <div className="text-xs">{data?.category}</div>
        <div className="text-xs">{data?.dueDate}</div>
      </div>
    </div>
  );
};

export default BoardCard;

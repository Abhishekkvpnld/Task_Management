import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RiDraggable } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";


type Props = {
  id:string
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: string;
  attachment: string;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>
};


const ListCard = ({data,setDelete}:Props) => {
  const [opt, setOpt] = useState(false);
  const navigate = useNavigate();



  const handleDelete = async (docId) => {
    if (!docId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const docRef = doc(database, "task", docId);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
      setDelete((prev)=>!prev)
      toast.success("Document successfully deleted!")
      navigate("/");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error(error?.message)
    }
  };

  return (
    <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] hover:shadow-lg hover:bg-white gap-1 items-center px-2 border-b border-slate-300 py-2 w-full">
      {/* Title Section */}
      <div className="flex text-xs items-center gap-1 w-full">
        <MdOutlineCheckBoxOutlineBlank size={20} className="text-slate-400" />
        <RiDraggable size={20} className="text-slate-600" />
        <IoIosCheckmarkCircleOutline
          size={20}
          className="text-slate-500 mr-2"
        />
        <h1>{data?.title}</h1>
      </div>

      {/* Date Section */}
      <div className="text-xs w-full text-center">{data?.dueDate}</div>

      {/* Status Dropdown */}
      <div className="text-xs w-full text-center">
        <select value={data?.status} className="bg-slate-300 py-2 px-2 rounded-lg w-full">
          <option value="todo">TO-DO</option>
          <option value="progress">IN-PROGRESS</option>
          <option value="completed">COMPLETED</option>
        </select>
      </div>

      {/* Category Section */}
      <div className="text-xs w-full text-center">{data?.category}</div>

      {/* Options Section */}
      <div
        className="text-xs w-full relative flex items-center justify-center"
        onClick={() => setOpt((prev) => !prev)}
      >
        <HiDotsHorizontal
          size={20}
          className="cursor-pointer hover:scale-105 transition-all"
        />
        {opt && (
          <div className="absolute mt-20 w-[60%] flex flex-col z-20 gap-2 bg-white py-2 text-xs shadow-md p-1 rounded-lg">
            <button onClick={()=>navigate(`/update/${data?.id}`)} className="text-xs flex hover:scale-105 transition-all items-center justify-center gap-3">
              <RiEdit2Fill size={15} /> Edit
            </button>
            <button onClick={()=>handleDelete(data?.id)} className="text-xs flex items-center hover:text-red-600 justify-center hover:scale-105 transition-all gap-3">
              <RiDeleteBin5Line size={15} /> Delete
            </button>
          </div>
        )} 
      </div>
    </div>
  );
};

export default ListCard;

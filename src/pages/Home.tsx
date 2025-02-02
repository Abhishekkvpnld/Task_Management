import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeMenu from "../components/HomeMenu";
import Section from "../components/Section";
import SectionBoard from "../components/SectionBoard";
import Create from "../components/Create";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { database } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { useUpdateDocument } from "../api/useFirebaseApi";

type Data = {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: string;
  attachment: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: string;
  attachment: string;
};

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [list, setList] = useState<boolean>(true);
  const [addTask, setAddTask] = useState<boolean>(false);
  const [data, setData] = useState<Task[]>([]);
  const [deleteDoc, setDeleteDoc] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);

  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [drop, setDrop] = useState(false);

  console.log(data, "✅✅✅✅✅");

  const { mutate: updateTaskStatus } = useUpdateDocument("task");

  const handleDrop = (taskId: string, newStatus: string) => {
    if (!taskId || !newStatus) return;

    updateTaskStatus(
      { id: taskId, data: { status: newStatus } },
      {
        onSuccess: () => {
          setDrop((prev) => !prev);
          console.log("Document successfully updated!");
          toast.success("Task updated successfully");
        },
        onError: (error: unknown) => {
          toast.error((error as Error).message || "Error updating task.");
          console.error("Error updating document:", error);
        },
      }
    );
  };

  useEffect(() => {
    if (search) {
      const searchData = data.filter((doc: Data) =>
        doc.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(searchData);
    } else {
      setFilteredData(data);
    }
  }, [search, data]);

  useEffect(() => {
    const getData = async () => {
      try {
        const dbCollection = collection(database, "task");
        const res = await getDocs(dbCollection);
        const fetchData: Task[] = res?.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Task[];
        setData(fetchData);
      } catch (error: unknown) {
        console.log((error as Error).message);
      }
    };
    getData();
  }, [deleteDoc, create, drop]);

  useEffect(() => {
    let updatedData = [...data];

    if (category) {
      updatedData = updatedData.filter((dc: Data) => dc?.category === category);
    }

    if (filter) {
      updatedData.sort((a: Data, b: Data) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return filter === "ascending" ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredData(updatedData);
  }, [category, filter, data]);

  const todo = filteredData?.filter((dc: Data) => dc?.status === "todo");
  const inProgress = filteredData?.filter(
    (dc: Data) => dc?.status === "inprogress"
  );
  const complete = filteredData?.filter(
    (dc: Data) => dc?.status === "complete"
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="px-3 flex flex-col items-center">
      <Navbar setList={setList} list={list} />
      <HomeMenu
        setFilter={setFilter}
        filter={filter}
        setCategory={setCategory}
        category={category}
        setAddTask={setAddTask}
        setSearch={setSearch}
        search={search}
      />

      {list ? (
        <>
          <div className="w-[80%] grid grid-cols-3 md:grid-cols-[2fr,1fr,1fr,1fr,1fr] mt-7">
            <h6 className="font-semibold text-slate-500">Task</h6>
            <h6 className="font-semibold hidden md:block text-slate-500">
              Due Date
            </h6>
            <h6 className="font-semibold text-slate-500">Status</h6>
            <h6 className="font-semibold hidden md:block text-slate-500">
              Category
            </h6>
            <h6 className="font-semibold text-slate-500">Actions</h6>
          </div>

          <Section
            bgColor="bg-pink-400"
            addTask={true}
            data={todo}
            title="TO-DO"
            setDelete={setDeleteDoc}
            setAddTask={setAddTask}
            handleDrop={handleDrop}
          />
          <Section
            bgColor="bg-blue-300"
            addTask={false}
            data={inProgress}
            title="IN-PROGRESS"
            setDelete={setDeleteDoc}
            setAddTask={setAddTask}
            handleDrop={handleDrop}
          />
          <Section
            bgColor="bg-green-400"
            addTask={false}
            data={complete}
            title="COMPLETED"
            setDelete={setDeleteDoc}
            setAddTask={setAddTask}
            handleDrop={handleDrop}
          />
        </>
      ) : (
        <>
          <div className="hidden md:grid gap-3 grid-cols-3 p-3 w-[100vw] px-10">
            <SectionBoard
              setDelete={setDeleteDoc}
              bgColor="bg-pink-400"
              title="TO-DO"
              data={todo}
              handleDrop={handleDrop}
            />
            <SectionBoard
              setDelete={setDeleteDoc}
              bgColor="bg-blue-300"
              title="IN-PROGRESS"
              data={inProgress}
              handleDrop={handleDrop}
            />
            <SectionBoard
              setDelete={setDeleteDoc}
              bgColor="bg-green-400"
              title="COMPLETED"
              data={complete}
              handleDrop={handleDrop}
            />
          </div>

          <div className="md:hidden flex items-center justify-center flex-col">
            <div className="w-[80%] grid grid-cols-3 md:grid-cols-[2fr,1fr,1fr,1fr,1fr] mt-7">
              <h6 className="font-semibold text-slate-500">Task</h6>
              <h6 className="font-semibold hidden md:block text-slate-500">
                Due Date
              </h6>
              <h6 className="font-semibold text-slate-500">Status</h6>
              <h6 className="font-semibold hidden md:block text-slate-500">
                Category
              </h6>
              <h6 className="font-semibold text-slate-500">Actions</h6>
            </div>

            <Section
              bgColor="bg-pink-400"
              addTask={true}
              data={todo}
              title="TO-DO"
              setDelete={setDeleteDoc}
              setAddTask={setAddTask}
              handleDrop={handleDrop}
            />
            <Section
              bgColor="bg-blue-300"
              addTask={false}
              data={inProgress}
              title="IN-PROGRESS"
              setDelete={setDeleteDoc}
              setAddTask={setAddTask}
              handleDrop={handleDrop}
            />
            <Section
              bgColor="bg-green-400"
              addTask={false}
              data={complete}
              title="COMPLETED"
              setDelete={setDeleteDoc}
              setAddTask={setAddTask}
              handleDrop={handleDrop}
            />
          </div>
        </>
      )}

      {addTask && <Create setCreate={setCreate} setAddTask={setAddTask} />}
    </div>
  );
};

export default Home;

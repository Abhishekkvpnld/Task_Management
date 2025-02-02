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


type Data = {
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
  const [data, setData] = useState<any>([]);
  const [deleteDoc, setDeleteDoc] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);

  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState("");


useEffect(() => {
  if (search) {
    const searchData = data.filter((doc:Data) => 
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
        const fetchData = res?.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(fetchData);
      } catch (error: unknown) {
        console.log(error?.message);
      }
    };
    getData();
  }, [deleteDoc, create]);

  useEffect(() => {
    let updatedData = [...data];

    if (category) {
      updatedData = updatedData.filter((dc) => dc?.category === category);
    }

    if (filter) {
      updatedData.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return filter === "ascending" ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredData(updatedData);
  }, [category, filter, data]);

  const todo = filteredData?.filter((dc) => dc.status === "todo");
  const inProgress = filteredData?.filter((dc) => dc.status === "inprogress");
  const complete = filteredData?.filter((dc) => dc.status === "complete");

  if (!user) {
    return navigate("/login");
  }

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
          <Section
            bgColor="bg-pink-400"
            addTask={true}
            data={todo}
            title="TO-DO"
            setDelete={setDeleteDoc}
          />
          <Section
            bgColor="bg-blue-300"
            addTask={false}
            data={inProgress}
            title="IN-PROGRESS"
            setDelete={setDeleteDoc}
          />
          <Section
            bgColor="bg-green-400"
            addTask={false}
            data={complete}
            title="COMPLETED"
            setDelete={setDeleteDoc}
          />
        </>
      ) : (
        <div className="grid gap-3 grid-cols-3 p-3 w-[100vw] px-10">
          <SectionBoard
            setDelete={setDeleteDoc}
            bgColor="bg-pink-400"
            title="TO-DO"
            data={todo}
          />
          <SectionBoard
            setDelete={setDeleteDoc}
            bgColor="bg-blue-300"
            title="IN-PROGRESS"
            data={inProgress}
          />
          <SectionBoard
            setDelete={setDeleteDoc}
            bgColor="bg-green-400"
            title="COMPLETED"
            data={complete}
          />
        </div>
      )}

      {addTask && <Create setCreate={setCreate} setAddTask={setAddTask} />}
    </div>
  );
};

export default Home;

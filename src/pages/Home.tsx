import Navbar from "../components/Navbar";
import HomeMenu from "../components/HomeMenu";
import Section from "../components/Section";
import SectionBoard from "../components/SectionBoard";
import { useState } from "react";

const Home = () => {
  const [list, setList] = useState(true);

  return (
    <div className="px-3 flex flex-col items-center">
      <Navbar setList={setList} />
      <HomeMenu />

      {list ? (
        <>
          <Section
            bgColor={"bg-pink-400"}
            addTask={true}
            data={[]}
            title="TO-DO"
          />
          <Section
            bgColor={"bg-blue-300"}
            addTask={false}
            data={[]}
            title="IN-PROGRESS"
          />
          <Section
            bgColor={"bg-green-400"}
            addTask={false}
            data={[]}
            title="COMPLETED"
          />
        </>
      ) : (
        <div className="grid gap-3 grid-cols-3 p-3 w-[100vw] px-10">
          <SectionBoard bgColor={"bg-pink-400"} title="TO-DO" data={[]} />
          <SectionBoard bgColor={"bg-blue-300"} title="IN-PROGRESS" data={[]} />
          <SectionBoard bgColor={"bg-green-400"} title="COMPLETED" data={[]} />
        </div>
      )}
    </div>
  );
};

export default Home;

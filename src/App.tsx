import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Update from "./components/Update";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="*" element={<Login />} />
      </Routes>
        <Toaster position="top-center"/>
    </Router>
  );
};

export default App;

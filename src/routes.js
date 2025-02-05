import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Url from "./components/Url";



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Url />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;

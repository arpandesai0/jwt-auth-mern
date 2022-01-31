import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import axios from "axios";
function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem("intern-token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

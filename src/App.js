import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import ReactLoading from "react-loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <div className="App">
      {!loading ? (
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      ) : (
        <div className="react-loading">
          <h4>
            Welcome <span>to Zinaria</span>
          </h4>
          <ReactLoading
            type={"cylon"}
            color={"#fff"}
            height={100}
            width={100}
          />
        </div>
      )}
    </div>
  );
}

export default App;

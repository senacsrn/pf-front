import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Feed from "./components/Feed";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route
            path="/dashboard/*"
            element={
              <Dashboard>
                <Routes>
                  <Route path="feed" element={<Feed />} />
                  <Route path="search" element={<>search</>} />
                  <Route path="profile" element={<>profile</>} />
                </Routes>
              </Dashboard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

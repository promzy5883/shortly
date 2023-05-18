import SignUp from "./components/SignUp";
import Landing from "./landing";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { MemoryRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;

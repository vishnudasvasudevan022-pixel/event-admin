import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EventForm from "./components/EventForm.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<EventForm />} />
          <Route path="/edit/:id" element={<EventForm />} />
        </Routes>
      </main>
    </>
  );
}

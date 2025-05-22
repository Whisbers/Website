import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Animate from "./pages/Animate";
import Download from "./pages/Download";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animate" element={<Animate />} />
      <Route path="/download" element={<Download />} />
    </Routes>
  );
}
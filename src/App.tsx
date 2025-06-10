import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Animate from "./pages/Animate";
import Contributors from "./pages/Contributors";
import Download from "./pages/Download";
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animate" element={<Animate />} />
      <Route path="/download" element={<Download />} />
      <Route path="/contributors" element= {<Contributors />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
}
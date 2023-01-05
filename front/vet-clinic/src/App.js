import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Routes, Route } from "react-router-dom";
import View from "./Pages/View";
import Operations from "./Pages/Operations";
import InsertAnimal from "./Pages/InsertAnimal";

export const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/view" element={<View />} />
      <Route path="/operations" element={<Operations />} />
      <Route path="/insertanimal" element={<InsertAnimal />} />
    </Routes>
  );
};

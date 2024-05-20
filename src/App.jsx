import React from "react";
import { Route, Routes } from "react-router-dom";

import ListParkingSpaces from "./pages/ListParkingSpaces";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListParkingSpaces />} />
    </Routes>
  );
}

export default App;

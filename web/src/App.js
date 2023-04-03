import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Error404 from "./pages/Error";
import Home from "./pages/Home";
import Keys from "./pages/Keys";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/keys" element={<Keys />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

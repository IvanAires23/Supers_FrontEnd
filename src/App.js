import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";

import { Header } from "./components";
import Login from "./components/Login/Login";
import Registration from "./components/Register/Register";
import { Home, FullPost, AddPost } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

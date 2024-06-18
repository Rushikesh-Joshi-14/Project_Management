import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/Login";
import Dashboard from "./components/dashboard"; 
import List from "./components/list"; 
import Main from "./components/main"; 
import { ChakraProvider } from "@chakra-ui/react";


function App() {
  const user = localStorage.getItem("token");

  return (
    <ChakraProvider>
    <Routes>
      {user ? (
        <>
          <Route path="/" exact element={<Dashboard />} />
		  <Route path="/Dashboard" exact element={<Dashboard />} />
          <Route path="/project-list" exact element={<List />} />
          <Route path="/create-project" exact element={<Main />} />
        </>
      ) : (
        <>
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
    </ChakraProvider>
  );
}

export default App;

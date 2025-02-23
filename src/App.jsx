import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Write from "../pages/Write";
import Blogs from "../pages/Blogs";
import Register from "../pages/Register";
import React from "react";

export const App = () => {
  const [signedIn, setLog] = React.useState(
    JSON.parse(localStorage.getItem("signedIn")) || false
  );
  const [userName, setName] = React.useState(
    localStorage.getItem("userName") || null
  );

  React.useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  React.useEffect(() => {
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [signedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Home
              userName={userName}
              signedIn={signedIn}
              setName={setName}
              setLog={setLog}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              userName={userName}
              signedIn={signedIn}
              setName={setName}
              setLog={setLog}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              userName={userName}
              signedIn={signedIn}
              setName={setName}
              setLog={setLog}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              userName={userName}
              signedIn={signedIn}
              setName={setName}
              setLog={setLog}
            />
          }
        />
        <Route
          path="/write"
          element={
            <Write
              userName={userName}
              signedIn={signedIn}
              setName={setName}
              setLog={setLog}
            />
          }
        />
        <Route
          path="/blogs"
          element={
            <Blogs
              userName={userName}
              signedIn={signedIn}
              setName={setName}
              setLog={setLog}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Register
              state={true}
              page="login"
              userName={userName}
              signedIn={signedIn}
              setName={setName}
              setLog={setLog}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              state={false}
              page="signup"
              setName={setName}
              userName={userName}
              signedIn={signedIn}
              setLog={setLog}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { motion } from "framer-motion";
// import google from "../src/assets/google.svg";
import PropTypes from "prop-types";
import axios from "axios";

const Register = (props) => {
  const [hover, setHover] = React.useState(props.state);
  const [selectedSection, setSelectedSection] = React.useState(props.page);

  const [loginData, setLoginData] = React.useState({ email: "", password: "" });
  const [registerData, setRegisterData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(section) {
    if (selectedSection !== section) {
      setHover(!hover);
      setSelectedSection(section);
    }
  }

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        loginData,
        { withCredentials: true }
      );
      props.setName(response.name);
      props.setLog(true);
      console.log("Server Response:");
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Invalid email or password");
      window.location.href = "/login";
    }
  };

  const handleSignup = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        registerData,
        { withCredentials: true }
      );
      props.setName(data.name);
      props.setLog(true);
      console.log("Signup successful:");
      alert("Signup successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Signup failed.";
      console.error("Signup failed:", errorMsg);
      alert(errorMsg);
      window.location.href = "/register";
    }
  };

  const loginStyle = { backgroundColor: "#d69ade" };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        userName={props.userName}
        signedIn={props.signedIn}
        setName={props.setName}
        setLog={props.setLog}
      />
      <div className="flex flex-col flex-row flex-grow justify-center items-center">
        <div className="relative w-250 h-180 flex backdrop-blur border-2 border-purple-800 rounded-lg m-10 p-4">
          <motion.div
            className="w-109 h-164 m-4 p-4 absolute rounded-lg z-1"
            style={loginStyle}
            animate={{ x: hover ? 0 : 500 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <div
            className="w-109 h-164 flex flex-col rounded-lg m-4 p-4 justify-center items-center login z-10 font"
            onClick={() => handleChange("login")}
            style={{ color: hover ? "#AA60C8" : null }}
          >
            <h3 style={{ fontSize: 30 }} className="p-5">
              Welcome Back!
            </h3>
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="flex flex-col">
                <label className="p-2 m-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  style={{ backgroundColor: "#AA60C8", color: "white" }}
                  className="rounded-md m-1 p-2"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
                <label className="p-2 m-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  style={{ backgroundColor: "#AA60C8", color: "white" }}
                  className="rounded-md m-1 p-2"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
              <button
                className="rounded-lg py-2 px-4 m-4 font login"
                style={{
                  backgroundColor: "#AA60C8",
                  color: "white",
                }}
              >
                Login
              </button>
            </form>
            {/* <a
              href="http://localhost:4000/auth/google/login"
              className="p-1 m-2 rounded-lg border border-purple-800 flex justify-center items-center mt-auto"
              style={{
                backgroundColor: "#FFDFEF",
                color: "#AA60C8",
              }}
            >
              <img className="icon h-10 w-10 m-2" src={google} alt="logo" />
              <p>Sign in With Your Google Account</p>
            </a> */}
          </div>
          <div className="h-164 rounded-full m-4 border-2 border-purple-800 z-10"></div>
          <div
            className="w-109 h-164 flex flex-col rounded-lg m-4 p-4 justify-center items-center login z-10 font"
            onClick={() => handleChange("signup")}
            style={{
              color: !hover ? "#AA60C8" : null,
            }}
          >
            <h3 style={{ fontSize: 30 }} className="p-5">
              Join us Today!
            </h3>
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              <div className="flex flex-col">
                <label className="p-2 m-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  style={{ backgroundColor: "#AA60C8", color: "white" }}
                  className="rounded-md m-1 p-2"
                  value={registerData.name}
                  onChange={handleSignupChange}
                />
                <label className="p-2 m-1">Email</label>
                <input
                  type="text"
                  name="email"
                  required
                  style={{ backgroundColor: "#AA60C8", color: "white" }}
                  className="rounded-md m-1 p-2"
                  value={registerData.email}
                  onChange={handleSignupChange}
                />
                <label className="p-2 m-1">Password</label>
                <input
                  type="password"
                  name="password"
                  minLength="6"
                  required
                  style={{ backgroundColor: "#AA60C8", color: "white" }}
                  className="rounded-md m-1 p-2"
                  value={registerData.password}
                  onChange={handleSignupChange}
                />
              </div>
              <button
                className="rounded-lg py-2 px-4 m-4 font login"
                style={{
                  backgroundColor: "#AA60C8",
                }}
              >
                Sign Up
              </button>
            </form>
            {/* <a
              href="http://localhost:4000/auth/google"
              className="p-1 m-2 rounded-lg border border-purple-800 flex justify-center items-center mt-auto"
              style={{
                backgroundColor: "#FFDFEF",
                color: "#AA60C8",
              }}
            >
              <img className="icon h-10 w-10 m-2" src={google} alt="logo" />
              <p>Sign up With Your Google Account</p>
            </a> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

Register.propTypes = {
  state: PropTypes.bool,
  page: PropTypes.string.isRequired,
  userName: PropTypes.string,
  setName: PropTypes.func,
  signedIn: PropTypes.bool,
  setLog: PropTypes.func,
};

export default Register;

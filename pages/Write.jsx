import React from "react";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import axios from "axios";
import PropTypes from "prop-types";
import Background from "../src/components/Background";

const API_URL = "http://localhost:4000";
// const API_URL = "https://writography-v-2.onrender.com";

const Write = (props) => {
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (!props.signedIn) {
      alert("Sign up first to write a blog!");
      window.location.href = "/login";
    }
  }, [props.signedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/post`, formData);
      alert("Blog submitted successfully!");
      setFormData({ title: "", content: "" });
    } catch (err) {
      console.error("Error submitting blog:", err);
      alert("Error submitting blog. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Background />
      <Navbar
        userName={props.userName}
        signedIn={props.signedIn}
        setName={props.setName}
        setLog={props.setLog}
      />
      <div className="flex flex-col flex-grow justify-center items-center p-4">
        <div className="container-write flex flex-col w-full max-w-2xl mt-10 p-6 backdrop-blur border border-purple-800 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-purple-700 font">
            Write a Blog
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 flex flex-col">
              <label className="font">Title</label>
              <input
                type="text"
                className="font m-2 p-2 rounded-lg"
                name="title"
                placeholder="Blog title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ backgroundColor: "#AA60C8", color: "white" }}
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label className="font">Blog</label>
              <textarea
                className="font m-2 p-2 rounded-lg"
                name="content"
                rows="10"
                placeholder="Write your blog here"
                value={formData.content}
                onChange={handleChange}
                required
                style={{ backgroundColor: "#AA60C8", color: "white" }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded-lg py-2 px-6 m-4 font-bold text-white bg-purple-600 w-full font"
              style={{ color: "white" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

Write.propTypes = {
  userName: PropTypes.string,
  signedIn: PropTypes.bool,
  setName: PropTypes.func,
  setLog: PropTypes.func,
};

export default Write;

import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = "http://localhost:4000";

const Post = (props) => {
  const [formData, setFormData] = React.useState({
    content: props.content || "",
  });
  const [isEditing, setIsEditing] = React.useState(false); // Track edit mode

  const deleteBlog = async () => {
    try {
      await axios.delete(`${API_URL}/user_posts`);
      console.log("Post deleted");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/user_posts`, formData);
      console.log("Post edited successfully");
      setIsEditing(false);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };

  return (
    <div className="card shadow-md rounded-3xl p-4">
      <h2
        className="font card-heading text-lg font-bold py-3 px-5 mx-1 my-1 rounded-2xl"
        style={{ color: "#FFDFEF" }}
      >
        {props.title}
      </h2>
      <p className="font text-gray-500 py-3 px-5 mx-1 my-1">{props.content}</p>

      {props.user && (
        <div className="flex p-2 m-2">
          <button
            className="rounded-lg py-1 px-2 m-2 font"
            style={{ backgroundColor: "#aa60c8", color: "white" }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          <button
            className="rounded-lg py-1 px-2 m-2 font"
            style={{ backgroundColor: "#aa60c8", color: "white" }}
            onClick={deleteBlog}
          >
            Delete
          </button>
        </div>
      )}
      {isEditing && (
        <form onSubmit={editBlog} className="mt-2">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="mt-2 rounded-lg py-1 px-2 font"
            style={{ backgroundColor: "#aa60c8", color: "white" }}
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  user: PropTypes.bool,
};

export default Post;

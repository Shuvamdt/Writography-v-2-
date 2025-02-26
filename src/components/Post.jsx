import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = "http://localhost:4000";

const Post = (props) => {
  const [formData, setFormData] = React.useState({
    content: props.content || "",
  });
  const [isEditing, setIsEditing] = React.useState(false);

  const deleteBlog = async () => {
    try {
      await axios.delete(`${API_URL}/user_posts/${props.post_id}`);
      console.log("Post deleted");
      props.refreshPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editBlog = async (e) => {
    e.preventDefault();
    if (formData.content === props.content) {
      setIsEditing(false);
      return;
    }
    try {
      await axios.patch(`${API_URL}/user_posts/${props.post_id}`, {
        content: formData.content,
      });
      console.log("Post edited successfully");
      setIsEditing(false);
      props.refreshPosts();
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };

  return (
    <div className="card shadow-md rounded-3xl p-4">
      <div
        className="flex font card-heading text-lg font-bold py-3 px-5 mx-1 my-1 rounded-2xl relative"
        style={{ color: "#FFDFEF" }}
      >
        <h2 style={{ fontSize: 20 }}>{props.title}</h2>
        <h6
          className="absolute top-0 right-0 mt-8 mx-3"
          style={{ fontSize: 13, color: "#D69ADE" }}
        >
          {props.date}
        </h6>
      </div>
      <p className="font text-gray-500 py-3 px-5 mx-1 my-1">
        {isEditing ? formData.content : props.content}
      </p>

      {props.user && (
        <div className="flex p-2 m-2">
          <button
            className="rounded-lg py-1 px-2 m-2 font transition duration-300 hover:opacity-80"
            style={{ backgroundColor: "#aa60c8", color: "white" }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          <button
            className="rounded-lg py-1 px-2 m-2 font transition duration-300 hover:opacity-80"
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
            className="w-full p-2 border border-gray-300 rounded-lg font"
            style={{ color: "#aa60c8" }}
          />
          <button
            type="submit"
            className="mt-2 rounded-lg py-1 px-2 font transition duration-300 hover:opacity-80"
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
  date: PropTypes.string,
  user: PropTypes.bool,
  post_id: PropTypes.number.isRequired,
  refreshPosts: PropTypes.func.isRequired,
};

export default Post;

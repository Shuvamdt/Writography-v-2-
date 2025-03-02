import React from "react";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Post from "../src/components/Post";
import axios from "axios";
import PropTypes from "prop-types";
import Background from "../src/components/Background";

// const API_URL = "http://localhost:4000";
const API_URL = "https://writography-v-2.onrender.com";

const Blogs = (props) => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setPosts(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Background />
      <Navbar
        userName={props.userName}
        signedIn={props.signedIn}
        setName={props.setName}
        setLog={props.setLog}
      />
      <div className="flex-grow px-10 py-10">
        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Post
                  key={index}
                  post_id={post.id}
                  title={post.title}
                  content={post.blog}
                  date={post.date}
                  user={false}
                />
              ))
            ) : (
              <p className="col-span-full text-center">No posts available.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

Blogs.propTypes = {
  userName: PropTypes.string,
  signedIn: PropTypes.bool,
  setName: PropTypes.func,
  setLog: PropTypes.func,
};

export default Blogs;

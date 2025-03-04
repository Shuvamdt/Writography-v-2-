import React from "react";
import Post from "../src/components/Post";
import axios from "axios";
import PropTypes from "prop-types";

//const API_URL = "http://localhost:4000";
const API_URL = "https://writography-v-2.vercel.app";

const Dashboard = ({ signedIn }) => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!signedIn) {
      alert("Sign up first to get access to your dashboard!");
      window.location.href = "/login";
    }
  }, [signedIn]);

  const fetchPosts = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user_posts`);
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center flex-grow px-10 py-10">
        {loading ? (
          <img
            src="../src/assets/loading.gif"
            alt="Loading..."
            className="w-16 h-16"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Post
                  key={index}
                  post_id={post.id}
                  title={post.title}
                  date={post.date}
                  content={post.blog}
                  user={true}
                  refreshPosts={fetchPosts}
                />
              ))
            ) : (
              <p className="col-span-full text-center">No posts available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  userName: PropTypes.string,
  signedIn: PropTypes.bool,
  setName: PropTypes.func,
  setLog: PropTypes.func,
};

export default Dashboard;

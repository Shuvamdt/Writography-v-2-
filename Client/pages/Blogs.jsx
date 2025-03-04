import React from "react";
import Post from "../src/components/Post";
import axios from "axios";
//const API_URL = "http://localhost:4000";
const API_URL = "https://writography-v-2.vercel.app/";

const Blogs = () => {
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
    </div>
  );
};

export default Blogs;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../server/request";

const MyPostsP = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get(`post/lastones`);
        let filteredPosts = data.filter((post) => {
          const postTitle = post.title.toLowerCase();
          const postDescription = post.description.toLowerCase();
          const query = searchQuery.toLowerCase();
          return postTitle.includes(query) || postDescription.includes(query);
        });
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err.response);
      }
    }
    getPosts();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="slider">
      <div className="container">
        <div className="slider-paragraph">
          <input
            type="text"
            placeholder="Searching . . ."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <h2>All posts</h2>
        </div>
        <div className="owl-carousel">
          <div className="boxs">
            {currentPosts.map((post, i) => (
              <div key={i}>
                <div className="container">
                  <div className="box-posts">
                    <div className="box-left-posts">
                      <Link to={`/posts/${post._id}`} state={{ post }}>
                        <img
                          src="https://th.bing.com/th/id/OIP.VnRZrnefIDh77ZWmSB9JVwHaEB?pid=ImgDet&rs=1"
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="box-right-posts">
                      <Link to={`/posts/${post._id}`} state={{ post }}>
                        <p className="p-4">{post.title.slice(0, 15)}</p>
                        <h3>{post.title.slice(0, 15)}</h3>
                        <p className="p-5">{post.description.slice(0, 15)}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default MyPostsP;

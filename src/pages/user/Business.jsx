import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../server/request";

const MyPostsP = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const albumId = JSON.parse(localStorage.getItem("ID"));

  const postsPerPage = 5;

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get(`/post?category=${albumId}`);
        let newDate = data.data;
        let filteredPosts = newDate.filter((post) => {
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
  }, [searchQuery, albumId]);

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
    <section id="slider-2">
      <div className="business-about-txt">
        <h1>Business</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br />
          eiusmod tempor incididunt ut labore.
        </p>
        <Link to={"/"}> Blog {">"} Business</Link>
      </div>
      <div className="container">
        <div className="slider-paragraph">
          <input
            type="text"
            placeholder="Searching . . ."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="owl-carousel">
          <div className="boxs">
            {currentPosts.map((post, i) => (
              <div key={i}>
                <div className="container">
                  <div className="box">
                    <div className="box-left">
                      <Link to={`/posts/${post._id}`} state={{ post }}>
                        <img
                          src="https://assets-global.website-files.com/5fadbaade48cca559c0b3868/5ff38ff20e4f30233b460e91_FS_banner_02_1.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="box-right">
                      <Link to={`/posts/${post._id}`} state={{ post }}>
                        <p className="p-4">{post.category.name}</p>
                        <h1>{post.title}</h1>
                        <p className="p-5">{post.category.description}</p>
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

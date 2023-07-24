import { useLocation } from "react-router-dom";

const PostP = () => {
  const location = useLocation();
  const post = location.state?.post;

  return (
    <div className="container">
      {post && (
        <div className="post-about-txt">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      )}
    </div>
  );
};

export default PostP;

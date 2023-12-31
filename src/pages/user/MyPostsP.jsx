import { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { request } from "../../server/request";

const MyPostsP = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = async (values) => {
    try {
      const { name, id, image, description } = values.user;

      // Post yaratish uchun ma'lumotlarni olishdan oldin modalni yopish
      setIsModalOpen(false);

      // Post yaratish uchun serverga so'rov jo'natish
      const response = await request.post(
        "https://blog-backend-production-a0a8.up.railway.app/api/v1/post",
        {
          title: name,
          id,
          imageUrl: image,
          description,
        }
      );

      // Yangi post ma'lumotlari
      const newPostData = response.data;

      // Yangi postni sahifada ko'rsatish uchun listga qo'shish
      setPosts((prevPosts) => [...prevPosts, newPostData]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get(
          "https://blog-backend-production-a0a8.up.railway.app/api/v1/post/lastones"
        );
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
    <div className="container">
      <div className="my-post-add">
        <h1>My posts</h1>
        <Fragment>
          <Button type="primary" onClick={showModal}>
            Add post
          </Button>
          <Modal
            title="Add post"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Add"
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
          >
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                name={["user", "name"]}
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Title !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "id"]}
                label="ID"
                rules={[
                  {
                    required: true,
                    message: "Please input your ID !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "image"]}
                label="Image"
                rules={[
                  {
                    required: true,
                    message: "Please input your img Url !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name={["user", "description"]} label="Description">
                <Input.TextArea placeholder="comment" />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Fragment>
      </div>
      <section id="slider">
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
                    <div className="box-myPost">
                      <div className="box-left-myPost">
                        <Link to={`/posts/${post._id}`} state={{ post }}>
                          <img
                            src={
                              "https://mir-s3-cdn-cf.behance.net/user/276/94bec534419777.5d1cd5aa6d787.png"
                            }
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="box-right-myPost">
                        <Link to={`/posts/${post._id}`} state={{ post }}>
                          <p className="p-4">{post.title}</p>
                          <h3>{post.title}</h3>
                          <p className="p-5">
                            {post.description}
                          </p>
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
    </div>
  );
};

export default MyPostsP;



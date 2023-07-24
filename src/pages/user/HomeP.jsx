import { Image } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import { request } from "../../server/request";
import { Link } from "react-router-dom";

const HomeP = () => {
  const [posts, setPosts] = useState([]);
  const [catigory, setCatigory] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get("post/lastones");
        setPosts(data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getPosts();
  }, []);

  console.log(posts);

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get("category");
        const category1 = data.data;

        setCatigory(category1);
      } catch (err) {
        console.log(err.response);
      }
    }
    getPosts();
  }, []);

  console.log(catigory);

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var settings1 = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function ThisCategory(id) {
    localStorage.setItem("ID", JSON.stringify(id));
  }
  return (
    <Fragment>
      <section id="home">
        <div className="container">
          <Slider {...settings1}>
            {posts.map((pr) => (
              <div key={pr}>
                <div className="home-container">
                  <h4>{pr.title}</h4>
                  <h1>Step-by-step guide to choosing great font pairs</h1>
                  <h5>
                    By <span> {pr.title}</span> | {pr.updatedAt.split("T")[0]}
                  </h5>
                  <p>{pr.description}</p>
                  <div className="btn">
                    <button>Read Mor </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <div className="carucel container">
        <h1 className="popular"> Popular blogs </h1>
        <Slider {...settings}>
          {posts.map((pr) => (
            <div key={pr}>
              <Card style={{ width: "18rem" }} className="line-clamp">
                <Image src="https://uploads-ssl.webflow.com/5cc19611198b8d7bdfc5fcfb/5cdffa66e7b579ef71ab3204_webflow-FEATURED-gif.gif" />
                <Card.Body>
                  <p>{pr.updatedAt.split("T")[0]}</p>
                  <Card.Title>{pr.title}</Card.Title>
                  <Card.Text>{pr.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      <section id="contact">
        <div className="container">
          <div className="contact-top">
            <h1>Choose A Category</h1>
          </div>

          <div className="contact-row">
            {catigory.slice(0, 4).map((pr, i) => (
              <div key={i}>
                <Link onClick={() => ThisCategory(pr._id)} to={`/business`}>
                  <div className="contact-card">
                    <div className="card-img">
                      <img
                        src={`https://freepngimg.com/download/business/70298-management-business-icons-consultant-company-social-marketing.png`}
                        alt=""
                      />
                    </div>
                    <h1>{pr.name} </h1>
                    <p>{pr.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomeP;

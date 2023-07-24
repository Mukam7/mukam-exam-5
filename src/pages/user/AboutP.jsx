import peoplesArms from "../../assets/images/people-arms.png";
import peoples_box from "../../assets/images/peoples.png";

const AboutP = () => {
  return (
    <section>
      <div className="container">
        <div className="about-txt">
          <div className="about-txt-left">
            <span>Our mision</span>
            <h1>Creating valuable content for creatives all around the</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
          <div className="about-txt-right">
            <span>Our Vision</span>
            <h1>A platform that empowers individuals to improve</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
        </div>
        <div className="peoples-arms">
          <div className="peoples-arms-left">
            <h1>Our team of creatives</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
          <div className="peoples-arms-right">
            <img src={peoplesArms} alt="" />
          </div>
        </div>
        <div className="peoples-arms">
          <div className="peoples-arms-right">
            <img src={peoples_box} alt="" />
          </div>
          <div className="peoples-arms-left">
            <h1>Our team of creatives</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutP;

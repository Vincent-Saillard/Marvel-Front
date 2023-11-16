import "../home/home.css";
import banner from "../../pictures/banner.jpg";

const Home = () => {
  return (
    <>
      <main>
        <section className="banner">
          <div className="back"></div>
          <img src={banner} alt="all marvel heroes epic" />
          <div className="front"></div>
        </section>
        <div className="container">
          <div className="text">
            <div>
              <div className="left"></div>
              <p>Welcome to ...</p>
              <div className="right"></div>
            </div>
            <h1>MARVEL Universe</h1>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

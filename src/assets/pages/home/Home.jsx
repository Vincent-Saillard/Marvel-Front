import "../home/home.css";
import banner from "../../pictures/banner.jpg";

const Home = () => {
  return (
    <>
      <main>
        <section className="banner">
          <img src={banner} alt="all marvel heroes epic" />
        </section>
        <div className="container">
          <p>Welcome to ...</p>
          <h1>MARVEL Universe</h1>
        </div>
      </main>
    </>
  );
};

export default Home;

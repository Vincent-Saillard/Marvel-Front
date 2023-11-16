import "../footer/footer.css";
import github from "../../pictures/github.png";
import linkedin from "../../pictures/linkedin.png";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>
          Made by <span>Vincent Saillard</span> at&nbsp;
          <a href="https://www.lereacteur.io/" target="_blank">
            Le Reacteur
          </a>
        </p>
        <div className="pictos">
          <a href="https://github.com/Vincent-Saillard" target="_blank">
            <img src={github} alt="logo github black cat on white" />
          </a>
          <a
            href="https://www.linkedin.com/in/vincent-saillard-096255a7/"
            target="_blank"
          >
            <img src={linkedin} alt="logo linkedin, in white on blue" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

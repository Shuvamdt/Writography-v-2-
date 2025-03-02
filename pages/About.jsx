import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Note from "../src/components/Note";
import PropTypes from "prop-types";
import Background from "../src/components/Background";

const About = (props) => {
  return (
    <div>
      <Background />
      <Navbar
        userName={props.userName}
        signedIn={props.signedIn}
        setName={props.setName}
        setLog={props.setLog}
      />
      <Note />
      <Footer />
    </div>
  );
};

About.propTypes = {
  userName: PropTypes.string,
  signedIn: PropTypes.bool,
  setName: PropTypes.func,
  setLog: PropTypes.func,
};

export default About;

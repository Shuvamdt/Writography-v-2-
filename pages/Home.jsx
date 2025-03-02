import Navbar from "../src/components/Navbar";
import HeroSection from "../src/components/HeroSection";
import Footer from "../src/components/Footer";
import PropTypes from "prop-types";
import Background from "../src/components/Background";

const Home = (props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar
        userName={props.userName}
        signedIn={props.signedIn}
        setName={props.setName}
        setLog={props.setLog}
      />
      <div className="flex-grow max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
};

Home.propTypes = {
  userName: PropTypes.string,
  signedIn: PropTypes.bool,
  setName: PropTypes.func,
  setLog: PropTypes.func,
};

export default Home;

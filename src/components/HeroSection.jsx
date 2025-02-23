import vd1 from "../assets/Videos/vd-1.mp4";
import vd2 from "../assets/Videos/vd-2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1
        className="font text-4xl lg:text-7xl sm:text-6xl text-center tracking-wide"
        style={{ fontSize: 50, color: "violet" }}
      >
        Write your heart out,
        <span className="bg-gradient-to-r from-violet-200 to-violet-600 text-transparent bg-clip-text">
          <br />
          we are listening . . .
        </span>
      </h1>
      <p
        className="mt-10 text-lg text-center max-w-4xl font"
        style={{ color: "#D69ADE" }}
      >
        This is a blog writing website where you can anonymously or openly post
        your stories, your opinions, your wishes, all aesthetically.
      </p>
      <div className="flex justify-center my-10">
        <a
          href="/write"
          className="font bg-gradient-to-r from-purple-500 to-purple-800 py-4 px-6 mx-3 rounded-3xl"
          style={{ color: "#FFDFEF" }}
        >
          Start Writing
        </a>
        <a
          href="/blogs"
          className="py-4 px-6 mx-3 rounded-3xl border font"
          style={{ color: "#EABDE6" }}
        >
          Blog page
        </a>
      </div>
      <div className="flex flex-col md:flex-row mt-10 justify-center items-center md:items-start">
        <video
          autoPlay
          loop
          muted
          src={vd1}
          className="rounded-lg w-full md:w-1/3 border border-purple-800 shadow-purple-200 mx-2 my-4"
        ></video>
        <video
          autoPlay
          loop
          muted
          src={vd2}
          className="rounded-lg w-full md:w-1/3 border border-purple-400 shadow-purple-200 mx-2 my-4"
        ></video>
      </div>
    </div>
  );
};

export default HeroSection;

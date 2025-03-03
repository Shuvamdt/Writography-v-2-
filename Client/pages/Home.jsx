import HeroSection from "../src/components/HeroSection";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
      </div>
    </div>
  );
};
export default Home;

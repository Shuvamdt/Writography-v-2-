const Note = () => {
  return (
    <div className="flex-col items-center justify-center rounded-2xl backdrop-blur-lg my-20 mx-10 py-30 px-10">
      <div className="flex items-center justify-center ">
        <h1 className="font" style={{ fontSize: 30, color: "#FFDFEF" }}>
          About
        </h1>
      </div>
      <p
        className="text-center font text-lg text-gray-600 leading-relaxed"
        style={{ color: "#FFDFEF" }}
      >
        Welcome to <span className="font-bold">Writography</span>, your creative
        space for words and thoughts. We believe that writing is an art, and
        every story deserves a beautiful canvas. Whether you`&apos;`re drafting
        poetry, journaling your day, or penning the next bestseller, Writography
        offers a serene and distraction-free environment to let your creativity
        flourish.
      </p>
      <p
        className="text-center font mt-4 text-lg text-gray-600 leading-relaxed"
        style={{ color: "#FFDFEF" }}
      >
        Our mission is to provide a space where writers feel inspired. With
        minimalist design, intuitive tools, and a touch of elegance, Writography
        is crafted for those who love to write.
      </p>
    </div>
  );
};

export default Note;

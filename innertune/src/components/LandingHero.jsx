import React from "react";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const LandingHero = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        I Wish I Sent You That Drunk
        <span className="bg-gradient-to-r from-orange-300 to-red-500 text-transparent bg-clip-text ">
          {" "}
          Text At Midnight
        </span>
      </h1>
      <p className="mt-10 tex-lg text-center text-neutral-500 max-w-4xl">
        I know you’ve never loved the crinkles by your eyes when you smile,
        you’ve never loved your stomach or your thighs.
      </p>
      <div className="glex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-orange-400 to-orange-600 py-3 px-4 mx-3 rounded-md "
        >
          Listen to your own
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
          You belong with me
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-pink-500 shadow-pink-300 mx-2 my-4 "
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-pink-500 shadow-pink-300 mx-2 my-4 "
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default LandingHero;

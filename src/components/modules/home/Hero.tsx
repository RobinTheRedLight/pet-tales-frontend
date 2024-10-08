import Image from "next/image";
import heroImage from "../../../assets/Hero.jpg";
import { IoCreateOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-gray-800">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white font-nunito text-5xl md:text-6xl mb-4">
          Discover Amazing Pet Stories
        </h1>
        <p className="text-gray-200 text-lg mb-8 font-short-stack">
          Join our community to share and explore heartwarming pet tales from
          around the world.
        </p>
        <a
          href="/posts/create"
          className="inline-block bg-orange-600 px-8 py-4 text-lg rounded-full hover:bg-orange-700 transition duration-300 text-white"
        >
          <p className="flex items-center">
            {" "}
            <span className="mr-2">Create Content</span>
            <span>
              <IoCreateOutline />
            </span>
          </p>
        </a>
      </div>
    </section>
  );
};

export default Hero;

import Image from "next/image";
import heroImage from "../../../assets/Hero.jpg";

const Hero = () => {
  return (
    <section className="py-10 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between">
      {/* Text Content */}
      <div className="md:w-1/2 text-left mb-6 md:mb-0">
        <h1 className=" font-nunito text-3xl md:text-4xl mb-4">
          Unleash Your Pet&apos;s Tale: Connect Through Shared Experiences
        </h1>
        <p className="text-lg mb-6 text-balance font-short-stack">
          Every pet owner has a unique tale. From heartwarming moments to
          challenging times, your story matters. Join our community and inspire
          others with your experiences.
        </p>
        <a
          href="#share-story"
          className="font-nunito inline-block bg-orange-600 px-6 py-3 text-lg rounded-md hover:bg-orange-700 transition duration-300 text-white"
        >
          Share Your Story &raquo;
        </a>
      </div>

      {/* Image */}
      <div className="md:w-1/2">
        <Image
          src={heroImage}
          alt="Man and his dog"
          className="rounded-md shadow-lg w-full h-auto"
          width={500}
          height={300}
          priority
        />
      </div>
    </section>
  );
};

export default Hero;

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-2xl w-full max-w-xl space-y-6 transform transition-all duration-500 ease-in-out hover:scale-105">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-white">
          About Me
        </h2>
        
        <p className="text-lg text-white leading-relaxed">
          Hi, I am <span className="font-semibold">Janpreet Singh</span>, a passionate MERN stack developer who enjoys building intuitive, meaningful, and scalable web applications. I love learning new technologies and collaborating with like-minded individuals.
        </p>

        <div className="space-y-4">
          <p className="text-lg text-white">
            <strong>Email:</strong>{" "}
            <a href="mailto:janpreet3549@gmail.com " className="text-blue-400 hover:underline">
              janpreet3549@gmail.com  
           </a>
          </p>
          <p className="text-lg text-white">                                
            <strong>Phone:</strong>{" "}
            <a href="tel:+919622314436" className="text-blue-400 hover:underline">
              +91 700163549
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

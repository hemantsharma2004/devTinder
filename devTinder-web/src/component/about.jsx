const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-md space-y-6 transform transition-all duration-500 ease-in-out hover:scale-105">
        <h2 className="text-5xl font-semibold text-center text-white animate__animated animate__fadeIn">
          About Me
        </h2>
        <p className="text-lg text-gray-600 animate__animated animate__fadeIn animate__delay-1s">
          Hi, I am Hemant Sharma. I mm a passionate Mern stack developer who loves to explore new technologies and build meaningful applications.
        </p>
        
        <div className="space-y-4 animate__animated animate__fadeIn animate__delay-2s">
          <p className="text-xl text-gray-700">
            <strong>Email:</strong> <a href="mailto:hemantshar955@gmail.com" className="text-blue-600 hover:underline">hemantshar955@gmail.com</a>
          </p>
          <p className="text-xl text-gray-700">
            <strong>Phone:</strong> <a href="tel:+919622314436" className="text-blue-600 hover:underline">9622314436</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

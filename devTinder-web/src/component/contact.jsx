const Contact = () => {
    return (
      <div className="min-h-screen bg-transparent text-white py-12 px-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-gray-300 mb-8 text-center">
            Have questions, feedback, or need help? Feel free to reach out and we'll get back to you as soon as possible.
          </p>
  
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
              />
            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>
  
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
            >
              Send Message
            </button>
          </form>
  
          <p className="text-sm text-gray-400 text-center mt-8">
            Or email us directly at{" "}
            <a href="mailto:janpreet3549@gmail.come-400 underline">
            janpreet3549@gmail.com
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  export default Contact;
  
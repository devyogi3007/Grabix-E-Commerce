import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-gray-800 p-6 md:p-12">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-orange-500 mb-6">
          About Us
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          Welcome to <span className="text-orange-500">Grabix</span>
        </h2>

        {/* Content Section */}
        <div className="space-y-8">
          <p className="text-lg leading-relaxed text-center">
            Your ultimate destination for everything electronics! At{" "}
            <strong>Grabix</strong>, we believe in making technology{" "}
            <strong>accessible</strong>, <strong>convenient</strong>, and{" "}
            <strong>sustainable</strong> for everyone.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Buy Gadgets</h3>
              <p className="text-sm">Get the latest and greatest tech gadgets.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Sell Devices</h3>
              <p className="text-sm">Trade-in or sell your pre-loved devices easily.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Rent Tech</h3>
              <p className="text-sm">Short-term solutions with our rental services.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Repair Services</h3>
              <p className="text-sm">Fix your cherished electronics quickly and reliably.</p>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-orange-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              Our Commitment
            </h2>
            <p className="text-lg leading-relaxed">
              At <strong>Grabix</strong>, we focus on{" "}
              <span className="text-orange-500 font-semibold">innovation</span>{" "}
              and <span className="text-orange-500 font-semibold">sustainability</span>, delivering smarter solutions while reducing{" "}
              <strong>electronic waste</strong>. Experience convenience and
              value—all at the click of a button.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-12">
          <p className="text-lg font-medium">
            Join the <span className="text-orange-500 font-semibold">Grabix Revolution</span>{" "}
            today and experience the future of electronics.
          </p>
          <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

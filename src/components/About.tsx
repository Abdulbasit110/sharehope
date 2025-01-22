import React from 'react';

export default function About  () {
  return (
    <div className="bg-gray-50 py-16 px-4">
      {/* Introduction Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          About <span className="text-green-600">ShareHope</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          At ShareHope, we are on a mission to create a sustainable future by giving unused clothes a second life. Join us in reducing textile waste and making a difference in the lives of those in need.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To transform lives and protect the environment by encouraging responsible clothing donations and eco-friendly disposal. We aim to create a sustainable platform where generosity meets environmental stewardship.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Our Vision
          </h2>
          <p className="text-gray-600">
            A world where textile waste is minimized, communities thrive through shared resources, and everyone embraces sustainability as a way of life.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mt-16 max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800">
          How ShareHope Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Donate Your Clothes",
              description: "Easily schedule pickups or drop-offs for your unused clothes and contribute to meaningful causes.",
            },
            {
              title: "Earn Rewards",
              description: "Receive exclusive vouchers and rewards from top clothing brands for your generous contributions.",
            },
            {
              title: "Support Sustainability",
              description: "Dispose of non-donatable clothes responsibly, reducing waste and helping the planet.",
            },
          ].map((step, index) => (
            <div key={index} className="text-center p-6 bg-white shadow-lg rounded-lg space-y-4">
              <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 px-4 text-center mt-16 rounded-lg">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Join Us in Making a Difference
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Be a part of the ShareHope community and take a step toward sustainability today.
        </p>
        <a
          href="/registration"
          className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

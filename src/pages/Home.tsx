import { Link } from 'react-router-dom';
import { Recycle, Heart, Award, Leaf } from 'lucide-react';
import Footer from "../components/Footer"
export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 bg-gradient-to-r from-green-50 via-blue-50 to-green-50 py-16 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Give Your Clothes a <span className="text-green-600">Second Life</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Join our mission to reduce textile waste and support those in need. Donate your unused clothes and earn rewards while helping the environment.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/registration"
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-green-700 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-50 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-4">
        {[
          {
            icon: <Heart className="w-8 h-8 text-green-600" />,
            title: "Easy Donation Process",
            description: "Schedule pickups or drop-offs with nearby NGOs in just a few clicks.",
          },
          {
            icon: <Award className="w-8 h-8 text-green-600" />,
            title: "Earn Rewards",
            description: "Get exclusive vouchers from top clothing brands for your contributions.",
          },
          {
            icon: <Leaf className="w-8 h-8 text-green-600" />,
            title: "Eco-Friendly Disposal",
            description: "Ensure your non-donatable clothes are disposed of responsibly.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="text-center space-y-4 p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
          >
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Impact Stats */}
      <section className="bg-green-50 py-12 rounded-lg px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8">
          Together, We Make an Impact
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          {[
            { value: "10K+", label: "Items Donated" },
            { value: "50+", label: "Partner NGOs" },
            { value: "5K+", label: "Happy Donors" },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-5xl font-extrabold text-green-600">{stat.value}</div>
              <div className="text-gray-700 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Start donating today and join a community of like-minded individuals working toward a better future.
        </p>
        <Link
          to="/registration"
          className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition duration-300"
        >
          Join Us Now
        </Link>
      </section>
      <section>
        <Footer/>
      </section>
    </div>
  );
}

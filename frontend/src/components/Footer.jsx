import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between gap-8">

        {/* INFO */}
        <div className="mb-6 md:mb-0">
          <Link to="/">
            <img src="/flower.png" alt="logo" className="w-5" />
          </Link>
          <p className="mt-2 text-sm">
            Powering Your World with the Best in Electronics.
          </p>
          <p className="mt-2 text-sm">123 Electronics St, Style City, NY 10001</p>
          <p className="text-sm">Email: support@Zaptro.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* CUSTOMER SERVICE */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2 text-2xl">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitterSquare className="hover:text-blue-400 cursor-pointer" />
            <FaPinterest className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more.
          </p>

          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 rounded-r-md hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

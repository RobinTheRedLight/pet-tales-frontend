"use client";

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:underline text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:underline text-gray-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="hover:underline text-gray-400"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              Email:{" "}
              <a
                href="mailto:contact@yourwebsite.com"
                className="hover:underline text-gray-400"
              >
                contact@pettales.com
              </a>
            </p>
            <p className="text-gray-400 mt-2">
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="hover:underline text-gray-400"
              >
                +123-456-7890
              </a>
            </p>
            <p className="text-gray-400 mt-2">
              Address: 123 Pet Lovers Avenue, Suite 456 Petville, USA
            </p>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  className="hover:text-blue-500 transition duration-200"
                  size={20}
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  className="hover:text-blue-400 transition duration-200"
                  size={20}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  className="hover:text-pink-500 transition duration-200"
                  size={20}
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn
                  className="hover:text-blue-600 transition duration-200"
                  size={20}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-gray-500 text-sm">
          {/* Copyright Text */}
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>

          {/* Additional Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/faq" className="hover:underline text-gray-400">
              FAQ
            </a>
            <a href="/support" className="hover:underline text-gray-400">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

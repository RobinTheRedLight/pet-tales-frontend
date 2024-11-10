/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {  Heart, Target, Award, MapPin, Phone, Mail, Clock, Factory } from 'lucide-react';
import Image from 'next/image';
import img1 from "../../../assets/img1.png";
import img2 from "../../../assets/img2.png";
import bgImg from "../../../assets/bg.jpg";

const AboutUs = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Our Mission",
      description: "To revolutionize pet care through innovative digital solutions, making expert knowledge accessible to every pet owner worldwide."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Our Vision",
      description: "To become the world's most trusted pet care platform by 2025, serving millions of pet owners with reliable, personalized pet care solutions."
    },
    {
      icon: <Award className="w-8 h-8 text-amber-500" />,
      title: "Our Values",
      description: "Integrity in all our interactions, excellence in service delivery, compassion for all animals, and innovation in pet care solutions."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: img1,
      bio: "Veterinarian with 15+ years experience, passionate about making pet care accessible to everyone."
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: img2,
      bio: "Former Google engineer with a deep love for animals and technology innovation."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Veterinary Services",
      image: img1,
      bio: "Specialized in animal nutrition and behavioral psychology with 10+ years of clinical experience."
    }
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/yourcompany' },
    { name: 'Twitter', url: 'https://twitter.com/yourcompany' },
    { name: 'Instagram', url: 'https://instagram.com/yourcompany' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/yourcompany' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-2">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 flex-1">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Welcome to</span>
                  <span className="block text-blue-600">Your Pet's Best Friend</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Transforming pet care since 2020
                </p>
              </div>
            </main>
          </div>
          <div className="flex-1 hidden lg:block">
            <Image src={bgImg} alt="Hero Image" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Company History */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">2020</h3>
                  <p className="text-gray-600">Founded in San Francisco with a mission to revolutionize pet care</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Award className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">2022</h3>
                  <p className="text-gray-600">Reached 100,000 active users and launched mobile app</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Target className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">2023</h3>
                  <p className="text-gray-600">Expanded services nationwide and partnered with leading veterinary clinics</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Our Impact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 500,000+ pets helped</li>
                <li>• 1,000+ veterinary partners</li>
                <li>• 50 states covered</li>
                <li>• 98% customer satisfaction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Target Market */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Who We Serve</h2>
          <div className="bg-gray-50 rounded-xl p-8">
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Pet owners seeking reliable, professional pet care advice</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>First-time pet parents looking for guidance and support</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Busy professionals who want the best for their pets</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Pet care businesses seeking digital solutions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-64 h-full object-cover mx-auto"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Consultation</h3>
                  <p className="text-gray-600">We begin with a thorough understanding of your pet's needs</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Customized Plan</h3>
                  <p className="text-gray-600">Our experts create a tailored care plan for your pet</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Implementation</h3>
                  <p className="text-gray-600">We help you implement the plan with ongoing support</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Our Quality Commitment</h3>
              <p className="text-gray-600 mb-4">
                Every service we provide undergoes rigorous quality checks and is backed by our satisfaction guarantee.
              </p>
              <div className="flex items-center space-x-2">
                <Factory className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">ISO 9001:2015 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-600">123 Pet Care Street<br />San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@petcare.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-8 text-center">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
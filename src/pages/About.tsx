import React from 'react';
import { Shield, Users, Heart, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About TrustMed</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to make healthcare financially accessible to everyone through innovative
            medical savings and emergency funding solutions.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At TrustMed, we're guided by our commitment to making healthcare financially accessible
              while maintaining the highest standards of trust and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-gray-600">Your financial security is our top priority</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Building a supportive healthcare community</p>
            </div>
            <div className="text-center p-6">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Care</h3>
              <p className="text-gray-600">Putting your health needs first</p>
            </div>
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">Maintaining the highest service standards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals working to make healthcare financing accessible to all.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold mb-2">Shalini Dasari</h3>
              <p className="text-primary mb-4">Founder & CEO</p>
              <p className="text-gray-600">
                Leading the vision of making healthcare financially accessible to everyone through
                innovative solutions and dedicated service.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Thanusri", role: "Chief Technology Officer" },
                { name: "Krishnaveni", role: "Head of Operations" },
                { name: "Siri", role: "Financial Director" },
                { name: "Gayathri", role: "Customer Relations Head" }
              ].map((member) => (
                <div key={member.name} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
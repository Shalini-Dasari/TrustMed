import React from 'react';
import { ArrowRight, Shield, CreditCard, PiggyBank, HeartPulse, HelpCircle, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const features = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Emergency Coverage",
      description: "Instant access to medical funds when you need them most"
    },
    {
      icon: <CreditCard className="w-12 h-12" />,
      title: "Medical Card",
      description: "Dedicated medical savings card with smart spending features"
    },
    {
      icon: <PiggyBank className="w-12 h-12" />,
      title: "Flexible Savings",
      description: "Build your medical safety net with monthly contributions"
    },
    {
      icon: <HeartPulse className="w-12 h-12" />,
      title: "Quick Loans",
      description: "Emergency medical loans based on your credit score"
    }
  ];
  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };
  const faqItems = [
    {
      question: "How does TrustMed work?",
      answer: "TrustMed allows you to save money monthly in a dedicated medical card. During emergencies, you can use these savings or apply for quick loans if needed."
    },
    {
      question: "What are the loan requirements?",
      answer: "Loans are granted based on your credit score, savings history, and optional asset collateral. You'll need to provide medical bills for verification."
    },
    {
      question: "How much can I borrow?",
      answer: "Loan amounts depend on your savings, credit score, and provided collateral. We offer flexible terms to meet emergency medical needs."
    },
    {
      question: "How do I start saving?",
      answer: "Simply sign up, set your monthly contribution amount, and start building your medical safety net. You can adjust your savings amount anytime."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Video Background */}
      <div className="relative min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-medical-elements-with-a-blue-background-34671-large.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Be Prepared for any Medical Emergency
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your trusted medical savings card with instant access to emergency funds
              </p>
              <div className="flex gap-4">
              <button 
                  onClick={handleGetStarted}
                  className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition"
                >
                  Get Started
                </button>
                <Link 
                  to="/about"
                  className="bg-white text-primary px-8 py-3 rounded-xl hover:bg-gray-50 transition border border-primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent rounded-full filter blur-3xl opacity-30" />
              <div className="glass-effect rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
                  alt="Medical Card"
                  className="rounded-xl shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to secure your medical financial future
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <PiggyBank className="w-10 h-10" />,
                title: "Save Monthly",
                description: "Set up automatic contributions to your medical card"
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Stay Protected",
                description: "Access funds instantly during medical emergencies"
              },
              {
                icon: <CreditCard className="w-10 h-10" />,
                title: "Easy Access",
                description: "Use your TrustMed card at any medical facility"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-background rounded-2xl p-8 shadow-soft text-center hover:transform hover:-translate-y-1 transition duration-300">
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  {React.cloneElement(feature.icon, { className: 'text-primary' })}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for medical financial security
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-soft hover:transform hover:-translate-y-1 transition duration-300">
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {React.cloneElement(feature.icon, { className: 'text-primary' })}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about TrustMed
            </p>
          </div>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-background rounded-2xl p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2 text-primary" />
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Medical Future?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of members who trust us with their medical financial security</p>
          <button onClick={handleGetStarted} className="bg-white text-primary px-8 py-3 rounded-xl hover:bg-gray-50 transition flex items-center mx-auto">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
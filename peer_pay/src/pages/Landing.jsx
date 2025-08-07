import { Link } from "react-router-dom";
import React from "react";

function LandingPage() {
  return (
    <>
      {/* Custom CSS for Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
            100% {
              transform: translateY(0px) translateX(0px);
            }
          }

          .floating-rect {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col overflow-hidden">
        {/* Floating Blue Rectangles Background */}
        <div className="absolute inset-0 z-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="floating-rect bg-blue-200 opacity-20 rounded-xl absolute"
              style={{
                width: `${80 + Math.random() * 60}px`,
                height: `${30 + Math.random() * 40}px`,
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between p-6 bg-white shadow-md">
          <h1 className="text-3xl font-bold text-blue-700">PeerPay</h1>
          <nav className="space-x-6 text-blue-700 font-medium">
            <a href="/features" className="hover:underline">Features</a>
            <a href="/about" className="hover:underline">About</a>
            <Link to="/Login" className="hover:underline">Login</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4 leading-tight">
            {
              "Your Personal Banking Simulator".split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block animate-fade-in"
                  style={{ animationDelay: `${i * 0.03}s`, animationFillMode: "both" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))
            }
          </h1>

          <p className="text-lg sm:text-xl text-blue-600 mb-8 animate-fade-in delay-500">
            Seamless Payments Between Peers.
          </p>

          <Link to="/Login">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-800 transition duration-200 animate-fade-in delay-700">
              Get Started
            </button>
          </Link>
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center text-sm text-blue-900 py-4 bg-white shadow-inner">
          <p>&copy; 2025 Peer Pay. All rights reserved.</p>
          
        </footer>
        
      </div>

    </>
  );
}

export default LandingPage;
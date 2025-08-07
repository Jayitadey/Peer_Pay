import { Link } from "react-router-dom";
import React from "react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-blue-700">Peer Pay</h1>
        <nav className="space-x-6 text-blue-700 font-medium">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">About</a>
          <Link to="/Login">
            <a href="#" className="hover:underline">Login</a>
          </Link>
        </nav>
      </header>

      {/* Coin Animation Placeholder */}
      <div className="w-16 h-16 bg-yellow-400 rounded-full animate-bounce mx-auto my-6 shadow-lg" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
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
      <footer className="text-center text-sm text-blue-900 py-4 bg-white shadow-inner">
        <p>&copy; 2025 Peer Pay. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
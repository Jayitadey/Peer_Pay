import React from "react";

const About = () => {
  const aboutData = [
    {
      title: "What is Peer Pay?",
      icon: "fa-solid fa-hand-holding-dollar",
      description:
        "Peer Pay is a peer-to-peer payment simulation app. It mimics real-time banking-style features like transfers and QR payments.",
    },
    {
      title: "Why Peer Pay?",
      icon: "fa-solid fa-bolt",
      description:
        "It’s designed for fast, modern web interaction — focusing on real use cases like banking UI, transaction simulation, and user onboarding.",
    },
    {
      title: "Tech Stack",
      icon: "fa-solid fa-laptop-code",
      description:
        "Built using React, Node.js, MongoDB, and styled with Tailwind CSS. It uses JWT for authentication and supports QR .",
    },
    {
      title: "Who built it?",
      icon: "fa-solid fa-user",
      description:
        "Created as a group project to learn real-world fintech workflows and UI design — combining innovation with clean UX.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10 text-center">
        About Peer Pay
      </h1>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-5xl">
        {aboutData.map((item, index) => (
          <div
            key={index}
            className="card animate-fade-in opacity-0"
            style={{
              animationDelay: `${index * 0.4}s`,
              animationFillMode: "both",
            }}
          >
            <i className={`card-icon ${item.icon}`}></i>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
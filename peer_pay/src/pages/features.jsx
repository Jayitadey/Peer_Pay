import React from "react";

const features = [
  {
    title: "Secure Peer-to-Peer Transfers",
    icon: "fa-solid fa-paper-plane",
    description:
      "Send and receive money seamlessly with your friends using email or QR codes.",
  },
  {
    title: "Banking-Style Dashboard",
    icon: "fa-solid fa-chart-line",
    description:
      "View balance, transaction history, and simulate banking operations in a stylish UI.",
  },
  {
    title: "Real-Time OTP Verification",
    icon: "fa-solid fa-shield-halved",
    description:
      "Secure your transactions with email or SMS-based OTP verification.",
  },
  {
    title: "What’s Coming Up…",
    icon: "fa-solid fa-wand-magic-sparkles",
    description:
      "Upcoming features like  UPI simulation, advanced analytics, and chat-style payment requests.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10 text-center">
        Features That Power Peer Pay
      </h1>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-5xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card animate-fade-in opacity-0"
            style={{
              animationDelay: `${index * 0.4}s`,
              animationFillMode: "both",
            }}
          >
            <i className={`card-icon ${feature.icon}`}></i>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-700 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
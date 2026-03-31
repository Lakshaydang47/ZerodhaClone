import React from "react";

const Apps = () => {
  const apps = [
    {
      name: "Kite",
      description: "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more.",
      color: "#387ed1",
      icon: "📊",
    },
    {
      name: "Console",
      description: "The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports.",
      color: "#4caf50",
      icon: "📈",
    },
    {
      name: "Coin",
      description: "Buy direct mutual funds online, commission-free, delivered directly to your Demat account.",
      color: "#ff9800",
      icon: "🪙",
    },
    {
      name: "Kite Connect",
      description: "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs.",
      color: "#9c27b0",
      icon: "🔗",
    },
    {
      name: "Varsity",
      description: "An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations.",
      color: "#e91e63",
      icon: "📚",
    },
    {
      name: "Sentinel",
      description: "Set up alerts on over 100,000+ instruments across stocks, futures, options, currencies and commodities.",
      color: "#00bcd4",
      icon: "🔔",
    },
  ];

  return (
    <div className="apps-container">
      <h3 className="title">Apps</h3>
      <p style={{ color: "#888", marginBottom: "20px" }}>
        Explore our ecosystem of trading and investment apps
      </p>

      <div className="apps-grid">
        {apps.map((app, index) => (
          <div className="app-card" key={index}>
            <div className="app-icon" style={{ backgroundColor: app.color }}>
              <span>{app.icon}</span>
            </div>
            <div className="app-info">
              <h4>{app.name}</h4>
              <p>{app.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;

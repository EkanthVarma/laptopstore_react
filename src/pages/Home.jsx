import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <span className="hero-badge">💻 Welcome to LaptopStore</span>

      <h1 className="hero-title">
        Find Your Perfect <span>Laptop</span>
      </h1>

      <p className="hero-subtitle">
        Curated laptops for work, gaming, and everything
        in between — compare specs, prices, and reviews
        in one place.
      </p>

      <Link className="hero-btn" to="/laptops">
        Browse Laptops →
      </Link>

      <div className="hero-features">
        <div className="feature-box">
          <h3>⚡ Performance</h3>
          <p>Latest processors and graphics for every need.</p>
        </div>

        <div className="feature-box">
          <h3>💰 Best Value</h3>
          <p>Compare prices across budgets and brands.</p>
        </div>

        <div className="feature-box">
          <h3>🛡️ Trusted Picks</h3>
          <p>Ratings and warranty details you can rely on.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
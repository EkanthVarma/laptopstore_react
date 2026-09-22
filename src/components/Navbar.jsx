import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const favorites = useSelector(
    state => state.favorites
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav>
      <Link to="/" className="logo" onClick={closeMenu}>
        <span className="logo-icon">💻</span>
        <span className="logo-text">
          Laptop<span>Store</span>
        </span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/laptops" onClick={closeMenu}>Laptops</Link>

        <Link to="/favorites" onClick={closeMenu}>
          Favorites ({favorites.length})
        </Link>

        {!user && (
          <>
            <Link to="/register" onClick={closeMenu}>Register</Link>
            <Link to="/login" onClick={closeMenu}>Login</Link>
          </>
        )}

        {user && (
          <Link to="/logout" onClick={closeMenu}>Logout</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
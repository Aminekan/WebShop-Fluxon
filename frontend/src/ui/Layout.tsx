import type { ReactNode } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../state/CartContext";
import { useAuth } from "../state/AuthContext";

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand-mark">
          <span className="brand-badge">F</span>
          <span>
            Fluxon
            <small>Visual commerce demo</small>
          </span>
        </Link>

        <button type="button" className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
          Menu
        </button>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>
          <NavLink to="/account" onClick={() => setMenuOpen(false)}>
            Account
          </NavLink>
          {user ? (
            <button type="button" className="nav-action" onClick={logout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          )}
          <NavLink to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
            Cart <span>{itemCount}</span>
          </NavLink>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <strong>Fluxon</strong>
          <p>Frontend demo built to stay presentable even while the API is still evolving.</p>
        </div>
        <div className="footer-grid">
          <span>Hybrid API mode</span>
          <span>Responsive storefront</span>
          <span>Checkout-ready flow</span>
        </div>
      </footer>
    </div>
  );
}

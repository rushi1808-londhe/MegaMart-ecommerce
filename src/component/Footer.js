import React from "react";

export default function Footer() {
  return (
    <footer className="footer mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold">MegaMart</h5>
            <p className="text-muted small">
              Your one-stop shop for electronics, fashion, groceries,
              and everyday essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/" className="footer-link">Products</a></li>
              <li><a href="/" className="footer-link">Cart</a></li>
              <li><a href="/" className="footer-link">About</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-semibold">Categories</h6>
            <ul className="list-unstyled small">
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Groceries</li>
              <li>Home & Living</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="fw-semibold">Contact</h6>
            <p className="small mb-1">📍 Mumbai, India</p>
            <p className="small mb-1">📧 support@megamart.com</p>
            <p className="small">📞 +91 98765 4XXXX</p>
          </div>

        </div>

        <hr />

        {/* Bottom */}
        <div className="text-center small text-muted">
          © 2025 MegaMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

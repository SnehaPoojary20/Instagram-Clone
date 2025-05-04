import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        {[
          "Meta",
          "About",
          "Blog",
          "Jobs",
          "Help",
          "API",
          "Privacy",
          "Terms",
          "Locations",
          "Instagram Lite",
          "Threads",
          "Contact Uploading & Non-Users",
          "Meta Verified",
        ].map((link, index) => (
          <a key={index} href="#" className="footer-link">
            {link}
          </a>
        ))}
      </div>
      <div className="footer-bottom">
        <span className="footer-language">English ▼</span>
        <span className="footer-copy">© 2025 Instagram from Meta</span>
      </div>
    </footer>
  );
};

export default Footer;

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Contact Me</h3>
        <div className="contact-info">
          <p><strong>Name:</strong> Soni Kumari</p>
          <p><strong>Phone:</strong> <a href="tel:+91-9341677226">+91-9341677226</a></p>
          <p><strong>Portfolio:</strong> <a href="https://sonikcv.netlify.app/" target="_blank" rel="noopener noreferrer">https://sonikcv.netlify.app/</a></p>
          <p><strong>Resume:</strong> <a href="https://drive.google.com/file/d/1Rhy1LamTWd5MEV2euZmioh9KOw8jXDYD/view" target="_blank" rel="noopener noreferrer">View Resume</a></p>
        </div>
        <div className="footer-note">
          <p>Built with ❤️ for college placement assignment</p>
        </div>
      </div>
    </footer>
  );
}
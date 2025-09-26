import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronUp,
  Heart,
  FileText,
  Shield,
  HelpCircle,
  Users,
  Building2,
  Briefcase,
  BookOpen,
  Award,
  TrendingUp,
  Star,
  ArrowRight,
  Send,
  Zap,
  CheckCircle,
  Clock,
  Search,
  Eye,
  Download,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/jobboard",
      label: "Facebook",
      color: "facebook",
      followers: "12K",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/jobboard",
      label: "Twitter",
      color: "twitter",
      followers: "8.5K",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/jobboard",
      label: "Instagram",
      color: "instagram",
      followers: "15K",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/jobboard",
      label: "LinkedIn",
      color: "linkedin",
      followers: "25K",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/jobboard",
      label: "YouTube",
      color: "youtube",
      followers: "5.2K",
    },
  ];

  const companyLinks = [
    { to: "/about", label: "Biz haqimizda", icon: Users, badge: "New" },
    { to: "/careers", label: "Karyera", icon: TrendingUp },
    { to: "/press", label: "Press", icon: FileText },
    { to: "/investors", label: "Investorlar", icon: Award },
    { to: "/news", label: "Yangiliklar", icon: BookOpen },
    { to: "/blog", label: "Blog", icon: FileText },
  ];

  const jobSeekerLinks = [
    { to: "/jobs", label: "Vakansiyalarni qidirish", icon: Briefcase, hot: true },
    { to: "/companies", label: "Kompaniyalar", icon: Building2 },
    { to: "/salary-guide", label: "Maosh ko'rsatkichi", icon: TrendingUp, badge: "Popular" },
    { to: "/career-advice", label: "Karyera maslahatlari", icon: BookOpen },
    { to: "/resume-builder", label: "CV yaratish", icon: FileText, badge: "Free" },
    { to: "/job-alerts", label: "Ish xabarlari", icon: Bell },
  ];

  const employerLinks = [
    { to: "/employers", label: "Vakansiya joylash", icon: Briefcase, hot: true },
    { to: "/pricing", label: "Narxlar", icon: Award },
    { to: "/employer-resources", label: "Resurslar", icon: BookOpen },
    { to: "/talent-solutions", label: "Talent Solutions", icon: Users },
    { to: "/employer-branding", label: "Brending", icon: Star },
    { to: "/analytics", label: "Analitika", icon: TrendingUp, badge: "Pro" },
  ];

  const supportLinks = [
    { to: "/help", label: "Yordam markazi", icon: HelpCircle },
    { to: "/contact", label: "Aloqa", icon: Mail },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
    { to: "/support", label: "Qo'llab-quvvatlash", icon: Users },
    { to: "/tutorials", label: "Qo'llanmalar", icon: BookOpen },
    { to: "/status", label: "Servis holati", icon: CheckCircle },
  ];

  const legalLinks = [
    { to: "/privacy", label: "Maxfiylik siyosati", icon: Shield },
    { to: "/terms", label: "Foydalanish shartlari", icon: FileText },
    { to: "/cookies", label: "Cookie siyosati", icon: Shield },
    { to: "/accessibility", label: "Accessibility", icon: Eye },
    { to: "/gdpr", label: "GDPR", icon: Shield },
  ];

  const stats = [
    { label: "Faol vakansiyalar", value: "50K+", icon: Briefcase },
    { label: "Ro'yxatdan o'tgan foydalanuvchilar", value: "2M+", icon: Users },
    { label: "Kompaniyalar", value: "10K+", icon: Building2 },
    { label: "Muvaffaqiyatli ishga joylashtirish", value: "500K+", icon: Award },
  ];

  const quickActions = [
    { label: "Ish qidirish", icon: Search, to: "/jobs", color: "primary" },
    { label: "CV yuklash", icon: Download, to: "/upload-cv", color: "success" },
    { label: "Kompaniyalar", icon: Building2, to: "/companies", color: "info" },
    { label: "Maosh calculator", icon: TrendingUp, to: "/salary", color: "warning" },
  ];

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-info">
              <div className="newsletter-icon">
                <Send className="w-8 h-8" />
              </div>
              <div>
                <h3 className="newsletter-title">
                  Yangi vakansiyalardan birinchi bo'lib xabardor bo'ling
                </h3>
                <p className="newsletter-subtitle">
                  Haftalik eng yaxshi vakansiyalar va karyera maslahatlari
                </p>
              </div>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="newsletter-input-group">
                <Mail className="newsletter-input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingizni kiriting"
                  className="newsletter-input"
                  required
                />
                <button
                  type="submit"
                  className={`newsletter-button ${subscribed ? "subscribed" : ""}`}
                  disabled={subscribed}
                >
                  {subscribed ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Obuna bo'ldingiz!
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" />
                      Obuna bo'lish
                    </>
                  )}
                </button>
              </div>
              <div className="newsletter-benefits">
                <div className="newsletter-benefit">
                  <CheckCircle className="w-4 h-4" />
                  <span>Haftalik yangi vakansiyalar</span>
                </div>
                <div className="newsletter-benefit">
                  <CheckCircle className="w-4 h-4" />
                  <span>Ekskluziv karyera maslahatlari</span>
                </div>
                <div className="newsletter-benefit">
                  <CheckCircle className="w-4 h-4" />
                  <span>Istalgan vaqtda bekor qilish</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-company">
              <Link to="/" className="footer-logo">
                <div className="footer-logo-icon">
                  <Building2 className="w-8 h-8" />
                </div>
                <div className="footer-logo-text">
                  <span className="footer-logo-title">JobBoard</span>
                  <span className="footer-logo-tagline">Dream jobs await</span>
                </div>
              </Link>

              <p className="footer-description">
                O'zbekistondagi eng yirik va ishonchli ish qidirish platformasi. 
                Minglab vakansiya va professional rivojlanish imkoniyatlari sizni kutmoqda.
              </p>

              {/* Contact Info */}
              <div className="footer-contact">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Email</span>
                    <a href="mailto:info@jobboard.uz" className="contact-link">
                      info@jobboard.uz
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Telefon</span>
                    <a href="tel:+998712345678" className="contact-link">
                      +998 71 234 56 78
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Manzil</span>
                    <span className="contact-text">Toshkent sh., Chilonzor tumani</span>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Ish vaqti</span>
                    <span className="contact-text">24/7 online xizmat</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="footer-social">
                <h4 className="footer-section-title">Ijtimoiy tarmoqlar</h4>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`social-link ${social.color}`}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="social-icon" />
                      <div className="social-info">
                        <span className="social-name">{social.label}</span>
                        <span className="social-followers">{social.followers}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Seekers */}
            <div className="footer-column">
              <h4 className="footer-section-title">
                <Briefcase className="w-5 h-5" />
                Ish izlovchilar
              </h4>
              <ul className="footer-links">
                {jobSeekerLinks.map((link) => (
                  <li key={link.to} className="footer-link-item">
                    <Link to={link.to} className="footer-link">
                      <link.icon className="footer-link-icon" />
                      <span className="footer-link-text">{link.label}</span>
                      {link.hot && <span className="footer-badge hot">Hot</span>}
                      {link.badge && <span className="footer-badge">{link.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h5 className="quick-actions-title">Tezkor harakatlar</h5>
                <div className="quick-actions-grid">
                  {quickActions.map((action) => (
                    <Link
                      key={action.to}
                      to={action.to}
                      className={`quick-action ${action.color}`}
                    >
                      <action.icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Employers */}
            <div className="footer-column">
              <h4 className="footer-section-title">
                <Building2 className="w-5 h-5" />
                Ish beruvchilar
              </h4>
              <ul className="footer-links">
                {employerLinks.map((link) => (
                  <li key={link.to} className="footer-link-item">
                    <Link to={link.to} className="footer-link">
                      <link.icon className="footer-link-icon" />
                      <span className="footer-link-text">{link.label}</span>
                      {link.hot && <span className="footer-badge hot">Hot</span>}
                      {link.badge && <span className="footer-badge">{link.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Company */}
            <div className="footer-column">
              <h4 className="footer-section-title">
                <HelpCircle className="w-5 h-5" />
                Yordam va qo'llab-quvvatlash
              </h4>
              <ul className="footer-links">
                {supportLinks.map((link) => (
                  <li key={link.to} className="footer-link-item">
                    <Link to={link.to} className="footer-link">
                      <link.icon className="footer-link-icon" />
                      <span className="footer-link-text">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="footer-section-title">
                <Users className="w-5 h-5" />
                Kompaniya
              </h4>
              <ul className="footer-links">
                {companyLinks.map((link) => (
                  <li key={link.to} className="footer-link-item">
                    <Link to={link.to} className="footer-link">
                      <link.icon className="footer-link-icon" />
                      <span className="footer-link-text">{link.label}</span>
                      {link.badge && <span className="footer-badge">{link.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-column">
              <h4 className="footer-section-title">
                <Shield className="w-5 h-5" />
                Huquqiy ma'lumotlar
              </h4>
              <ul className="footer-links">
                {legalLinks.map((link) => (
                  <li key={link.to} className="footer-link-item">
                    <Link to={link.to} className="footer-link">
                      <link.icon className="footer-link-icon" />
                      <span className="footer-link-text">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* App Download */}
              <div className="app-download">
                <h5 className="app-download-title">Mobil ilovani yuklab oling</h5>
                <div className="app-buttons">
                  <a href="#" className="app-button">
                    <div className="app-button-icon">📱</div>
                    <div className="app-button-text">
                      <span>Download for</span>
                      <strong>iOS</strong>
                    </div>
                  </a>
                  <a href="#" className="app-button">
                    <div className="app-button-icon">🤖</div>
                    <div className="app-button-text">
                      <span>Get it on</span>
                      <strong>Android</strong>
                    </div>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="trust-badges">
                <h5 className="trust-badges-title">Ishonch belgilari</h5>
                <div className="badges">
                  <div className="badge">
                    <Shield className="w-6 h-6" />
                    <span>SSL Himoyalangan</span>
                  </div>
                  <div className="badge">
                    <CheckCircle className="w-6 h-6" />
                    <span>Tasdiqlangan</span>
                  </div>
                  <div className="badge">
                    <Star className="w-6 h-6" />
                    <span>4.8/5 Reyting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <div className="footer-copyright">
                <span>&copy; {currentYear} JobBoard. Barcha huquqlar himoyalangan.</span>
                <span className="made-with-love">
                  Made with <Heart className="heart-icon" /> in Uzbekistan
                </span>
              </div>
              
              <div className="footer-meta">
                <Link to="/sitemap" className="footer-meta-link">Sitemap</Link>
                <Link to="/rss" className="footer-meta-link">RSS</Link>
                <Link to="/api-docs" className="footer-meta-link">API</Link>
                <span className="footer-version">
                  <Zap className="w-3 h-3" />
                  v2.1.0
                </span>
              </div>
            </div>

            <div className="footer-bottom-right">
              <div className="footer-languages">
                <Globe className="w-4 h-4" />
                <select className="language-select">
                  <option value="uz">O'zbekcha</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div className="footer-awards">
                <div className="award">
                  <Award className="w-4 h-4" />
                  <span>Best Job Portal 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
        aria-label="Yuqoriga ko'tarish"
      >
        <ChevronUp className="w-5 h-5" />
        <span className="scroll-tooltip">Yuqoriga</span>
      </button>

      {/* Floating Quick Access */}
      <div className="floating-actions">
        <Link to="/jobs" className="floating-action primary">
          <Search className="w-5 h-5" />
        </Link>
        <Link to="/upload-cv" className="floating-action success">
          <Download className="w-5 h-5" />
        </Link>
        <Link to="/contact" className="floating-action info">
          <Mail className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

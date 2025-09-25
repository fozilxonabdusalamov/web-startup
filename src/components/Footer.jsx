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
} from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
  ];

  const companyLinks = [
    { to: "/about", label: "Biz haqimizda", icon: Users },
    { to: "/careers", label: "Karyera", icon: TrendingUp },
    { to: "/press", label: "Press", icon: FileText },
    { to: "/investors", label: "Investorlar", icon: Award },
  ];

  const jobSeekerLinks = [
    { to: "/jobs", label: "Vakansiyalarni qidirish", icon: Briefcase },
    { to: "/companies", label: "Kompaniyalar", icon: Building2 },
    { to: "/salary-guide", label: "Maosh ko'rsatkichi", icon: TrendingUp },
    { to: "/career-advice", label: "Karyera maslahatlari", icon: BookOpen },
  ];

  const employerLinks = [
    { to: "/employers", label: "Vakansiya joylash", icon: Briefcase },
    { to: "/pricing", label: "Narxlar", icon: Award },
    { to: "/employer-resources", label: "Resurslar", icon: BookOpen },
    { to: "/talent-solutions", label: "Talent Solutions", icon: Users },
  ];

  const supportLinks = [
    { to: "/help", label: "Yordam", icon: HelpCircle },
    { to: "/contact", label: "Aloqa", icon: Mail },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
    { to: "/support", label: "Qo'llab-quvvatlash", icon: Users },
  ];

  const legalLinks = [
    { to: "/privacy", label: "Maxfiylik siyosati", icon: Shield },
    { to: "/terms", label: "Foydalanish shartlari", icon: FileText },
    { to: "/cookies", label: "Cookie siyosati", icon: Shield },
    { to: "/accessibility", label: "Accessibility", icon: Users },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link
                to="/"
                className="flex text-white items-center text-white space-x-3 mb-4"
              >
                <span className="text-2xl font-bold">JobBoard</span>
              </Link>
              <p className="text-gray-300 leading-relaxed max-w-md">
                O'zbekistondagi eng yirik ish qidirish platformasi. Minglab
                vakansiya va professional rivojlanish imkoniyatlari.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg mb-4">Bog'lanish</h4>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-blue-400" />
                <a
                  href="mailto:info@jobboard.uz"
                  className="hover:text-blue-400 text-white transition-colors"
                >
                  info@jobboard.uz
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} className="text-blue-400" />
                <a
                  href="tel:+998712345678"
                  className="hover:text-blue-400 text-white transition-colors"
                >
                  +998 71 234 56 78
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={16} className="text-blue-400" />
                <span>Toshkent sh., Chilonzor tumani</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Globe size={16} className="text-blue-400" />
                <a
                  href="https://jobboard.uz"
                  className="hover:text-blue-400 text-white transition-colors"
                >
                  jobboard.uz
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Ijtimoiy tarmoqlar</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-3 bg-gray-800 rounded-lg ${social.color} transition-all hover:scale-110`}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Ish izlovchilar</h4>
            <ul className="space-y-3" type="none">
              {jobSeekerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex text-white items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon
                      size={16}
                      className="group-hover:text-blue-400"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Ish beruvchilar</h4>
            <ul className="space-y-3" type="none">
              {employerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex text-white items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon
                      size={16}
                      className="group-hover:text-blue-400"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Support Links */}
            <h4 className="font-semibold text-lg mb-6 mt-8">Yordam</h4>
            <ul className="space-y-3" type="none">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex  text-white items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon
                      size={16}
                      className="group-hover:text-blue-400"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Kompaniya</h4>
            <ul className="space-y-3" type="none">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex text-white items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon
                      size={16}
                      className="group-hover:text-blue-400"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-lg mb-6 mt-8">Huquqiy</h4>
            <ul className="space-y-3" type="none">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex text-white items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon
                      size={16}
                      className="group-hover:text-blue-400"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>
                &copy; {currentYear} JobBoard. Barcha huquqlar himoyalangan.
              </span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart size={14} className="text-red-500 fill-current" />
                <span>in Uzbekistan</span>
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Sitemap
              </Link>
              <Link
                to="/rss"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                RSS
              </Link>
              <Link
                to="/api-docs"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                API
              </Link>
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe size={14} />
                <span>v2.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 z-50"
          aria-label="Yuqoriga ko'tarish"
        >
          <ChevronUp size={20} className="mx-auto" />
        </button>
      )}
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Building2,
  Users,
  BarChart3,
  Shield,
  Briefcase,
  Globe,
  Check,
  Heart,
  MessageSquare,
  HelpCircle,
  Languages,
  Eye,
  Moon,
  Sun,
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("uz");
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Language options
  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "🇺🇿", nativeName: "O'zbekcha" },
    { code: "ru", name: "Русский", flag: "🇷🇺", nativeName: "Русский" },
    { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  ];

  // Mock user state and notifications
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setNotifications([
        {
          id: 1,
          type: "job_match",
          title: "New job matches found!",
          message: "5 new jobs match your profile",
          time: "5 min ago",
          read: false,
          icon: <Briefcase className="w-5 h-5 text-blue-600" />,
        },
        {
          id: 2,
          type: "application",
          title: "Application viewed",
          message: "TechCorp viewed your application",
          time: "1 hour ago",
          read: false,
          icon: <Eye className="w-5 h-5 text-green-600" />,
        },
        {
          id: 3,
          type: "message",
          title: "New message from recruiter",
          message: "Sarah from StartupXYZ sent you a message",
          time: "2 hours ago",
          read: true,
          icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
        },
      ]);
    }

    const savedLanguage = localStorage.getItem("language") || "uz";
    setCurrentLanguage(savedLanguage);
  }, []);

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setShowUserDropdown(false);
      }
      if (!event.target.closest(".language-dropdown")) {
        setShowLanguageDropdown(false);
      }
      if (!event.target.closest(".notifications-dropdown")) {
        setShowNotifications(false);
      }
      if (!event.target.closest(".mobile-menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setNotifications([]);
    setShowUserDropdown(false);
    navigate("/");
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem("language", langCode);
    setShowLanguageDropdown(false);
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "seeker":
        return "/dashboard/seeker";
      case "admin":
        return "/admin";
      default:
        return "/dashboard/seeker";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "seeker":
        return <User className="w-4 h-4" />;
      case "admin":
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleName = (role) => {
    switch (role) {
      case "seeker":
        return "Job Seeker";
      case "admin":
        return "Administrator";
      default:
        return "User";
    }
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="navbar-logo"
                aria-label="JobBoard - Go to homepage"
              >
                <div className="logo-icon">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="logo-text">
                  <div className="logo-title">JobBoard</div>
                  <div className="logo-subtitle">Find your dream job</div>
                </div>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Professional Search Bar */}
              <div className="navbar-search">
                <div className="search-input-section">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search jobs, companies..."
                    className="search-input"
                    onFocus={() => navigate("/jobs")}
                  />
                </div>
                <div className="location-section">
                  <span>📍</span>
                  <select className="location-select">
                    <option value="">All Cities</option>
                    <option value="tashkent">Tashkent</option>
                    <option value="samarkand">Samarkand</option>
                    <option value="bukhara">Bukhara</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Language Selector */}
              <div className="language-dropdown">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="language-button"
                  aria-label="Select language"
                >
                  <span className="language-flag">{currentLang?.flag}</span>
                  <span className="hidden sm:block font-medium">
                    {currentLang?.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showLanguageDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showLanguageDropdown && (
                  <div className="language-dropdown-menu">
                    <div className="dropdown-header">
                      <div className="dropdown-header-content">
                        <Languages className="w-4 h-4 text-primary-600" />
                        <span className="dropdown-title">Choose Language</span>
                      </div>
                    </div>
                    <div className="py-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`language-option ${
                            currentLanguage === lang.code ? "active" : ""
                          }`}
                        >
                          <span className="language-flag">{lang.flag}</span>
                          <div className="language-info">
                            <div className="language-name">
                              {lang.nativeName}
                            </div>
                            <div className="language-native">{lang.name}</div>
                          </div>
                          {currentLanguage === lang.code && (
                            <div className="language-active-indicator">
                              <Check className="w-4 h-4 text-primary-600" />
                              <span className="active-label">Active</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="notifications-button"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifications > 0 && (
                      <span className="notification-badge">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="notifications-dropdown">
                      <div className="dropdown-header">
                        <div className="dropdown-header-content">
                          <Bell className="w-4 h-4 text-primary-600" />
                          <span className="dropdown-title">Notifications</span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`notification-item ${
                              !notification.read ? "unread" : ""
                            }`}
                          >
                            <div className="notification-icon">
                              {notification.icon}
                            </div>
                            <div className="notification-content">
                              <div className="notification-title">
                                {notification.title}
                              </div>
                              <div className="notification-message">
                                {notification.message}
                              </div>
                              <div className="notification-time">
                                {notification.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Menu or Auth Buttons */}
              {user ? (
                <div className="user-dropdown">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="user-button"
                    aria-haspopup="true"
                    aria-expanded={showUserDropdown}
                  >
                    <div className="user-avatar">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                      <div className="user-status" />
                    </div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-role">
                        {getRoleIcon(user.role)}
                        <span>{getRoleName(user.role)}</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        showUserDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showUserDropdown && (
                    <div className="user-dropdown-menu">
                      <div className="user-profile-header">
                        <div className="user-profile-info">
                          <div className="user-profile-avatar">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div className="user-profile-details">
                            <div className="user-profile-name">{user.name}</div>
                            <div className="user-profile-email">
                              {user.email}
                            </div>
                            <div className="user-profile-role">
                              {getRoleIcon(user.role)}
                              <span>{getRoleName(user.role)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {user.role === "seeker" && (
                        <div className="user-stats">
                          <div className="stats-grid">
                            <div className="stat-item">
                              <div className="stat-number">12</div>
                              <div className="stat-label">Applications</div>
                            </div>
                            <div className="stat-item">
                              <div className="stat-number">3</div>
                              <div className="stat-label">Interviews</div>
                            </div>
                            <div className="stat-item">
                              <div className="stat-number">85%</div>
                              <div className="stat-label">Profile</div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="dropdown-menu-section">
                        <Link
                          to={getDashboardLink()}
                          className="dropdown-menu-item"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                          <div className="menu-item-content">
                            <span>Dashboard</span>
                            <ChevronDown className="w-4 h-4 rotate-90" />
                          </div>
                        </Link>

                        {user.role === "seeker" && (
                          <>
                            <Link
                              to="/dashboard/seeker?tab=saved"
                              className="dropdown-menu-item"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Heart className="w-5 h-5 text-red-500" />
                              <div className="menu-item-content">
                                <span>Saved Jobs</span>
                                <span className="menu-item-badge badge-gray">
                                  5
                                </span>
                              </div>
                            </Link>
                            <Link
                              to="/dashboard/seeker?tab=applications"
                              className="dropdown-menu-item"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Briefcase className="w-5 h-5 text-green-600" />
                              <div className="menu-item-content">
                                <span>My Applications</span>
                                <span className="menu-item-badge badge-green">
                                  12
                                </span>
                              </div>
                            </Link>
                          </>
                        )}

                        {user.role === "employer" && (
                          <>
                            <Link
                              to="/dashboard/employer?tab=jobs"
                              className="dropdown-menu-item"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Briefcase className="w-5 h-5 text-blue-600" />
                              <div className="menu-item-content">
                                <span>My Job Posts</span>
                                <span className="menu-item-badge badge-blue">
                                  8
                                </span>
                              </div>
                            </Link>
                            <Link
                              to="/dashboard/employer?tab=applications"
                              className="dropdown-menu-item"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Users className="w-5 h-5 text-purple-600" />
                              <div className="menu-item-content">
                                <span>Applications</span>
                                <span className="menu-item-badge badge-red">
                                  24
                                </span>
                              </div>
                            </Link>
                          </>
                        )}

                        <div className="menu-divider" />

                        <Link
                          to="/profile"
                          className="dropdown-menu-item"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span>Settings & Privacy</span>
                        </Link>

                        <Link
                          to="/help"
                          className="dropdown-menu-item"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <HelpCircle className="w-5 h-5 text-gray-600" />
                          <span>Help & Support</span>
                        </Link>
                      </div>

                      <div className="menu-divider" />
                      <button
                        onClick={handleLogout}
                        className="dropdown-menu-item logout-item"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="auth-login">
                    Sign In
                  </Link>
                  <Link to="/register" className="auth-register">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-menu-button"
                aria-label="Toggle mobile menu"
              >
                <div className="mobile-menu-icon">
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Search, User, Settings, BookmarkIcon, LogOut, 
  Menu, X, ChevronDown, Bell, Building2, Users, 
  BarChart3, Shield, Briefcase, Globe, Check,
  Heart, MessageSquare, HelpCircle, Gift, Star,
  Zap, Crown, Palette, Moon, Sun, Languages,
  Megaphone, TrendingUp, Award, Target, Plus, Eye
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [user, setUser] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('uz')
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  // Language options
  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿', nativeName: 'O\'zbekcha' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' }
  ]

  // Mock user state and notifications
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      // Mock notifications for logged in users
      setNotifications([
        {
          id: 1,
          type: 'job_match',
          title: 'New job matches found!',
          message: '5 new jobs match your profile',
          time: '5 min ago',
          read: false,
          icon: <Briefcase className="w-5 h-5 text-blue-600" />
        },
        {
          id: 2,
          type: 'application',
          title: 'Application viewed',
          message: 'TechCorp viewed your application',
          time: '1 hour ago',
          read: false,
          icon: <Eye className="w-5 h-5 text-green-600" />
        },
        {
          id: 3,
          type: 'message',
          title: 'New message from recruiter',
          message: 'Sarah from StartupXYZ sent you a message',
          time: '2 hours ago',
          read: true,
          icon: <MessageSquare className="w-5 h-5 text-purple-600" />
        }
      ])
    }

    // Load saved language and theme
    const savedLanguage = localStorage.getItem('language') || 'uz'
    const savedTheme = localStorage.getItem('theme') || 'light'
    setCurrentLanguage(savedLanguage)
    setTheme(savedTheme)
  }, [])

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setShowUserDropdown(false)
      }
      if (!event.target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false)
      }
      if (!event.target.closest('.notifications-dropdown')) {
        setShowNotifications(false)
      }
      if (!event.target.closest('.mobile-menu')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setNotifications([])
    setShowUserDropdown(false)
    navigate('/')
  }

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode)
    localStorage.setItem('language', langCode)
    setShowLanguageDropdown(false)
    // In a real app, this would trigger translation system
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    // Apply theme class to document
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const getDashboardLink = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'seeker': return '/dashboard/seeker'
      case 'employer': return '/dashboard/employer'
      case 'admin': return '/admin'
      default: return '/dashboard/seeker'
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'seeker': return <User className="w-4 h-4" />
      case 'employer': return <Building2 className="w-4 h-4" />
      case 'admin': return <Shield className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getRoleName = (role) => {
    switch (role) {
      case 'seeker': return 'Job Seeker'
      case 'employer': return 'Employer'
      case 'admin': return 'Administrator'
      default: return 'User'
    }
  }

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path))
  }

  const navLinks = [
    { 
      path: '/', 
      label: 'Home', 
      icon: <Award className="w-4 h-4" />,
      description: 'Go to homepage'
    },
    { 
      path: '/jobs', 
      label: 'Jobs', 
      icon: <Briefcase className="w-4 h-4" />,
      description: 'Browse all jobs',
      badge: '50K+'
    },
    { 
      path: '/employers', 
      label: 'Companies', 
      icon: <Building2 className="w-4 h-4" />,
      description: 'Find employers'
    },
    // Role-based navigation
    ...(user?.role === 'admin' ? [
      { 
        path: '/admin', 
        label: 'Admin Panel', 
        icon: <Shield className="w-4 h-4" />,
        description: 'Manage platform'
      }
    ] : []),
    ...(user?.role === 'employer' ? [
      {
        path: '/post-job',
        label: 'Post Job',
        icon: <Plus className="w-4 h-4" />,
        description: 'Create new job posting',
        highlight: true
      }
    ] : [])
  ]

  const unreadNotifications = notifications.filter(n => !n.read).length
  const currentLang = languages.find(lang => lang.code === currentLanguage)

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white border-b border-gray-100'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="flex items-center space-x-3 group"
                aria-label="JobBoard - Go to homepage"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="relative z-10">J</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                  {scrolled && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    JobBoard
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors">
                    Find your dream job
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : link.highlight
                        ? 'text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {link.icon}
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="px-2 py-0.5 text-xs font-bold text-blue-600 bg-blue-100 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    
                    {/* Active indicator */}
                    {isActive(link.path) && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                    
                    {/* Hover tooltip */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {link.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Enhanced Search */}
              <div className="hidden xl:flex items-center">
                <div className="relative group">
                  <button 
                    onClick={() => navigate('/jobs')}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 group-hover:shadow-md"
                    aria-label="Search jobs"
                  >
                    <Search className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
                    <span className="hidden 2xl:block text-gray-500 group-hover:text-gray-700">Search jobs...</span>
                  </button>
                  <kbd className="absolute -top-8 right-0 px-2 py-1 text-xs text-gray-500 bg-white border border-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* Language Selector */}
              <div className="relative language-dropdown">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  aria-label="Select language"
                >
                  <span className="text-lg">{currentLang?.flag}</span>
                  <span className="hidden sm:block font-medium">{currentLang?.code.toUpperCase()}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-scale-in">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      Choose Language
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{lang.nativeName}</div>
                          <div className="text-xs text-gray-500">{lang.name}</div>
                        </div>
                        {currentLanguage === lang.code && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              {user && (
                <div className="relative notifications-dropdown">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-scale-in">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadNotifications > 0 && (
                          <span className="px-2 py-1 text-xs font-bold text-blue-600 bg-blue-100 rounded-full">
                            {unreadNotifications} new
                          </span>
                        )}
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                                !notification.read ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex-shrink-0 mt-1">
                                {notification.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500">
                            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p>No notifications yet</p>
                          </div>
                        )}
                      </div>
                      
                      {notifications.length > 0 && (
                        <div className="border-t border-gray-100 px-4 py-2">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Mark all as read
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* User Menu or Auth Buttons */}
              {user ? (
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                    aria-haspopup="true"
                    aria-expanded={showUserDropdown}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform duration-200">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <span>{getRoleName(user.role)}</span>
                      </div>
                    </div>
                    <ChevronDown className={`hidden lg:block w-4 h-4 text-gray-500 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Enhanced User Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-scale-in">
                      {/* User Profile Header */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                              {getRoleIcon(user.role)}
                              <span>{getRoleName(user.role)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats (for job seekers) */}
                      {user.role === 'seeker' && (
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-gray-900">12</div>
                              <div className="text-xs text-gray-500">Applications</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-gray-900">3</div>
                              <div className="text-xs text-gray-500">Interviews</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-gray-900">85%</div>
                              <div className="text-xs text-gray-500">Profile</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Navigation Items */}
                      <div className="py-2">
                        <Link
                          to={getDashboardLink()}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                          <span className="flex-1">Dashboard</span>
                          <ChevronDown className="w-4 h-4 rotate-90" />
                        </Link>

                        {/* Role-specific menu items */}
                        {user.role === 'seeker' && (
                          <>
                            <Link
                              to="/dashboard/seeker?tab=saved"
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Heart className="w-5 h-5 text-red-500" />
                              <span className="flex-1">Saved Jobs</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">5</span>
                            </Link>
                            <Link
                              to="/dashboard/seeker?tab=applications"
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Briefcase className="w-5 h-5 text-green-600" />
                              <span className="flex-1">My Applications</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">12</span>
                            </Link>
                          </>
                        )}

                        {user.role === 'employer' && (
                          <>
                            <Link
                              to="/dashboard/employer?tab=jobs"
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Briefcase className="w-5 h-5 text-blue-600" />
                              <span className="flex-1">My Job Posts</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">8</span>
                            </Link>
                            <Link
                              to="/dashboard/employer?tab=applications"
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Users className="w-5 h-5 text-purple-600" />
                              <span className="flex-1">Applications</span>
                              <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-full">24</span>
                            </Link>
                          </>
                        )}

                        <div className="border-t border-gray-100 my-2"></div>

                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span>Settings & Privacy</span>
                        </Link>

                        <Link
                          to="/help"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <HelpCircle className="w-5 h-5 text-gray-600" />
                          <span>Help & Support</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Enhanced Auth Buttons
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-xl hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 mobile-menu"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4 mobile-menu animate-slide-down">
              <div className="flex flex-col space-y-1">
                {/* Mobile Search */}
                <button 
                  onClick={() => {
                    navigate('/jobs')
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors mx-2"
                >
                  <Search className="w-5 h-5 text-blue-600" />
                  <span>Search Jobs</span>
                  <div className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">⌘K</div>
                </button>

                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-blue-600 bg-blue-50'
                        : link.highlight
                        ? 'text-white bg-gradient-to-r from-green-500 to-green-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.icon}
                    <span className="flex-1">{link.label}</span>
                    {link.badge && (
                      <span className="px-2 py-1 text-xs font-bold text-blue-600 bg-blue-100 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}

                {/* Mobile User Section */}
                {user ? (
                  <div className="border-t border-gray-100 pt-4 mt-4 mx-2">
                    {/* User Profile Header */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          {getRoleIcon(user.role)}
                          <span>{getRoleName(user.role)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile User Menu Items */}
                    <div className="space-y-1">
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <Settings className="w-5 h-5 text-gray-600" />
                        <span>Settings</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-gray-100 pt-4 mt-4 mx-2 space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all"
                    >
                      Get Started Free
                    </Link>
                  </div>
                )}

                {/* Mobile Language & Theme */}
                <div className="border-t border-gray-100 pt-4 mt-4 mx-2">
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Language</span>
                    </div>
                    <select
                      value={currentLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="text-sm text-gray-700 bg-transparent border-0 focus:outline-none"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.nativeName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {theme === 'light' ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                      <span>Theme</span>
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{theme}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar
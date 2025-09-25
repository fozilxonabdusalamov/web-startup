import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Search, User, Settings, BookmarkIcon, LogOut, 
  Menu, X, ChevronDown, Bell, Building2, Users, 
  BarChart3, Shield, Briefcase
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [user, setUser] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Mock user state - replace with real auth context
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setShowUserDropdown(false)
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
    setShowUserDropdown(false)
    navigate('/')
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
      case 'seeker': return <User size={16} />
      case 'employer': return <Building2 size={16} />
      case 'admin': return <Shield size={16} />
      default: return <User size={16} />
    }
  }

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path))
  }

  const navLinks = [
    { path: '/', label: 'Bosh sahifa' },
    { path: '/jobs', label: 'Vakansiyalar' },
    { path: '/employers', label: 'Ish beruvchilar' },
    // Add more links based on user role
    ...(user?.role === 'admin' ? [
      { path: '/admin', label: 'Admin Panel' }
    ] : [])
  ]

  return (
    <>
      <nav className={`sticky top-0 z-40 bg-white border-b transition-all duration-200 ${
        scrolled ? 'shadow-md border-gray-200' : 'border-gray-100'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                aria-label="JobBoard - Bosh sahifaga o'tish"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">
                  J
                </div>
                <span className="hidden sm:block">JobBoard</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                      isActive(link.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search (Desktop) */}
              <div className="hidden lg:flex">
                <button 
                  onClick={() => navigate('/jobs')}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  aria-label="Qidiruv"
                >
                  <Search size={16} />
                  <span className="hidden xl:block">Qidiruv...</span>
                </button>
              </div>

              {/* Notifications (if logged in) */}
              {user && (
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
                    <span className="sr-only">Yangi bildirishnomalar</span>
                  </span>
                </button>
              )}

              {/* User Menu */}
              {user ? (
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={showUserDropdown}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500 capitalize flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <span>{user.role === 'seeker' ? 'Ish izlovchi' : user.role === 'employer' ? 'Ish beruvchi' : 'Admin'}</span>
                      </div>
                    </div>
                    <ChevronDown size={16} className={`hidden sm:block text-gray-500 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="py-2">
                        <Link
                          to={getDashboardLink()}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <BarChart3 size={16} />
                          <span>Dashboard</span>
                        </Link>

                        {user.role === 'seeker' && (
                          <>
                            <Link
                              to="/dashboard/seeker?tab=saved"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <BookmarkIcon size={16} />
                              <span>Saqlangan vakansiyalar</span>
                            </Link>
                            <Link
                              to="/dashboard/seeker?tab=applications"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Briefcase size={16} />
                              <span>Mening arizalarim</span>
                            </Link>
                          </>
                        )}

                        {user.role === 'employer' && (
                          <>
                            <Link
                              to="/dashboard/employer?tab=jobs"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Briefcase size={16} />
                              <span>Mening vakansiyalarim</span>
                            </Link>
                            <Link
                              to="/dashboard/employer?tab=applications"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setShowUserDropdown(false)}
                            >
                              <Users size={16} />
                              <span>Arizalar</span>
                            </Link>
                          </>
                        )}

                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Settings size={16} />
                          <span>Profil sozlamalari</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          <span>Chiqish</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Auth Buttons
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Kirish
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-sm"
                  >
                    Ro'yxatdan o'tish
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mobile-menu"
                aria-label="Menyuni ochish/yopish"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 mobile-menu">
              <div className="flex flex-col space-y-2">
                {/* Search (Mobile) */}
                <button 
                  onClick={() => {
                    navigate('/jobs')
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Search size={20} />
                  <span>Qidiruv</span>
                </button>

                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile User Menu */}
                {user ? (
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center space-x-3 px-4 py-2 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 capitalize flex items-center space-x-1">
                          {getRoleIcon(user.role)}
                          <span>{user.role === 'seeker' ? 'Ish izlovchi' : user.role === 'employer' ? 'Ish beruvchi' : 'Admin'}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={getDashboardLink()}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <BarChart3 size={16} />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <Settings size={16} />
                      <span>Profil</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut size={16} />
                      <span>Chiqish</span>
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      Kirish
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center"
                    >
                      Ro'yxatdan o'tish
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar

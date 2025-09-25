import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Building2, Users, CheckCircle, Shield, Zap, Star, Globe } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const location = useLocation()
  
  // Get redirect path from location state
  const from = location.state?.from?.pathname || '/'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email kiriting'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email formatini to\'g\'ri kiriting'
    }

    if (!formData.password) {
      newErrors.password = 'Parol kiriting'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parol kamida 6 belgidan iborat bo\'lishi kerak'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful login
      if (formData.email === 'admin@jobboard.uz') {
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          name: 'Admin User',
          email: formData.email,
          role: 'admin'
        }))
        navigate('/admin')
      } else if (formData.email.includes('employer')) {
        localStorage.setItem('user', JSON.stringify({
          id: 2,
          name: 'Employer User',
          email: formData.email,
          role: 'employer'
        }))
        navigate('/dashboard/employer')
      } else {
        localStorage.setItem('user', JSON.stringify({
          id: 3,
          name: 'Seeker User',
          email: formData.email,
          role: 'seeker'
        }))
        navigate(from)
      }
      
    } catch (err) {
      console.error('Login error:', err)
      setErrors({ submit: 'Kirish parolda xatolik yuz berdi. Qayta urinib ko\'ring.' })
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Xavfsiz platform',
      description: 'Ma\'lumotlaringiz ishonchli himoyada'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Tez natija',
      description: 'Bir necha daqiqada ish toping'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Sifatli vakansiyalar',
      description: 'Yetakchi kompaniyalardan takliflar'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global imkoniyatlar',
      description: 'Dunyodagi eng yaxshi ishlar'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="hidden lg:block">
            <div className="max-w-xl">
              {/* Logo/Brand */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  JobBoard
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-dark mb-8 leading-tight">
                Karyerangizni
                <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  rivojlantiring
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Minglab vakansiyalar va top kompaniyalar sizni kutmoqda. 
                Bugun orzuyingizda ishni boshlang!
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-primary-600 group-hover:text-accent-600 transition-colors duration-300 mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold text-lg text-dark mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                    50K+
                  </div>
                  <div className="text-gray-600 font-medium">Faol foydalanuvchi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                    10K+
                  </div>
                  <div className="text-gray-600 font-medium">Muvaffaqiyatli joylashish</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100 backdrop-blur-sm bg-white/95">
              
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  JobBoard
                </span>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-3">Xush kelibsiz!</h2>
                <p className="text-gray-600 text-lg">
                  Hisobingizga kirish uchun ma'lumotlaringizni kiriting
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-red-800 text-sm">{errors.submit}</p>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-dark mb-3">
                      Email manzil
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                          errors.email ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 mt-2 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-dark mb-3">
                      Parol
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                          errors.password ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Parolingizni kiriting"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 mt-2 text-sm">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <span className="ml-3 text-gray-700 font-medium">Eslab qolish</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-primary-600 hover:text-primary-700 font-semibold transition-colors text-sm"
                  >
                    Parolni unutdingizmi?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Kirilmoqda...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Kirish</span>
                      <ArrowRight size={20} className="ml-2" />
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  Hisobingiz yo'qmi?{' '}
                  <Link
                    to="/register"
                    className="text-primary-600 hover:text-primary-700 font-bold transition-colors"
                  >
                    Ro'yxatdan o'tish
                  </Link>
                </p>
              </div>

              {/* Demo Accounts */}
              <div className="mt-6 p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-200">
                <p className="text-xs font-semibold text-primary-800 text-center mb-2">Demo uchun:</p>
                <div className="text-xs text-primary-700 space-y-1 text-center">
                  <div>Admin: admin@jobboard.uz | Parol: test123</div>
                  <div>Ish beruvchi: employer@test.com | Parol: test123</div>
                  <div>Ish izlovchi: seeker@test.com | Parol: test123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

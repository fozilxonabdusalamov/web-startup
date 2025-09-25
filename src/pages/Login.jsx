import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Building2, Users, CheckCircle } from 'lucide-react'

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
      icon: <User size={24} />,
      title: 'Shaxsiy profil',
      description: 'To\'liq profil yarating va tajribangizni ko\'rsating'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Tez ariza topshirish',
      description: 'Bir klikda vakansiyalarga ariza topshiring'
    },
    {
      icon: <Building2 size={24} />,
      title: 'Kompaniya ma\'lumotlari',
      description: 'Ish beruvchilar haqida batafsil ma\'lumot oling'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-16">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Benefits */}
            <div className="hidden lg:block">
              <div className="max-w-xl">
                <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Karyerangizni rivojlantiring
                </h1>
                <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
                  Minglab vakansiyalarga kirish imkoniyatini qo'lga kiriting
                </p>

                <div className="space-y-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-6">
                      <div className="flex-shrink-0 text-primary-600 bg-primary-100 p-3 rounded-xl">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-lg">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl border border-primary-200 shadow-lg">
                  <div className="flex items-center space-x-3 text-primary-700 mb-3">
                    <Users size={24} />
                    <span className="font-bold text-xl">50,000+ ish izlovchi</span>
                  </div>
                  <p className="text-primary-800 text-lg">
                    Bizga qo'shiling va orzuyingizda ishni toping!
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-10 border border-primary-100">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Hisobga kirish</h2>
                  <p className="text-gray-600 text-lg">
                    Hisobingizga kirish uchun ma'lumotlaringizni kiriting
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-800">{errors.submit}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-3">
                      Email manzil
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-lg ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 mt-2">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-3">
                      Parol
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-14 pr-14 py-5 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-lg ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="Parolingizni kiriting"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 mt-2">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-3 text-gray-600 font-medium">Eslab qolish</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                    >
                      Parolni unutdingizmi?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-600 text-lg">
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
                <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200">
                  <p className="text-sm font-semibold text-primary-800 text-center mb-3">Demo uchun:</p>
                  <div className="text-sm text-primary-700 space-y-2">
                    <div className="font-medium">Admin: admin@jobboard.uz</div>
                    <div className="font-medium">Ish beruvchi: employer@test.com</div>
                    <div className="font-medium">Ish izlovchi: seeker@test.com</div>
                    <div className="font-medium">Parol: test123</div>
                  </div>
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

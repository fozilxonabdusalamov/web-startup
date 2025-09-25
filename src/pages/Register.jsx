import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, ArrowRight, CheckCircle, Users, Briefcase } from 'lucide-react'

const Register = () => {
  const [userType, setUserType] = useState('seeker') // 'seeker' or 'employer'
  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
    // Employer specific
    companyName: '',
    companySize: '',
    industry: '',
    // Seeker specific
    experience: '',
    skills: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)

  const navigate = useNavigate()

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

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!userType) {
        newErrors.userType = 'Foydalanuvchi turini tanlang'
      }
      if (!formData.fullName) {
        newErrors.fullName = 'To\'liq ismni kiriting'
      }
      if (!formData.email) {
        newErrors.email = 'Email kiriting'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email formatini to\'g\'ri kiriting'
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Parol kiriting'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Parol kamida 8 belgidan iborat bo\'lishi kerak'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Parolda kichik harf, katta harf va raqam bo\'lishi kerak'
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Parollar mos kelmaydi'
      }

      if (!formData.phone) {
        newErrors.phone = 'Telefon raqamini kiriting'
      }

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'Shartlarni qabul qilishingiz shart'
      }
    }

    if (step === 3) {
      if (userType === 'employer') {
        if (!formData.companyName) {
          newErrors.companyName = 'Kompaniya nomini kiriting'
        }
        if (!formData.companySize) {
          newErrors.companySize = 'Kompaniya hajmini tanlang'
        }
        if (!formData.industry) {
          newErrors.industry = 'Sohani tanlang'
        }
      } else {
        if (!formData.experience) {
          newErrors.experience = 'Tajriba darajasini tanlang'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(currentStep)) return

    setLoading(true)

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful registration
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        name: formData.fullName,
        email: formData.email,
        role: userType
      }))

      // Navigate to appropriate dashboard
      if (userType === 'employer') {
        navigate('/dashboard/employer')
      } else {
        navigate('/dashboard/seeker')
      }
      
    } catch {
      setErrors({ submit: 'Ro\'yxatdan o\'tishda xatolik yuz berdi. Qayta urinib ko\'ring.' })
    } finally {
      setLoading(false)
    }
  }

  const companySizes = [
    '1-10 xodim',
    '11-50 xodim',
    '51-200 xodim',
    '201-500 xodim',
    '500+ xodim'
  ]

  const industries = [
    'IT va Texnologiya',
    'Moliya va Banking',
    'Ta\'lim',
    'Marketing',
    'Sog\'liqni saqlash',
    'Qurilish',
    'Savdo',
    'Transport',
    'Boshqa'
  ]

  const experienceLevels = [
    'Yangi boshlovchi',
    'Junior (1-2 yil)',
    'Mid (2-5 yil)',
    'Senior (5+ yil)',
    'Lead/Manager'
  ]

  const steps = [
    { number: 1, title: 'Asosiy ma\'lumotlar' },
    { number: 2, title: 'Xavfsizlik' },
    { number: 3, title: 'Qo\'shimcha' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${
                    currentStep >= step.number
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle size={24} />
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1 mx-3 rounded-full ${
                      currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {steps[currentStep - 1].title}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-primary-100">
            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                  <p className="text-red-800">{errors.submit}</p>
                </div>
              )}

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  {/* User Type Selection */}
                  <div>
                    <label className="block text-xl font-bold text-gray-700 mb-6">
                      Siz kimsiz? *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button
                        type="button"
                        onClick={() => setUserType('seeker')}
                        className={`p-8 border-2 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                          userType === 'seeker'
                            ? 'border-primary-500 bg-primary-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <Users size={32} className={userType === 'seeker' ? 'text-primary-600' : 'text-gray-400'} />
                          <div>
                            <div className="font-bold text-xl text-gray-900">Ish izlovchi</div>
                            <div className="text-gray-600 text-lg">Vakansiyalar izlayapman</div>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setUserType('employer')}
                        className={`p-8 border-2 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                          userType === 'employer'
                            ? 'border-primary-500 bg-primary-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <Briefcase size={32} className={userType === 'employer' ? 'text-primary-600' : 'text-gray-400'} />
                          <div>
                            <div className="font-bold text-xl text-gray-900">Ish beruvchi</div>
                            <div className="text-gray-600 text-lg">Xodim izlayapman</div>
                          </div>
                        </div>
                      </button>
                    </div>
                    {errors.userType && (
                      <p className="text-red-600 mt-2">{errors.userType}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-lg font-bold text-gray-700 mb-3">
                      To'liq ism *
                    </label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`input pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                        placeholder="Ismingiz va familiyangiz"
                        required
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email manzil *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Security */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Parol *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="Kamida 8 ta belgidan iborat"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      Parolda kichik harf, katta harf va raqam bo'lishi kerak
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Parolni tasdiqlash *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`input pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="Parolni qayta kiriting"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon raqam *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`input pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+998 90 123 45 67"
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className={`mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                          errors.agreeTerms ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      <span className="text-sm text-gray-600">
                        Men{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                          foydalanish shartlari
                        </Link>
                        {' '}va{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                          maxfiylik siyosati
                        </Link>
                        ni qabul qilaman *
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <p className="text-red-600 text-sm mt-1">{errors.agreeTerms}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Additional Info */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {userType === 'employer' ? (
                    <>
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                          Kompaniya nomi *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={`input pl-10 ${errors.companyName ? 'border-red-500' : ''}`}
                            placeholder="Kompaniya nomini kiriting"
                            required
                          />
                        </div>
                        {errors.companyName && (
                          <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                          Kompaniya hajmi *
                        </label>
                        <select
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          className={`input ${errors.companySize ? 'border-red-500' : ''}`}
                          required
                        >
                          <option value="">Tanlang</option>
                          {companySizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                        {errors.companySize && (
                          <p className="text-red-600 text-sm mt-1">{errors.companySize}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                          Soha *
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className={`input ${errors.industry ? 'border-red-500' : ''}`}
                          required
                        >
                          <option value="">Tanlang</option>
                          {industries.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                        {errors.industry && (
                          <p className="text-red-600 text-sm mt-1">{errors.industry}</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                          Tajriba darajasi *
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className={`input ${errors.experience ? 'border-red-500' : ''}`}
                          required
                        >
                          <option value="">Tanlang</option>
                          {experienceLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                        {errors.experience && (
                          <p className="text-red-600 text-sm mt-1">{errors.experience}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                          Asosiy ko'nikmalar (ixtiyoriy)
                        </label>
                        <textarea
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          rows="3"
                          className="input"
                          placeholder="JavaScript, React, Node.js, va hokazo..."
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-outline"
                  >
                    Orqaga
                  </button>
                )}

                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-primary"
                    >
                      Keyingisi
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Ro'yxatdan o'tilmoqda...
                        </div>
                      ) : (
                        <>
                          Ro'yxatdan o'tish
                          <ArrowRight size={16} className="ml-2" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Hisobingiz bormi?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Kirish
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

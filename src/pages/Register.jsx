import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, Building2, ArrowRight, CheckCircle, 
  Users, Briefcase, Sparkles, Shield, Zap, Trophy, Target, ArrowLeft 
} from 'lucide-react'

const Register = () => {
  const [userType, setUserType] = useState('') // 'seeker' or 'employer'
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
    }

    if (step === 2) {
      if (!formData.fullName) {
        newErrors.fullName = 'To\'liq ismni kiriting'
      }
      if (!formData.email) {
        newErrors.email = 'Email kiriting'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email formatini to\'g\'ri kiriting'
      }
      if (!formData.phone) {
        newErrors.phone = 'Telefon raqamini kiriting'
      }
    }

    if (step === 3) {
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

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'Shartlarni qabul qilishingiz shart'
      }
    }

    if (step === 4) {
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
    { number: 1, title: 'Hisob turi', subtitle: 'Kim siz?' },
    { number: 2, title: 'Asosiy ma\'lumotlar', subtitle: 'Shaxsiy ma\'lumotlar' },
    { number: 3, title: 'Xavfsizlik', subtitle: 'Parol va telefon' },
    { number: 4, title: 'Qo\'shimcha', subtitle: 'Professional ma\'lumotlar' }
  ]

  const benefits = {
    seeker: [
      {
        icon: <Target className="w-6 h-6" />,
        title: 'Maqsadli qidiruv',
        description: 'Siz uchun maxsus tanlanган vakansiyalar'
      },
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Tez ariza',
        description: 'Bir klikda vakansiyaga ariza topshiring'
      },
      {
        icon: <Trophy className="w-6 h-6" />,
        title: 'Karyera rivojlantirish',
        description: 'Professional o\'sish uchun resurslar'
      }
    ],
    employer: [
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Keng nomzodlar bazasi',
        description: 'Minglab malakali mutaxassislar'
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: 'Ishonchli saralash',
        description: 'Professional filter va test tizimi'
      },
      {
        icon: <Sparkles className="w-6 h-6" />,
        title: 'Premium xizmatlar',
        description: 'Reklama va maxsus takliflar'
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              JobBoard
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-4">
            Bizga qo'shiling!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Karyerangizni keyingi bosqichga olib chiqing
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 lg:space-x-8 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center min-w-max">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-200'
                      : currentStep === step.number - 1
                      ? 'bg-primary-100 text-primary-600 border-2 border-primary-300'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle size={24} />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`font-semibold text-sm ${
                      currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400">{step.subtitle}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 lg:w-16 h-1 mx-2 lg:mx-4 rounded-full transition-all duration-300 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-primary-600 to-accent-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-8 lg:p-12">
              <form onSubmit={handleSubmit}>
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 flex items-start space-x-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-red-800">{errors.submit}</p>
                  </div>
                )}

                {/* Step 1: User Type Selection */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-dark mb-3">Siz kimsiz?</h2>
                      <p className="text-gray-600 text-lg">Sizga mos xizmatlarni taqdim etish uchun</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      <button
                        type="button"
                        onClick={() => setUserType('seeker')}
                        className={`group p-8 border-2 rounded-3xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                          userType === 'seeker'
                            ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 shadow-xl shadow-primary-200'
                            : 'border-gray-200 hover:border-primary-300 hover:shadow-xl'
                        }`}
                      >
                        <div className="flex items-start space-x-6">
                          <div className={`p-4 rounded-2xl transition-all duration-300 ${
                            userType === 'seeker' 
                              ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white' 
                              : 'bg-gray-100 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600'
                          }`}>
                            <Users size={32} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-2xl text-dark mb-3">Ish izlovchi</h3>
                            <p className="text-gray-600 text-lg mb-6">
                              Orzuingizdagi ish va karyera imkoniyatlarini qidiraman
                            </p>
                            {userType === 'seeker' && (
                              <div className="space-y-3">
                                {benefits.seeker.map((benefit, index) => (
                                  <div key={index} className="flex items-center space-x-3">
                                    <div className="text-primary-600">
                                      {benefit.icon}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-dark text-sm">{benefit.title}</div>
                                      <div className="text-gray-600 text-xs">{benefit.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setUserType('employer')}
                        className={`group p-8 border-2 rounded-3xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                          userType === 'employer'
                            ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 shadow-xl shadow-primary-200'
                            : 'border-gray-200 hover:border-primary-300 hover:shadow-xl'
                        }`}
                      >
                        <div className="flex items-start space-x-6">
                          <div className={`p-4 rounded-2xl transition-all duration-300 ${
                            userType === 'employer' 
                              ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white' 
                              : 'bg-gray-100 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600'
                          }`}>
                            <Briefcase size={32} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-2xl text-dark mb-3">Ish beruvchi</h3>
                            <p className="text-gray-600 text-lg mb-6">
                              Malakali xodimlar va eng yaxshi kadrlarni topaman
                            </p>
                            {userType === 'employer' && (
                              <div className="space-y-3">
                                {benefits.employer.map((benefit, index) => (
                                  <div key={index} className="flex items-center space-x-3">
                                    <div className="text-primary-600">
                                      {benefit.icon}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-dark text-sm">{benefit.title}</div>
                                      <div className="text-gray-600 text-xs">{benefit.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    {errors.userType && (
                      <p className="text-red-600 text-center">{errors.userType}</p>
                    )}
                  </div>
                )}

                {/* Step 2: Basic Information */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-dark mb-3">Asosiy ma'lumotlar</h2>
                      <p className="text-gray-600 text-lg">Sizni tanib olishimiz uchun</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                      <div className="md:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-bold text-dark mb-3">
                          To'liq ism *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                              errors.fullName ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="Ismingiz va familiyangiz"
                            required
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-red-600 text-sm mt-2">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-dark mb-3">
                          Email manzil *
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
                          <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-dark mb-3">
                          Telefon raqam *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                              errors.phone ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="+998 90 123 45 67"
                            required
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-2">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Security */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-dark mb-3">Xavfsizlik</h2>
                      <p className="text-gray-600 text-lg">Hisobingizni himoya qilish uchun</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                      <div>
                        <label htmlFor="password" className="block text-sm font-bold text-dark mb-3">
                          Parol *
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
                            placeholder="Kamida 8 ta belgidan iborat"
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
                          <p className="text-red-600 text-sm mt-2">{errors.password}</p>
                        )}
                        <p className="text-gray-500 text-xs mt-2">
                          Parolda kichik harf, katta harf va raqam bo'lishi kerak
                        </p>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-bold text-dark mb-3">
                          Parolni tasdiqlash *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                              errors.confirmPassword ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="Parolni qayta kiriting"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-600 text-sm mt-2">{errors.confirmPassword}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="flex items-start space-x-4 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className={`mt-1 w-5 h-5 text-primary-600 border-2 border-gray-300 rounded-lg focus:ring-primary-500 focus:ring-2 transition-all ${
                              errors.agreeTerms ? 'border-red-500' : ''
                            }`}
                            required
                          />
                          <span className="text-gray-600 group-hover:text-gray-700 transition-colors">
                            Men{' '}
                            <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-semibold">
                              foydalanish shartlari
                            </Link>
                            {' '}va{' '}
                            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-semibold">
                              maxfiylik siyosati
                            </Link>
                            ni qabul qilaman *
                          </span>
                        </label>
                        {errors.agreeTerms && (
                          <p className="text-red-600 text-sm mt-2">{errors.agreeTerms}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Additional Info */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-dark mb-3">Qo'shimcha ma'lumotlar</h2>
                      <p className="text-gray-600 text-lg">
                        {userType === 'employer' ? 'Kompaniyangiz haqida' : 'Professional ma\'lumotlaringiz'}
                      </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                      {userType === 'employer' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label htmlFor="companyName" className="block text-sm font-bold text-dark mb-3">
                              Kompaniya nomi *
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                                  errors.companyName ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                                }`}
                                placeholder="Kompaniya nomini kiriting"
                                required
                              />
                            </div>
                            {errors.companyName && (
                              <p className="text-red-600 text-sm mt-2">{errors.companyName}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="companySize" className="block text-sm font-bold text-dark mb-3">
                              Kompaniya hajmi *
                            </label>
                            <select
                              id="companySize"
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleChange}
                              className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                                errors.companySize ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                              }`}
                              required
                            >
                              <option value="">Tanlang</option>
                              {companySizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                            {errors.companySize && (
                              <p className="text-red-600 text-sm mt-2">{errors.companySize}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="industry" className="block text-sm font-bold text-dark mb-3">
                              Soha *
                            </label>
                            <select
                              id="industry"
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                                errors.industry ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                              }`}
                              required
                            >
                              <option value="">Tanlang</option>
                              {industries.map(industry => (
                                <option key={industry} value={industry}>{industry}</option>
                              ))}
                            </select>
                            {errors.industry && (
                              <p className="text-red-600 text-sm mt-2">{errors.industry}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="experience" className="block text-sm font-bold text-dark mb-3">
                              Tajriba darajasi *
                            </label>
                            <select
                              id="experience"
                              name="experience"
                              value={formData.experience}
                              onChange={handleChange}
                              className={`w-full px-4 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white ${
                                errors.experience ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                              }`}
                              required
                            >
                              <option value="">Tanlang</option>
                              {experienceLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                              ))}
                            </select>
                            {errors.experience && (
                              <p className="text-red-600 text-sm mt-2">{errors.experience}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="skills" className="block text-sm font-bold text-dark mb-3">
                              Asosiy ko'nikmalar (ixtiyoriy)
                            </label>
                            <textarea
                              id="skills"
                              name="skills"
                              value={formData.skills}
                              onChange={handleChange}
                              rows="4"
                              className="w-full px-4 py-4 rounded-2xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-base bg-gray-50 focus:bg-white border-gray-200 hover:border-gray-300"
                              placeholder="JavaScript, React, Node.js, Python, va hokazo..."
                            />
                            <p className="text-gray-500 text-xs mt-2">
                              Ko'nikmalaringizni vergul bilan ajrating
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-700 font-semibold transition-colors"
                    >
                      <ArrowLeft size={20} className="mr-2" />
                      Orqaga
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <div>
                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentStep === 1 && !userType}
                        className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 shadow-lg flex items-center"
                      >
                        Keyingisi
                        <ArrowRight size={20} className="ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 shadow-lg"
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                            Ro'yxatdan o'tilmoqda...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            Ro'yxatdan o'tish
                            <CheckCircle size={20} className="ml-2" />
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Hisobingiz bormi?{' '}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-bold transition-colors"
            >
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

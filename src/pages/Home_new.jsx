import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Search, MapPin, Briefcase, Users, Building2, TrendingUp, 
  ArrowRight, Star, CheckCircle, Play, Award, Globe,
  Clock, DollarSign, Filter, ChevronRight, Zap, Shield,
  Target, Heart, Code, Palette, BookOpen, Headphones,
  Calculator, Truck, Stethoscope, Hammer, Camera, Music,
  Coffee, Lightbulb, PieChart, BarChart3, UserCheck,
  Sparkles, Trophy, Rocket, Eye, ThumbsUp, MessageSquare
} from 'lucide-react'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState({})
  const [testimonials, setTestimonials] = useState([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const statsRef = useRef(null)

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Mock data
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setFeaturedJobs([
        {
          id: 1,
          title: 'Senior React Developer',
          company: 'TechSoft LLC',
          logo: '🚀',
          location: 'Toshkent',
          type: 'To\'liq vaqt',
          salary: '$2000-3000',
          postedAt: '2024-01-15',
          isNew: true,
          isFeatured: true,
          skills: ['React', 'TypeScript', 'Node.js']
        },
        {
          id: 2,
          title: 'UI/UX Designer',
          company: 'Design Studio',
          logo: '🎨',
          location: 'Samarqand',
          type: 'Masofaviy',
          salary: '$1500-2000',
          postedAt: '2024-01-14',
          isNew: true,
          isFeatured: true,
          skills: ['Figma', 'Adobe XD', 'Prototyping']
        },
        {
          id: 3,
          title: 'Marketing Manager',
          company: 'Growth Agency',
          logo: '📈',
          location: 'Toshkent',
          type: 'To\'liq vaqt',
          salary: '$1800-2500',
          postedAt: '2024-01-13',
          isNew: false,
          isFeatured: true,
          skills: ['Digital Marketing', 'Analytics', 'Strategy']
        },
        {
          id: 4,
          title: 'DevOps Engineer',
          company: 'Cloud Solutions',
          logo: '☁️',
          location: 'Namangan',
          type: 'Gibrid',
          salary: '$2500-3500',
          postedAt: '2024-01-12',
          isNew: false,
          isFeatured: true,
          skills: ['AWS', 'Docker', 'Kubernetes']
        },
        {
          id: 5,
          title: 'Data Scientist',
          company: 'AI Innovations',
          logo: '🤖',
          location: 'Toshkent',
          type: 'To\'liq vaqt',
          salary: '$2200-3200',
          postedAt: '2024-01-11',
          isNew: false,
          isFeatured: true,
          skills: ['Python', 'Machine Learning', 'SQL']
        },
        {
          id: 6,
          title: 'Mobile Developer',
          company: 'App Factory',
          logo: '📱',
          location: 'Andijon',
          type: 'Masofaviy',
          salary: '$1800-2800',
          postedAt: '2024-01-10',
          isNew: false,
          isFeatured: true,
          skills: ['Flutter', 'React Native', 'iOS']
        }
      ])

      setCategories([
        { id: 1, name: 'IT va Texnologiya', slug: 'it', icon: Code, jobs: 12450, color: 'bg-blue-100 text-blue-800' },
        { id: 2, name: 'Dizayn', slug: 'design', icon: Palette, jobs: 3240, color: 'bg-purple-100 text-purple-800' },
        { id: 3, name: 'Marketing', slug: 'marketing', icon: Target, jobs: 5680, color: 'bg-green-100 text-green-800' },
        { id: 4, name: 'Moliya', slug: 'finance', icon: Calculator, jobs: 4320, color: 'bg-yellow-100 text-yellow-800' },
        { id: 5, name: 'Ta\'lim', slug: 'education', icon: BookOpen, jobs: 2890, color: 'bg-indigo-100 text-indigo-800' },
        { id: 6, name: 'Sog\'liqni saqlash', slug: 'healthcare', icon: Stethoscope, jobs: 1650, color: 'bg-red-100 text-red-800' },
        { id: 7, name: 'Qurilish', slug: 'construction', icon: Hammer, jobs: 2340, color: 'bg-orange-100 text-orange-800' },
        { id: 8, name: 'Qo\'llab-quvvatlash', slug: 'support', icon: Headphones, jobs: 1890, color: 'bg-teal-100 text-teal-800' }
      ])

      setStats({
        totalJobs: 48750,
        totalUsers: 185420,
        totalCompanies: 4850,
        successRate: 94
      })

      setTestimonials([
        {
          id: 1,
          name: 'Aziza Karimova',
          role: 'Frontend Developer',
          company: 'TechCorp',
          avatar: '👩‍💻',
          rating: 5,
          text: 'JobBoard orqali orzuimdagi ishni topdim. Platforma juda qulay va professional.',
          duration: '2 hafta ichida ish topdim'
        },
        {
          id: 2,
          name: 'Bobur Rahimov',
          role: 'Marketing Manager',
          company: 'Growth Agency',
          avatar: '👨‍💼',
          rating: 5,
          text: 'Ajoyib platform! Ko\'plab sifatli vakansiyalar va oson qidiruv tizimi.',
          duration: '1 oy ichida 3 ta taklif oldim'
        },
        {
          id: 3,
          name: 'Nilufar Sodiqova',
          role: 'UX Designer',
          company: 'Design Studio',
          avatar: '👩‍🎨',
          rating: 5,
          text: 'Eng yaxshi ish qidirish platformasi. Har doim yangi imkoniyatlar bor.',
          duration: 'Dream job topildi!'
        }
      ])
    }, 500)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials.length])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.append('query', searchQuery)
    if (location) params.append('location', location)
    navigate(`/jobs?${params.toString()}`)
  }

  const quickSearchTags = [
    'React Developer', 'UX Designer', 'Project Manager', 
    'Data Scientist', 'DevOps Engineer', 'Marketing Manager'
  ]

  const features = [
    {
      icon: Zap,
      title: 'Tez qidiruv',
      description: 'AI yordamida eng mos vakansiyalarni toping',
      color: 'text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Xavfsizlik',
      description: 'Ma\'lumotlaringiz 100% himoyalangan',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Katta jamoa',
      description: '200,000+ faol foydalanuvchi',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      title: 'Yuqori sifat',
      description: 'Faqat tekshirilgan vakansiyalar',
      color: 'text-purple-600'
    }
  ]

  const benefits = [
    {
      icon: Target,
      title: 'Personallashtirilgan qidiruv',
      description: 'AI sizning ko\'nikmalaringiz va tajribangizga mos vakansiyalarni taklif qiladi'
    },
    {
      icon: Rocket,
      title: 'Tez ariza berish',
      description: 'Bir klikda ko\'plab vakansiyalarga ariza yuboring'
    },
    {
      icon: Heart,
      title: 'Karyera maslahatları',
      description: 'Ekspertlardan bepul karyera rivojlantirish bo\'yicha maslahatlar'
    },
    {
      icon: Globe,
      title: 'Global imkoniyatlar',
      description: 'Mahalliy va xalqaro kompaniyalardagi vakansiyalar'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-32 -right-32 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-16 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>O'zbekistondagi #1 ish qidirish platformasi</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Orzuyingizdagi
                </span>
                <br />
                <span>ishni toping</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                50,000+ vakansiya, 5,000+ kompaniya va minglab muvaffaqiyat hikoyas 
                sizni kutmoqda. Professional karyerangizni bugun boshlang.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl p-2 shadow-xl max-w-4xl mx-auto mb-8">
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Lavozim, kalit so'z yoki kompaniya"
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:outline-none rounded-xl"
                  />
                </div>
                
                <div className="lg:w-80 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Shahar yoki viloyat"
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:outline-none rounded-xl"
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all hover:shadow-lg transform hover:scale-105"
                >
                  <span className="hidden lg:block">Qidiruv</span>
                  <Search className="lg:hidden" size={20} />
                </button>
              </div>
            </form>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="text-gray-600 text-sm font-medium">Mashhur qidiruvlar:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag)
                    navigate(`/jobs?query=${encodeURIComponent(tag)}`)
                  }}
                  className="px-4 py-2 bg-white/80 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full text-sm font-medium transition-all hover:shadow-md"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { label: 'Faol vakansiyalar', value: '48K+', icon: Briefcase },
                { label: 'Kompaniyalar', value: '4.8K+', icon: Building2 },
                { label: 'Foydalanuvchilar', value: '185K+', icon: Users },
                { label: 'Muvaffaqiyat %', value: '94%', icon: Trophy }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="text-blue-600" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nega aynan JobBoard?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Eng zamonaviy texnologiyalar va professional yondashuv bilan 
              ish qidirish jarayonini osonlashtirdik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                data-animate
                id={`feature-${index}`}
                className={`text-center p-6 rounded-xl transition-all duration-500 hover:shadow-lg transform hover:-translate-y-2 ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center`}>
                  <feature.icon className={`${feature.color}`} size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Tanlangan vakansiyalar
              </h2>
              <p className="text-lg text-gray-600">
                Eng yaxshi kompaniyalardan maxsus tanlov
              </p>
            </div>
            <Link
              to="/jobs?featured=true"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <span>Barchasini ko'rish</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <div
                key={job.id}
                data-animate
                id={`job-${index}`}
                className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group ${
                  isVisible[`job-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{job.logo}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  {job.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      Yangi
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={14} className="mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock size={14} className="mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <DollarSign size={14} className="mr-2" />
                    {job.salary}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills?.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-gray-500 text-sm">
                    {Math.floor((Date.now() - new Date(job.postedAt).getTime()) / (1000 * 60 * 60 * 24))} kun oldin
                  </span>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Batafsil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kategoriyalar bo'yicha qidiring
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              O'zingizga mos sohada minglab vakansiyalar
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/jobs?category=${category.slug}`}
                data-animate
                id={`category-${index}`}
                className={`group p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center ${
                  isVisible[`category-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 group-hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors">
                  <category.icon className="text-gray-600 group-hover:text-blue-600 transition-colors" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.jobs.toLocaleString()} ta vakansiya
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/jobs"
              className="btn btn-outline inline-flex items-center space-x-2 text-lg px-8 py-3"
            >
              <span>Barcha kategoriyalar</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section 
        ref={statsRef}
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Raqamlar bilan tanishaylik
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Bizning platformamiz orqali minglab kishi o'z orzuining ishini topdilar
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Jami vakansiyalar', value: stats.totalJobs, suffix: '+', icon: Briefcase },
              { label: 'Ro\'yxatdan o\'tganlar', value: stats.totalUsers, suffix: '+', icon: Users },
              { label: 'Hamkor kompaniyalar', value: stats.totalCompanies, suffix: '+', icon: Building2 },
              { label: 'Muvaffaqiyat ko\'rsatkichi', value: stats.successRate, suffix: '%', icon: TrendingUp }
            ].map((stat, index) => (
              <div
                key={stat.label}
                data-animate
                id={`stat-${index}`}
                className={`text-center ${
                  isVisible[`stat-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-bold mb-2">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : '0'}{stat.suffix}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Bizning afzalliklarimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              JobBoard platformasini tanlash orqali siz ko'plab imkoniyatlarga ega bo'lasiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                data-animate
                id={`benefit-${index}`}
                className={`flex space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all ${
                  isVisible[`benefit-${index}`] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Foydalanuvchilar fikri
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bizning platformamiz orqali ish topganlarning tajribasi
            </p>
          </div>

          {testimonials.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
                <div className="mb-6">
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 italic">
                    "{testimonials[currentTestimonial]?.text}"
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-4xl">{testimonials[currentTestimonial]?.avatar}</div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {testimonials[currentTestimonial]?.name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial]?.role} - {testimonials[currentTestimonial]?.company}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {testimonials[currentTestimonial]?.duration}
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Karyerangizni bugun boshlang!
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            50,000+ vakansiya, 4,800+ kompaniya va minglab muvaffaqiyat hikoyasi sizni kutmoqda.
            Bepul ro'yxatdan o'ting va orzuingizdagi ishni toping.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register?role=seeker"
              className="btn btn-primary btn-lg inline-flex items-center space-x-2 px-8 py-4"
            >
              <UserCheck size={20} />
              <span>Ish izlovchi sifatida</span>
            </Link>
            <Link
              to="/register?role=employer"
              className="btn btn-outline btn-lg inline-flex items-center space-x-2 px-8 py-4 text-white border-white hover:bg-white hover:text-gray-900"
            >
              <Building2 size={20} />
              <span>Ish beruvchi sifatida</span>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} />
              <span>Bepul ro'yxatdan o'tish</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} />
              <span>Email tasdiqlanmadi</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} />
              <span>Darhol ishlatishga tayyor</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

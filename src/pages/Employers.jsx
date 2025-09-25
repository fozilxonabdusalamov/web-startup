import { Link } from 'react-router-dom'
import { 
  CheckCircle, Star, Users, Briefcase, TrendingUp, ArrowRight, Play, Quote,
  Target, Award, Clock, Shield, Zap, HeartHandshake, BarChart, Sparkles,
  X, Check, ChevronDown, ChevronUp, MessageCircle, Calendar, Globe
} from 'lucide-react'

const Employers = () => {

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      period: 'month',
      description: 'Perfect for small businesses getting started',
      features: [
        '1 active job posting',
        'Basic applicant filtering',
        'Email support',
        '30-day posting duration',
        'Standard job visibility'
      ],
      limitations: [
        'No featured listings',
        'Limited analytics',
        'No company branding',
        'Basic candidate matching'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline',
      maxJobs: 1,
      support: 'Email',
      analytics: 'Basic'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 149,
      yearlyPrice: 1490,
      period: 'month',
      description: 'Ideal for growing companies and active hiring',
      features: [
        '10 active job postings',
        'Featured job listings',
        'Advanced analytics dashboard',
        'Candidate database access',
        'Priority email & chat support',
        '60-day posting duration',
        'Company branding & profile',
        'Resume database search',
        'Application tracking tools'
      ],
      limitations: [],
      buttonText: 'Start Professional',
      buttonVariant: 'primary',
      popular: true,
      maxJobs: 10,
      support: 'Priority',
      analytics: 'Advanced',
      badge: 'Most Popular'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      yearlyPrice: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited job postings',
        'Premium tanlangan e\'lonlar',
        'To\'liq analitika',
        'Nomzodlar ma\'lumotlar bazasi',
        'API integratsiyasi',
        'Shaxsiy menejer',
        'Custom brending',
        '90 kunlik ko\'rinish'
      ],
      limitations: [],
      buttonText: 'Aloqa',
      buttonVariant: 'outline'
    }
  ]

  const features = [
    {
      icon: '🎯',
      title: 'Maqsadli auditoriya',
      description: 'Vakansiyalaringizni aynan kerakli mutaxassislarga yetkazib bering'
    },
    {
      icon: '⚡',
      title: 'Tez va oson',
      description: '5 daqiqada vakansiya e\'lon qiling va bir necha soatda nomzodlar oling'
    },
    {
      icon: '📊',
      title: 'Batafsil analitika',
      description: 'E\'lonlaringizning samaradorligini kuzatib boring'
    },
    {
      icon: '💼',
      title: 'Kompaniya brending',
      description: 'Brendingizni oshiring va eng yaxshi talantlarni jalb qiling'
    },
    {
      icon: '🔍',
      title: 'Nomzodlar bazasi',
      description: 'Ming-ming nomzodlar ma\'lumotlar bazasiga kirish imkoniyati'
    },
    {
      icon: '🤝',
      title: 'Premium qo\'llab-quvvatlash',
      description: '24/7 professional yordam va maslahatlar'
    }
  ]

  const steps = [
    {
      number: 1,
      title: 'Ro\'yxatdan o\'tish',
      description: 'Kompaniya ma\'lumotlarini to\'ldiring va hisobingizni faollashtiring'
    },
    {
      number: 2,
      title: 'Vakansiya yaratish',
      description: 'Vakansiya tafsilotlarini kiriting va e\'lon qiling'
    },
    {
      number: 3,
      title: 'Nomzodlar olish',
      description: 'Arizalarni ko\'rib chiqing va eng yaxshi nomzodlarni tanlang'
    }
  ]

  const testimonials = [
    {
      name: 'Aziz Karimov',
      company: 'TechSoft LLC',
      position: 'HR Direktor',
      text: 'JobBoard orqali 2 oy ichida 5 ta ajoyib dasturchini topdik. Platformaning filtrlash imkoniyatlari va nomzodlar sifati juda yaxshi.',
      avatar: '👨‍💼'
    },
    {
      name: 'Malika Saidova',
      company: 'FinanceGroup',
      position: 'Bosh direktor',
      text: 'Eng yaxshi HR platformasi. Tez, sifatli va arzon. Barcha HR jarayonlarimizni bu yerda hal qilamiz.',
      avatar: '👩‍💼'
    },
    {
      name: 'Sardor Rahimov',
      company: 'MarketingPro',
      position: 'Founder',
      text: 'Start-ap uchun ideal yechim. Kam xarajat bilan sifatli kadrlar topish imkoniyati. Tavsiya qilamiz!',
      avatar: '👨‍🚀'
    }
  ]

  const stats = [
    { number: '2,500+', label: 'Ish beruvchi' },
    { number: '50,000+', label: 'Faol nomzod' },
    { number: '15,000+', label: 'Muvaffaqiyatli ishga joylashish' },
    { number: '95%', label: 'Mijoz qoniqish darajasi' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800/50 to-primary-600/30"></div>
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100/20 backdrop-blur-sm text-primary-100 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-primary-400/30">
              <Sparkles size={16} />
              <span>O'zbekistondagi eng yirik HR platformasi</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Eng yaxshi talantlarni 
              <span className="block bg-gradient-to-r from-primary-100 to-white bg-clip-text text-transparent">
                toping va jalb qiling
              </span>
            </h1>
            <p className="text-2xl mb-12 text-primary-100 max-w-4xl mx-auto leading-relaxed">
              50,000+ faol nomzod, zamonaviy qidiruv vositalari va professional HR yechimlar bilan kompaniyangiz uchun ideal xodimlarni toping
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/register?type=employer" 
                className="bg-white text-primary-800 hover:bg-primary-50 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                <Briefcase size={24} className="mr-3" />
                Bepul boshlash
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-800 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center">
                <Play size={24} className="mr-3" />
                Demo ko'rish
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-6xl font-bold text-primary-600 mb-3 group-hover:text-primary-700 transition-colors">{stat.number}</div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Nega JobBoard?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bizning platformamiz orqali siz eng kam vaqt va xarajat bilan eng yaxshi kadrlarni topa olasiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-primary-100">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Qanday ishlaydi?</h2>
            <p className="text-gray-600">3 ta oddiy qadamda eng yaxshi xodimlarni toping</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tariflar</h2>
            <p className="text-gray-600">O'zingizga mos tarifni tanlang</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`card relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star size={14} className="mr-1" />
                      Mashhur
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-blue-600">
                    {plan.price === 'Kelishiladi' ? plan.price : `$${plan.price}`}
                    {plan.period && <span className="text-lg text-gray-500">/{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <li key={limitIndex} className="flex items-center text-sm text-gray-500">
                      <span className="w-4 h-4 mr-3 flex-shrink-0 text-gray-400">×</span>
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.name === 'Enterprise' ? '/contact' : '/register?type=employer'}
                  className={`btn ${plan.buttonVariant === 'primary' ? 'btn-primary' : 'btn-outline'} w-full`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              Barcha tariflar 14 kunlik bepul sinov davri bilan keladi
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mijozlarimiz fikri</h2>
            <p className="text-gray-600">Muvaffaqiyatli ish beruvchilarimizning tajribasi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <Quote size={24} className="text-blue-600 mb-4" />
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bugun eng yaxshi talantlarni jalb qilishni boshlang
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Minglab malakali mutaxassislar sizning e'lonlaringizni kutmoqda. Bir daqiqada ro'yxatdan o'ting va birinchi vakansiyangizni e'lon qiling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register?type=employer" className="btn bg-white text-blue-600 hover:bg-gray-100 btn-lg">
                <Users size={20} className="mr-2" />
                Bepul ro'yxatdan o'tish
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 btn-lg">
                <TrendingUp size={20} className="mr-2" />
                Batafsil ma'lumot
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Employers

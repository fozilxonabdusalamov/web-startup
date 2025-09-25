import { Link } from 'react-router-dom'
import { 
  Mail, Phone, MapPin, Globe, Facebook, Twitter, 
  Instagram, Linkedin, Youtube, ChevronUp, Heart,
  FileText, Shield, HelpCircle, Users, Building2,
  Briefcase, BookOpen, Award, TrendingUp
} from 'lucide-react'
import { useState, useEffect } from 'react'

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('uz')

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' }
  ]

  const companyLinks = [
    { to: '/about', label: 'Biz haqimizda', icon: Users },
    { to: '/careers', label: 'Karyera', icon: TrendingUp },
    { to: '/press', label: 'Press', icon: FileText },
    { to: '/investors', label: 'Investorlar', icon: Award }
  ]

  const jobSeekerLinks = [
    { to: '/jobs', label: 'Vakansiyalarni qidirish', icon: Briefcase },
    { to: '/companies', label: 'Kompaniyalar', icon: Building2 },
    { to: '/salary-guide', label: 'Maosh ko\'rsatkichi', icon: TrendingUp },
    { to: '/career-advice', label: 'Karyera maslahatlari', icon: BookOpen }
  ]

  const employerLinks = [
    { to: '/employers', label: 'Vakansiya joylash', icon: Briefcase },
    { to: '/pricing', label: 'Narxlar', icon: Award },
    { to: '/employer-resources', label: 'Resurslar', icon: BookOpen },
    { to: '/talent-solutions', label: 'Talent Solutions', icon: Users }
  ]

  const supportLinks = [
    { to: '/help', label: 'Yordam', icon: HelpCircle },
    { to: '/contact', label: 'Aloqa', icon: Mail },
    { to: '/faq', label: 'FAQ', icon: HelpCircle },
    { to: '/support', label: 'Qo\'llab-quvvatlash', icon: Users }
  ]

  const legalLinks = [
    { to: '/privacy', label: 'Maxfiylik siyosati', icon: Shield },
    { to: '/terms', label: 'Foydalanish shartlari', icon: FileText },
    { to: '/cookies', label: 'Cookie siyosati', icon: Shield },
    { to: '/accessibility', label: 'Accessibility', icon: Users }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Eng so'nggi vakansiyalardan birinchi bo'lib xabardor bo'ling
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Haftada 50,000+ yangi vakansiya. Siz uchun eng mos ishlarni topib beramiz.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Email manzilingizni kiriting"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Obuna bo'lish
              </button>
            </form>
            <p className="text-xs text-blue-200 mt-3">
              Obuna bo'lish orqali siz bizning{' '}
              <Link to="/privacy" className="underline hover:text-white">
                maxfiylik siyosatimiz
              </Link>
              ga rozilik bildirasiz.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-extrabold">
                  J
                </div>
                <span className="text-2xl font-bold">JobBoard</span>
              </Link>
              <p className="text-gray-300 leading-relaxed max-w-md">
                O'zbekistondagi eng yirik ish qidirish platformasi. 
                Minglab vakansiya va professional rivojlanish imkoniyatlari.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg mb-4">Bog'lanish</h4>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:info@jobboard.uz" className="hover:text-blue-400 transition-colors">
                  info@jobboard.uz
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} className="text-blue-400" />
                <a href="tel:+998712345678" className="hover:text-blue-400 transition-colors">
                  +998 71 234 56 78
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={16} className="text-blue-400" />
                <span>Toshkent sh., Chilonzor tumani</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Globe size={16} className="text-blue-400" />
                <a href="https://jobboard.uz" className="hover:text-blue-400 transition-colors">
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
            <ul className="space-y-3">
              {jobSeekerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon size={16} className="group-hover:text-blue-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Ish beruvchilar</h4>
            <ul className="space-y-3">
              {employerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon size={16} className="group-hover:text-blue-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Support Links */}
            <h4 className="font-semibold text-lg mb-6 mt-8">Yordam</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon size={16} className="group-hover:text-blue-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Kompaniya</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon size={16} className="group-hover:text-blue-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-lg mb-6 mt-8">Huquqiy</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <link.icon size={16} className="group-hover:text-blue-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Selector */}
            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-4">Til</h4>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-180 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-300 text-sm">Faol vakansiyalar</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">200K+</div>
              <div className="text-gray-300 text-sm">Ro'yxatdan o'tgan foydalanuvchilar</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">5K+</div>
              <div className="text-gray-300 text-sm">Kompaniyalar</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-gray-300 text-sm">Muvaffaqiyatli joylashish</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>&copy; {currentYear} JobBoard. Barcha huquqlar himoyalangan.</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart size={14} className="text-red-500 fill-current" />
                <span>in Uzbekistan</span>
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link to="/sitemap" className="text-gray-400 hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
              <Link to="/rss" className="text-gray-400 hover:text-blue-400 transition-colors">
                RSS
              </Link>
              <Link to="/api-docs" className="text-gray-400 hover:text-blue-400 transition-colors">
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
  )
}

export default Footer

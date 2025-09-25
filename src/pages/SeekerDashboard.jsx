import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Bookmark, FileText, Bell, Search, MapPin, Calendar, Eye, Edit, Trash2, Settings, DownloadCloud, Upload } from 'lucide-react'

const SeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [savedJobs, setSavedJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [profile, setProfile] = useState({})

  useEffect(() => {
    // Mock data
    setSavedJobs([
      {
        id: 1,
        title: 'Senior React Developer',
        company: 'TechSoft LLC',
        location: 'Toshkent',
        salary: '$2000-3000',
        savedAt: '2024-01-15',
        type: 'To\'liq vaqt'
      },
      {
        id: 2,
        title: 'UI/UX Designer',
        company: 'DesignHub',
        location: 'Samarqand',
        salary: '$800-1200',
        savedAt: '2024-01-14',
        type: 'Masofaviy'
      }
    ])

    setApplications([
      {
        id: 1,
        jobTitle: 'Frontend Developer',
        company: 'WebCorp',
        appliedAt: '2024-01-10',
        status: 'review', // new, review, interview, rejected, hired
        location: 'Toshkent'
      },
      {
        id: 2,
        jobTitle: 'React Developer',
        company: 'StartupTech',
        appliedAt: '2024-01-08',
        status: 'interview',
        location: 'Namangan'
      },
      {
        id: 3,
        jobTitle: 'JavaScript Developer',
        company: 'DevStudio',
        appliedAt: '2024-01-05',
        status: 'rejected',
        location: 'Toshkent'
      }
    ])

    setProfile({
      name: 'Akmal Aliyev',
      email: 'akmal@email.com',
      phone: '+998 90 123 45 67',
      location: 'Toshkent, O\'zbekiston',
      experience: 'Mid (3 yil)',
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      resumeUrl: null
    })
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'interview': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'hired': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Yangi'
      case 'review': return 'Ko\'rib chiqilmoqda'
      case 'interview': return 'Suhbat'
      case 'rejected': return 'Rad etilgan'
      case 'hired': return 'Qabul qilingan'
      default: return 'Noma\'lum'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Umumiy ko\'rinish', icon: User },
    { id: 'saved', label: 'Saqlangan vakansiyalar', icon: Bookmark },
    { id: 'applications', label: 'Arizalarim', icon: FileText },
    { id: 'profile', label: 'Profil', icon: Settings },
    { id: 'alerts', label: 'Bildirishnomalar', icon: Bell }
  ]

  const stats = [
    { label: 'Saqlangan vakansiyalar', value: savedJobs.length, icon: Bookmark },
    { label: 'Yuborilgan arizalar', value: applications.length, icon: FileText },
    { label: 'Suhbat bosqichi', value: applications.filter(a => a.status === 'interview').length, icon: Calendar },
    { label: 'Profil ko\'rishlari', value: 45, icon: Eye }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600">Xush kelibsiz, {profile.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl shadow-lg p-8 border border-primary-100">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-200 shadow-md'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <stat.icon size={24} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">So'nggi arizalar</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {applications.slice(0, 3).map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{app.jobTitle}</h4>
                            <p className="text-sm text-gray-600">{app.company} • {app.location}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(app.appliedAt).toLocaleDateString('uz-UZ')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Job Recommendations */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Sizga mos vakansiyalar</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">JavaScript Developer</h4>
                        <p className="text-sm text-gray-600 mb-3">CodeCraft LLC • Toshkent</p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">$1500-2500</span>
                          <Link to="/jobs/123" className="btn btn-primary btn-sm">Ko'rish</Link>
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">React Developer</h4>
                        <p className="text-sm text-gray-600 mb-3">WebFlow • Samarqand</p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">$1200-2000</span>
                          <Link to="/jobs/124" className="btn btn-primary btn-sm">Ko'rish</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Saqlangan vakansiyalar</h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Qidirish..."
                          className="input pl-9 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {savedJobs.length > 0 ? (
                    <div className="space-y-4">
                      {savedJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span>{job.company}</span>
                              <span className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                {job.location}
                              </span>
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-green-600 font-medium">{job.salary}</span>
                              <span className="text-xs text-gray-500">
                                Saqlangan: {new Date(job.savedAt).toLocaleDateString('uz-UZ')}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm">
                              Ko'rish
                            </Link>
                            <button className="btn btn-outline btn-sm text-red-600 hover:bg-red-50 hover:border-red-300">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Saqlangan vakansiyalar yo'q</h3>
                      <p className="text-gray-600 mb-6">Yoqgan vakansiyalarni saqlang va keyinroq ko'ring</p>
                      <Link to="/jobs" className="btn btn-primary">
                        Vakansiyalarni ko'rish
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Arizalarim</h3>
                </div>
                <div className="p-6">
                  {applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">{app.jobTitle}</h4>
                              <p className="text-sm text-gray-600">{app.company}</p>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin size={14} className="mr-1" />
                                {app.location}
                                <span className="mx-2">•</span>
                                <Calendar size={14} className="mr-1" />
                                {new Date(app.appliedAt).toLocaleDateString('uz-UZ')}
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {getStatusText(app.status)}
                            </span>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button className="btn btn-outline btn-sm">
                              <Eye size={14} className="mr-1" />
                              Ko'rish
                            </button>
                            {app.status === 'new' && (
                              <button className="btn btn-outline btn-sm">
                                <Edit size={14} className="mr-1" />
                                Tahrirlash
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Arizalar yo'q</h3>
                      <p className="text-gray-600 mb-6">Hali hech qanday vakansiyaga ariza topshirmadingiz</p>
                      <Link to="/jobs" className="btn btn-primary">
                        Vakansiyalar ko'rish
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Asosiy ma'lumotlar</h3>
                  </div>
                  <div className="p-6">
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            To'liq ism
                          </label>
                          <input
                            type="text"
                            value={profile.name}
                            className="input"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={profile.email}
                            className="input"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefon
                          </label>
                          <input
                            type="tel"
                            value={profile.phone}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Joylashuv
                          </label>
                          <input
                            type="text"
                            value={profile.location}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tajriba darajasi
                          </label>
                          <select className="input" value={profile.experience}>
                            <option>Junior (1-2 yil)</option>
                            <option>Mid (2-5 yil)</option>
                            <option>Senior (5+ yil)</option>
                            <option>Lead/Manager</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Saqlash
                      </button>
                    </form>
                  </div>
                </div>

                {/* Resume */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">CV/Rezume</h3>
                  </div>
                  <div className="p-6">
                    {profile.resumeUrl ? (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText size={24} className="text-blue-600" />
                          <div>
                            <div className="font-medium">resume.pdf</div>
                            <div className="text-sm text-gray-500">Oxirgi yangilanish: 2024-01-15</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="btn btn-outline btn-sm">
                            <DownloadCloud size={14} className="mr-1" />
                            Yuklab olish
                          </button>
                          <button className="btn btn-primary btn-sm">
                            <Upload size={14} className="mr-1" />
                            Yangilash
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">CV yuklanmagan</h3>
                        <p className="text-gray-600 mb-6">CV yuklab, ish beruvchilarga o'zingizni ko'rsating</p>
                        <button className="btn btn-primary">
                          <Upload size={16} className="mr-2" />
                          CV yuklash
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Ko'nikmalar</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button className="btn btn-outline btn-sm">
                      Ko'nikmalarni tahrirlash
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Bildirishnomalar sozlamalari</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Yangi vakansiyalar</h4>
                        <p className="text-sm text-gray-600">Sizga mos yangi vakansiyalar haqida xabar olish</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Ariza holati</h4>
                        <p className="text-sm text-gray-600">Arizangiz holati o'zgarganda xabar olish</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Haftalik xulosalar</h4>
                        <p className="text-sm text-gray-600">Haftalik statistika va tavsiyalar</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                    <button className="btn btn-primary">
                      Saqlash
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeekerDashboard

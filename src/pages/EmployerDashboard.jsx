import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Briefcase, Users, Eye, Edit, Trash2, Building2, Settings, BarChart3, DollarSign, Calendar, MapPin, Search, Filter, MoreHorizontal } from 'lucide-react'

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [company, setCompany] = useState({})

  useEffect(() => {
    // Mock data
    setJobs([
      {
        id: 1,
        title: 'Senior React Developer',
        status: 'published', // draft, published, paused, closed
        views: 1247,
        applications: 23,
        postedAt: '2024-01-15',
        location: 'Toshkent',
        type: 'To\'liq vaqt',
        salary: '$2000-3000'
      },
      {
        id: 2,
        title: 'UI/UX Designer',
        status: 'published',
        views: 856,
        applications: 15,
        postedAt: '2024-01-12',
        location: 'Samarqand',
        type: 'Masofaviy',
        salary: '$800-1200'
      },
      {
        id: 3,
        title: 'Marketing Manager',
        status: 'draft',
        views: 0,
        applications: 0,
        postedAt: '2024-01-20',
        location: 'Toshkent',
        type: 'To\'liq vaqt',
        salary: '$1000-1800'
      }
    ])

    setApplications([
      {
        id: 1,
        jobId: 1,
        jobTitle: 'Senior React Developer',
        candidateName: 'Akmal Aliyev',
        candidateEmail: 'akmal@email.com',
        appliedAt: '2024-01-18',
        status: 'new', // new, review, interview, rejected, hired
        resumeUrl: '/resumes/akmal.pdf'
      },
      {
        id: 2,
        jobId: 1,
        jobTitle: 'Senior React Developer',
        candidateName: 'Nilufar Karimova',
        candidateEmail: 'nilufar@email.com',
        appliedAt: '2024-01-17',
        status: 'review',
        resumeUrl: '/resumes/nilufar.pdf'
      },
      {
        id: 3,
        jobId: 2,
        jobTitle: 'UI/UX Designer',
        candidateName: 'Sardor Rahimov',
        candidateEmail: 'sardor@email.com',
        appliedAt: '2024-01-16',
        status: 'interview',
        resumeUrl: '/resumes/sardor.pdf'
      }
    ])

    setCompany({
      name: 'TechSoft LLC',
      logo: '🏢',
      description: 'Zamonaviy IT yechimlar ishlab chiqarishda ixtisoslashgan kompaniya',
      website: 'https://techsoft.uz',
      employees: '50-100',
      founded: '2018',
      industry: 'IT va Dasturiy ta\'minot',
      location: 'Toshkent, O\'zbekiston'
    })
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'published': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-red-100 text-red-800'
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
      case 'draft': return 'Qoralama'
      case 'published': return 'E\'lon qilingan'
      case 'paused': return 'To\'xtatilgan'
      case 'closed': return 'Yopilgan'
      case 'new': return 'Yangi'
      case 'review': return 'Ko\'rib chiqilmoqda'
      case 'interview': return 'Suhbat'
      case 'rejected': return 'Rad etilgan'
      case 'hired': return 'Ishga olingan'
      default: return 'Noma\'lum'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Umumiy ko\'rinish', icon: BarChart3 },
    { id: 'jobs', label: 'Vakansiyalarim', icon: Briefcase },
    { id: 'applications', label: 'Arizalar', icon: Users },
    { id: 'company', label: 'Kompaniya profili', icon: Building2 },
    { id: 'settings', label: 'Sozlamalar', icon: Settings }
  ]

  const stats = [
    { label: 'Faol vakansiyalar', value: jobs.filter(j => j.status === 'published').length, icon: Briefcase },
    { label: 'Jami arizalar', value: applications.length, icon: Users },
    { label: 'Jami ko\'rishlar', value: jobs.reduce((sum, job) => sum + job.views, 0), icon: Eye },
    { label: 'Bu oygi ishga qabul', value: applications.filter(a => a.status === 'hired').length, icon: DollarSign }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ish beruvchi paneli</h1>
            <p className="text-gray-600">Xush kelibsiz, {company.name}!</p>
          </div>
          <Link to="/dashboard/employer/create-job" className="btn btn-primary">
            <Plus size={20} className="mr-2" />
            Yangi vakansiya
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
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
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">So'nggi arizalar</h3>
                      <Link to="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Barchasini ko'rish
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {applications.slice(0, 5).map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{app.candidateName}</h4>
                            <p className="text-sm text-gray-600">{app.jobTitle}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(app.appliedAt).toLocaleDateString('uz-UZ')}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {getStatusText(app.status)}
                            </span>
                            <button className="btn btn-outline btn-sm">
                              Ko'rish
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Tez harakatlar</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link to="/dashboard/employer/create-job" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <Plus size={24} className="text-blue-600 mb-2" />
                        <h4 className="font-medium text-gray-900">Vakansiya qo'shish</h4>
                        <p className="text-sm text-gray-600">Yangi vakansiya e'lon qiling</p>
                      </Link>
                      <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors text-left">
                        <Users size={24} className="text-blue-600 mb-2" />
                        <h4 className="font-medium text-gray-900">Nomzodlar bazasi</h4>
                        <p className="text-sm text-gray-600">Nomzodlar ichida qidirish</p>
                      </button>
                      <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors text-left">
                        <BarChart3 size={24} className="text-blue-600 mb-2" />
                        <h4 className="font-medium text-gray-900">Analitika</h4>
                        <p className="text-sm text-gray-600">Batafsil hisobotlar</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Vakansiyalarim</h3>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Qidirish..."
                          className="input pl-9 py-2 text-sm w-64"
                        />
                      </div>
                      <button className="btn btn-outline btn-sm">
                        <Filter size={16} className="mr-2" />
                        Filtr
                      </button>
                      <Link to="/dashboard/employer/create-job" className="btn btn-primary btn-sm">
                        <Plus size={16} className="mr-2" />
                        Yangi
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vakansiya
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Holat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ko'rishlar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Arizalar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          E'lon sanasi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Harakatlar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{job.title}</div>
                              <div className="text-sm text-gray-500">
                                <MapPin size={14} className="inline mr-1" />
                                {job.location} • {job.type}
                              </div>
                              <div className="text-sm text-gray-500">{job.salary}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {getStatusText(job.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="flex items-center">
                              <Eye size={16} className="mr-1 text-gray-400" />
                              {job.views}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="flex items-center">
                              <Users size={16} className="mr-1 text-gray-400" />
                              {job.applications}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {new Date(job.postedAt).toLocaleDateString('uz-UZ')}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Edit size={16} />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 size={16} />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Arizalar</h3>
                    <div className="flex items-center space-x-3">
                      <select className="input py-2 text-sm">
                        <option>Barcha vakansiyalar</option>
                        {jobs.map((job) => (
                          <option key={job.id} value={job.id}>{job.title}</option>
                        ))}
                      </select>
                      <select className="input py-2 text-sm">
                        <option>Barcha holatlar</option>
                        <option value="new">Yangi</option>
                        <option value="review">Ko'rib chiqilmoqda</option>
                        <option value="interview">Suhbat</option>
                        <option value="rejected">Rad etilgan</option>
                        <option value="hired">Ishga olingan</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">{app.candidateName}</h4>
                            <p className="text-sm text-gray-600 mb-1">{app.candidateEmail}</p>
                            <p className="text-sm text-gray-500">
                              {app.jobTitle} uchun ariza
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(app.appliedAt).toLocaleDateString('uz-UZ')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <button className="btn btn-outline btn-sm">
                              <Eye size={14} className="mr-1" />
                              Profil
                            </button>
                            <a
                              href={app.resumeUrl}
                              className="btn btn-outline btn-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              CV ko'rish
                            </a>
                          </div>
                          <div className="flex space-x-2">
                            <select
                              className="input py-1 px-3 text-sm"
                              value={app.status}
                              onChange={(e) => {
                                // Update application status
                                const newStatus = e.target.value
                                setApplications(prev => 
                                  prev.map(a => 
                                    a.id === app.id ? { ...a, status: newStatus } : a
                                  )
                                )
                              }}
                            >
                              <option value="new">Yangi</option>
                              <option value="review">Ko'rib chiqilmoqda</option>
                              <option value="interview">Suhbat</option>
                              <option value="rejected">Rad etilgan</option>
                              <option value="hired">Ishga olingan</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'company' && (
              <div className="space-y-6">
                {/* Company Info */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Kompaniya ma'lumotlari</h3>
                  </div>
                  <div className="p-6">
                    <form className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="text-6xl">{company.logo}</div>
                        <div>
                          <button type="button" className="btn btn-outline btn-sm">
                            Logo o'zgartirish
                          </button>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG yoki SVG. Maksimal 2MB.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kompaniya nomi
                          </label>
                          <input
                            type="text"
                            value={company.name}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Veb-sayt
                          </label>
                          <input
                            type="url"
                            value={company.website}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Xodimlar soni
                          </label>
                          <select className="input" value={company.employees}>
                            <option>1-10 xodim</option>
                            <option>11-50 xodim</option>
                            <option>51-200 xodim</option>
                            <option>201-500 xodim</option>
                            <option>500+ xodim</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Soha
                          </label>
                          <select className="input" value={company.industry}>
                            <option>IT va Texnologiya</option>
                            <option>Moliya va Banking</option>
                            <option>Ta'lim</option>
                            <option>Marketing</option>
                            <option>Boshqa</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tashkil etilgan yil
                          </label>
                          <input
                            type="text"
                            value={company.founded}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Joylashuv
                          </label>
                          <input
                            type="text"
                            value={company.location}
                            className="input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kompaniya haqida
                        </label>
                        <textarea
                          rows="4"
                          value={company.description}
                          className="input"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Saqlash
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Sozlamalar</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Bildirishnomalar</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Yangi arizalar</div>
                            <div className="text-sm text-gray-600">Yangi ariza kelganda email yuborish</div>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Haftalik xulosalar</div>
                            <div className="text-sm text-gray-600">Haftalik statistika va tahlil</div>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Hisob sozlamalari</h4>
                      <div className="space-y-4">
                        <button className="btn btn-outline">
                          Parolni o'zgartirish
                        </button>
                        <button className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50">
                          Hisobni o'chirish
                        </button>
                      </div>
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

export default EmployerDashboard

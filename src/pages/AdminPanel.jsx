import { useState, useEffect } from 'react'
import { Users, Briefcase, Building2, BarChart3, Shield, Settings, Eye, Edit, Trash2, Search, Filter, Plus, AlertTriangle } from 'lucide-react'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [companies, setCompanies] = useState([])
  const [reports, setReports] = useState([])

  useEffect(() => {
    // Mock data
    setUsers([
      {
        id: 1,
        name: 'Akmal Aliyev',
        email: 'akmal@email.com',
        role: 'seeker',
        status: 'active',
        joinedAt: '2024-01-15',
        lastActive: '2024-01-20'
      },
      {
        id: 2,
        name: 'TechSoft LLC',
        email: 'contact@techsoft.uz',
        role: 'employer',
        status: 'active',
        joinedAt: '2024-01-10',
        lastActive: '2024-01-19'
      },
      {
        id: 3,
        name: 'Nilufar Karimova',
        email: 'nilufar@email.com',
        role: 'seeker',
        status: 'suspended',
        joinedAt: '2024-01-12',
        lastActive: '2024-01-18'
      }
    ])

    setJobs([
      {
        id: 1,
        title: 'Senior React Developer',
        company: 'TechSoft LLC',
        status: 'published',
        flagged: false,
        reportCount: 0,
        views: 1247,
        applications: 23,
        postedAt: '2024-01-15'
      },
      {
        id: 2,
        title: 'Suspicious Job Posting',
        company: 'Unknown Company',
        status: 'flagged',
        flagged: true,
        reportCount: 5,
        views: 45,
        applications: 2,
        postedAt: '2024-01-18'
      }
    ])

    setCompanies([
      {
        id: 1,
        name: 'TechSoft LLC',
        verified: true,
        totalJobs: 5,
        activeJobs: 3,
        totalApplications: 45,
        joinedAt: '2024-01-10'
      },
      {
        id: 2,
        name: 'StartupTech',
        verified: false,
        totalJobs: 2,
        activeJobs: 1,
        totalApplications: 8,
        joinedAt: '2024-01-16'
      }
    ])

    setReports([
      {
        id: 1,
        type: 'job',
        itemId: 2,
        reportedBy: 'user@email.com',
        reason: 'Spam/Scam',
        description: 'Bu vakansiya shubhali ko\'rinadi',
        status: 'pending',
        createdAt: '2024-01-19'
      },
      {
        id: 2,
        type: 'user',
        itemId: 3,
        reportedBy: 'admin@jobboard.uz',
        reason: 'Inappropriate Content',
        description: 'Profilda nomaqbul kontent',
        status: 'resolved',
        createdAt: '2024-01-17'
      }
    ])
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'published': return 'bg-green-100 text-green-800'
      case 'flagged': return 'bg-red-100 text-red-800'
      case 'resolved': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Faol'
      case 'suspended': return 'To\'xtatilgan'
      case 'pending': return 'Kutilmoqda'
      case 'published': return 'E\'lon qilingan'
      case 'flagged': return 'Shikoyat bilan'
      case 'resolved': return 'Hal qilingan'
      default: return status
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Foydalanuvchilar', icon: Users },
    { id: 'jobs', label: 'Vakansiyalar', icon: Briefcase },
    { id: 'companies', label: 'Kompaniyalar', icon: Building2 },
    { id: 'reports', label: 'Shikoyatlar', icon: Shield },
    { id: 'settings', label: 'Sozlamalar', icon: Settings }
  ]

  const stats = [
    { label: 'Jami foydalanuvchilar', value: 50248, icon: Users, change: '+12%' },
    { label: 'Faol vakansiyalar', value: 2456, icon: Briefcase, change: '+8%' },
    { label: 'Jami kompaniyalar', value: 1234, icon: Building2, change: '+15%' },
    { label: 'Hal qilinmagan shikoyatlar', value: 23, icon: Shield, change: '-5%' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Platformani boshqarish va monitoring</p>
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
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <stat.icon size={24} className="text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-green-600">{stat.change}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b">
                      <h3 className="text-lg font-semibold text-gray-900">So'nggi faoliyat</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Yangi kompaniya ro'yxatdan o'tdi</p>
                            <p className="text-xs text-gray-500">5 daqiqa oldin</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">15 ta yangi vakansiya e'lon qilindi</p>
                            <p className="text-xs text-gray-500">1 soat oldin</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Vakansiyaga shikoyat kelib tushdi</p>
                            <p className="text-xs text-gray-500">2 soat oldin</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b">
                      <h3 className="text-lg font-semibold text-gray-900">E'tibor talab qiladi</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                          <AlertTriangle size={20} className="text-red-600" />
                          <div>
                            <p className="text-sm font-medium text-red-900">5 ta shikoyat kutmoqda</p>
                            <p className="text-xs text-red-700">Tezda hal qiling</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                          <AlertTriangle size={20} className="text-yellow-600" />
                          <div>
                            <p className="text-sm font-medium text-yellow-900">12 kompaniya tasdiq kutmoqda</p>
                            <p className="text-xs text-yellow-700">Verifikatsiya qiling</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Foydalanuvchilar</h3>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Qidirish..."
                          className="input pl-9 py-2 text-sm w-64"
                        />
                      </div>
                      <select className="input py-2 text-sm">
                        <option>Barcha rollar</option>
                        <option>Ish izlovchi</option>
                        <option>Ish beruvchi</option>
                        <option>Admin</option>
                      </select>
                      <select className="input py-2 text-sm">
                        <option>Barcha holatlar</option>
                        <option>Faol</option>
                        <option>To'xtatilgan</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Foydalanuvchi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rol
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Holat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Qo'shilgan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          So'nggi faollik
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Harakatlar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {user.role === 'seeker' ? 'Ish izlovchi' : 
                             user.role === 'employer' ? 'Ish beruvchi' : 'Admin'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {getStatusText(user.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(user.joinedAt).toLocaleDateString('uz-UZ')}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(user.lastActive).toLocaleDateString('uz-UZ')}
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
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Vakansiyalar</h3>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Qidirish..."
                          className="input pl-9 py-2 text-sm w-64"
                        />
                      </div>
                      <select className="input py-2 text-sm">
                        <option>Barcha holatlar</option>
                        <option>E'lon qilingan</option>
                        <option>Shikoyat bilan</option>
                        <option>Yopilgan</option>
                      </select>
                      <button className="btn btn-outline btn-sm">
                        <Filter size={16} className="mr-2" />
                        Filtr
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div key={job.id} className={`border rounded-lg p-4 ${job.flagged ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900">{job.title}</h4>
                              {job.flagged && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                  Shikoyat bilan
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{job.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                              <span>{job.views} ko'rishlar</span>
                              <span>{job.applications} ariza</span>
                              <span>E'lon qilingan: {new Date(job.postedAt).toLocaleDateString('uz-UZ')}</span>
                              {job.reportCount > 0 && (
                                <span className="text-red-600 font-medium">
                                  {job.reportCount} shikoyat
                                </span>
                              )}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {getStatusText(job.status)}
                          </span>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button className="btn btn-outline btn-sm">
                            <Eye size={14} className="mr-1" />
                            Ko'rish
                          </button>
                          <button className="btn btn-outline btn-sm">
                            <Edit size={14} className="mr-1" />
                            Tahrirlash
                          </button>
                          {job.flagged && (
                            <button className="btn btn-outline btn-sm text-red-600 border-red-300">
                              Tekshirish
                            </button>
                          )}
                          <button className="btn btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50">
                            <Trash2 size={14} className="mr-1" />
                            O'chirish
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Kompaniyalar</h3>
                    <button className="btn btn-primary btn-sm">
                      <Plus size={16} className="mr-2" />
                      Kompaniya qo'shish
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kompaniya
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Holat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vakansiyalar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Arizalar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Qo'shilgan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Harakatlar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {companies.map((company) => (
                        <tr key={company.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{company.name}</div>
                                {company.verified && (
                                  <div className="text-xs text-green-600">✓ Tasdiqlangan</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              company.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {company.verified ? 'Tasdiqlangan' : 'Kutilmoqda'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {company.activeJobs}/{company.totalJobs}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {company.totalApplications}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(company.joinedAt).toLocaleDateString('uz-UZ')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Edit size={16} />
                              </button>
                              {!company.verified && (
                                <button className="btn btn-outline btn-sm text-green-600 border-green-300">
                                  Tasdiqlash
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Shikoyatlar</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900">
                                {report.type === 'job' ? 'Vakansiya' : 'Foydalanuvchi'} shikoyati
                              </h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                {getStatusText(report.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Sabab: {report.reason}</p>
                            <p className="text-sm text-gray-600">{report.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                              <span>Shikoyat qiluvchi: {report.reportedBy}</span>
                              <span>{new Date(report.createdAt).toLocaleDateString('uz-UZ')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button className="btn btn-outline btn-sm">
                            <Eye size={14} className="mr-1" />
                            Ko'rish
                          </button>
                          {report.status === 'pending' && (
                            <>
                              <button className="btn btn-outline btn-sm text-green-600 border-green-300">
                                Rad etish
                              </button>
                              <button className="btn btn-outline btn-sm text-red-600 border-red-300">
                                Qabul qilish
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Tizim sozlamalari</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Umumiy sozlamalar</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sayt nomi
                            </label>
                            <input
                              type="text"
                              defaultValue="JobBoard"
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Admin email
                            </label>
                            <input
                              type="email"
                              defaultValue="admin@jobboard.uz"
                              className="input"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Moderatsiya</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Avtomatik moderatsiya</div>
                            <div className="text-sm text-gray-600">Yangi vakansiyalarni avtomatik tekshirish</div>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Manual tasdiq</div>
                            <div className="text-sm text-gray-600">Barcha kompaniyalarni qo'lda tasdiqlash</div>
                          </div>
                          <input type="checkbox" className="toggle" />
                        </div>
                      </div>
                    </div>

                    <button className="btn btn-primary">
                      Sozlamalarni saqlash
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

export default AdminPanel

import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Search, MapPin, Filter, SlidersHorizontal, Bookmark, ExternalLink, Clock, Briefcase, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'

const Jobs = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    query: '',
    location: '',
    category: '',
    type: '',
    minSalary: '',
    maxSalary: '',
    experience: '',
    postedWithin: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(10)
  const [sortBy, setSortBy] = useState('newest')

  // Mock data
  const mockJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechSoft LLC',
      location: 'Toshkent',
      type: 'To\'liq vaqt',
      category: 'IT',
      salary: '$2000-3000',
      experience: 'Senior',
      description: 'React va TypeScript bo\'yicha tajribali dasturchini qidiramiz...',
      postedAt: '2 kun oldin',
      views: 156,
      isNew: true,
      isFeatured: false,
      logo: '🏢'
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      company: 'Marketing Pro',
      location: 'Samarqand',
      type: 'Masofaviy',
      category: 'Marketing',
      salary: '$1000-1500',
      experience: 'Mid',
      description: 'Digital marketing strategiyalarini ishlab chiqish va amalga oshirish...',
      postedAt: '5 kun oldin',
      views: 89,
      isNew: false,
      isFeatured: true,
      logo: '📢'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'DesignHub',
      location: 'Toshkent',
      type: 'Qisman vaqt',
      category: 'Dizayn',
      salary: '$800-1200',
      experience: 'Junior',
      description: 'Foydalanuvchi tajribasini yaxshilash uchun dizayn qilish...',
      postedAt: '1 hafta oldin',
      views: 234,
      isNew: false,
      isFeatured: false,
      logo: '🎨'
    },
    {
      id: 4,
      title: 'Python Backend Developer',
      company: 'DataTech Solutions',
      location: 'Namangan',
      type: 'To\'liq vaqt',
      category: 'IT',
      salary: '$1500-2500',
      experience: 'Mid',
      description: 'Django va FastAPI bilan backend tizimlarini rivojlantirish...',
      postedAt: '3 kun oldin',
      views: 178,
      isNew: true,
      isFeatured: true,
      logo: '🐍'
    },
    {
      id: 5,
      title: 'Content Marketing Specialist',
      company: 'Content Agency',
      location: 'Toshkent',
      type: 'Freelance',
      category: 'Marketing',
      salary: '$600-1000',
      experience: 'Junior',
      description: 'SEO ga optimallashtirilgan content yaratish va strategiya ishlab chiqish...',
      postedAt: '4 kun oldin',
      views: 67,
      isNew: false,
      isFeatured: false,
      logo: '✍️'
    },
    {
      id: 6,
      title: 'Financial Analyst',
      company: 'BankPlus',
      location: 'Toshkent',
      type: 'To\'liq vaqt',
      category: 'Moliya',
      salary: '$1200-2000',
      experience: 'Mid',
      description: 'Moliyaviy ma\'lumotlarni tahlil qilish va hisobotlar tayyorlash...',
      postedAt: '6 kun oldin',
      views: 143,
      isNew: false,
      isFeatured: false,
      logo: '💰'
    }
  ]

  const categories = [
    'Barchasi', 'IT', 'Marketing', 'Moliya', 'Dizayn', 'Ta\'lim', 
    'Sog\'liqni saqlash', 'Savdo', 'Boshqaruv'
  ]

  const jobTypes = [
    'Barchasi', 'To\'liq vaqt', 'Qisman vaqt', 'Masofaviy', 'Freelance', 'Kontrakt'
  ]

  const experienceLevels = [
    'Barchasi', 'Junior', 'Mid', 'Senior', 'Lead'
  ]

  const postedWithinOptions = [
    { value: '', label: 'Istalgan vaqt' },
    { value: '24h', label: 'So\'nggi 24 soat' },
    { value: '7d', label: 'So\'nggi hafta' },
    { value: '30d', label: 'So\'nggi oy' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Eng yangi' },
    { value: 'oldest', label: 'Eng eski' },
    { value: 'salary_high', label: 'Maosh (yuqoridan pastga)' },
    { value: 'salary_low', label: 'Maosh (pastdan yuqoriga)' },
    { value: 'relevance', label: 'Moslik bo\'yicha' }
  ]

  // Initialize filters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setFilters({
      query: params.get('query') || '',
      location: params.get('location') || '',
      category: params.get('category') || '',
      type: params.get('type') || '',
      minSalary: params.get('minSalary') || '',
      maxSalary: params.get('maxSalary') || '',
      experience: params.get('experience') || '',
      postedWithin: params.get('postedWithin') || ''
    })
    setCurrentPage(parseInt(params.get('page')) || 1)
    setSortBy(params.get('sort') || 'newest')
  }, [location.search])

  // Load jobs based on filters
  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs)
      setLoading(false)
    }, 500)
  }, [filters, currentPage, sortBy])

  const updateURL = (newFilters = filters, page = currentPage, sort = sortBy) => {
    const params = new URLSearchParams()
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    
    if (page > 1) params.set('page', page.toString())
    if (sort !== 'newest') params.set('sort', sort)
    
    navigate(`/jobs?${params.toString()}`, { replace: true })
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    setCurrentPage(1)
    updateURL(newFilters, 1, sortBy)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateURL(filters, 1, sortBy)
  }

  const clearFilters = () => {
    const newFilters = {
      query: '',
      location: '',
      category: '',
      type: '',
      minSalary: '',
      maxSalary: '',
      experience: '',
      postedWithin: ''
    }
    setFilters(newFilters)
    setCurrentPage(1)
    updateURL(newFilters, 1, sortBy)
  }

  const handleSaveJob = (jobId) => {
    // Mock save job functionality
    console.log('Job saved:', jobId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Lavozim, kalit so'z yoki kompaniya"
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  className="input pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Joylashuv"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="input pl-10"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <Search size={20} className="mr-2" />
                Qidirish
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline"
              >
                <SlidersHorizontal size={20} className="mr-2" />
                Filtrlar {showFilters ? '▼' : '▶'}
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Filtrlarni tozalash
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategoriya
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input"
                  >
                    {categories.map(category => (
                      <option key={category} value={category === 'Barchasi' ? '' : category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ish turi
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="input"
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type === 'Barchasi' ? '' : type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tajriba
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="input"
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level === 'Barchasi' ? '' : level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E'lon muddati
                  </label>
                  <select
                    value={filters.postedWithin}
                    onChange={(e) => handleFilterChange('postedWithin', e.target.value)}
                    className="input"
                  >
                    {postedWithinOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maosh oralig'i ($)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Dan"
                      value={filters.minSalary}
                      onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="Gacha"
                      value={filters.maxSalary}
                      onChange={(e) => handleFilterChange('maxSalary', e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Vakansiyalar {filters.query && `"${filters.query}" uchun`}
                </h1>
                <p className="text-gray-600">
                  {jobs.length} ta vakansiya topildi
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Saralash:</label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    updateURL(filters, currentPage, e.target.value)
                  }}
                  className="input w-auto"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="flex space-x-4">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                ))
              ) : jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <div 
                    key={job.id} 
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-100 hover:border-primary-200"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl bg-primary-50 p-3 rounded-xl">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                            <Link 
                              to={`/jobs/${job.id}`} 
                              className="hover:text-primary-600 transition-colors"
                            >
                              {job.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 font-medium">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {job.isNew && (
                          <span className="bg-gradient-to-r from-green-100 to-green-50 text-green-800 text-sm px-3 py-1.5 rounded-full font-semibold border border-green-200">
                            Yangi
                          </span>
                        )}
                        {job.isFeatured && (
                          <span className="bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 text-sm px-3 py-1.5 rounded-full font-semibold border border-yellow-200">
                            Tanlangan
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-3 text-primary-500" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-3 text-primary-500" />
                        <span className="font-medium">{job.type}</span>
                      </div>
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign size={16} className="mr-3" />
                        <span className="text-lg">{job.salary}</span>
                      </div>
                    </div>

                    {/* Skills/Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-primary-50 text-primary-700 text-sm px-3 py-1.5 rounded-lg font-medium border border-primary-100">
                        {job.category}
                      </span>
                      <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-lg font-medium border border-blue-100">
                        {job.experience}
                      </span>
                      <span className="bg-gray-50 text-gray-700 text-sm px-3 py-1.5 rounded-lg font-medium border border-gray-100">
                        {job.views} ko'rishlar
                      </span>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className="text-gray-500 font-medium">
                        {job.postedAt}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveJob(job.id)}
                          className="p-2 text-gray-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                          aria-label="Vakansiyani saqlash"
                        >
                          <Bookmark size={16} />
                        </button>
                        <Link
                          to={`/jobs/${job.id}`}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
                        >
                          Batafsil
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Hech narsa topilmadi
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Qidiruv mezonlaringizni o'zgartirib ko'ring yoki filtrlarni tozalang
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn btn-primary"
                  >
                    Filtrlarni tozalash
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      const newPage = currentPage - 1
                      setCurrentPage(newPage)
                      updateURL(filters, newPage, sortBy)
                    }
                  }}
                  disabled={currentPage === 1}
                  className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page)
                        updateURL(filters, page, sortBy)
                      }}
                      className={`btn ${
                        currentPage === page ? 'btn-primary' : 'btn-outline'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}

                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      const newPage = currentPage + 1
                      setCurrentPage(newPage)
                      updateURL(filters, newPage, sortBy)
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs

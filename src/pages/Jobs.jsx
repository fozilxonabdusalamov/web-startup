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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="space-y-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="card animate-pulse">
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
                jobs.map((job) => (
                  <div key={job.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex space-x-4 flex-1">
                        <div className="text-4xl">{job.logo}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h2 className="text-xl font-semibold text-gray-900">
                              <Link 
                                to={`/jobs/${job.id}`} 
                                className="hover:text-blue-600 transition-colors"
                              >
                                {job.title}
                              </Link>
                            </h2>
                            {job.isNew && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Yangi
                              </span>
                            )}
                            {job.isFeatured && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                Tanlangan
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          
                          <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-3">
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Briefcase size={14} className="mr-1" />
                              {job.type}
                            </div>
                            <div className="flex items-center">
                              <DollarSign size={14} className="mr-1" />
                              {job.salary}
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {job.postedAt}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {job.description}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleSaveJob(job.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="Vakansiyani saqlash"
                      >
                        <Bookmark size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{job.views} ko'rishlar</span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {job.category}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {job.experience}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Batafsil
                        </Link>
                        <button className="btn btn-outline btn-sm">
                          <ExternalLink size={14} className="mr-1" />
                          Ariza
                        </button>
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

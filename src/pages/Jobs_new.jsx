import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { 
  Search, Filter, MapPin, Briefcase, DollarSign, Clock,
  Building2, Calendar, Eye, BookmarkIcon, ChevronDown,
  X, ArrowUpDown, Grid3X3, List, RefreshCw, Sliders,
  TrendingUp, Star, CheckCircle, AlertCircle, Users,
  ChevronLeft, ChevronRight, MoreHorizontal, Heart,
  Share2, ExternalLink, Target, Award, Zap, Globe
} from 'lucide-react'

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    query: searchParams.get('query') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    jobType: searchParams.get('jobType') || '',
    experienceLevel: searchParams.get('experienceLevel') || '',
    salaryRange: searchParams.get('salaryRange') || '',
    postedWithin: searchParams.get('postedWithin') || '',
    featured: searchParams.get('featured') === 'true'
  })
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [savedJobs, setSavedJobs] = useState(new Set())
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedJobs, setSelectedJobs] = useState(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  
  const navigate = useNavigate()
  const itemsPerPage = 12

  // Categories and filter options
  const categories = [
    { value: '', label: 'Barcha kategoriyalar' },
    { value: 'it', label: 'IT va Texnologiya' },
    { value: 'design', label: 'Dizayn' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Moliya' },
    { value: 'education', label: 'Ta\'lim' },
    { value: 'healthcare', label: 'Sog\'liqni saqlash' },
    { value: 'construction', label: 'Qurilish' },
    { value: 'support', label: 'Qo\'llab-quvvatlash' }
  ]

  const jobTypes = [
    { value: '', label: 'Barcha turlar' },
    { value: 'full-time', label: 'To\'liq vaqt' },
    { value: 'part-time', label: 'Yarim vaqt' },
    { value: 'contract', label: 'Shartnoma' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'remote', label: 'Masofaviy' },
    { value: 'hybrid', label: 'Gibrid' }
  ]

  const experienceLevels = [
    { value: '', label: 'Barcha darajalar' },
    { value: 'entry', label: 'Boshlang\'ich (0-1 yil)' },
    { value: 'junior', label: 'Junior (1-3 yil)' },
    { value: 'mid', label: 'Middle (3-5 yil)' },
    { value: 'senior', label: 'Senior (5+ yil)' },
    { value: 'lead', label: 'Lead/Manager' },
    { value: 'executive', label: 'Executive' }
  ]

  const salaryRanges = [
    { value: '', label: 'Barcha maoshlar' },
    { value: '0-500', label: '$0 - $500' },
    { value: '500-1000', label: '$500 - $1000' },
    { value: '1000-1500', label: '$1000 - $1500' },
    { value: '1500-2000', label: '$1500 - $2000' },
    { value: '2000-3000', label: '$2000 - $3000' },
    { value: '3000+', label: '$3000+' }
  ]

  const postedWithinOptions = [
    { value: '', label: 'Barcha vaqt' },
    { value: '1', label: 'So\'nggi 24 soat' },
    { value: '3', label: 'So\'nggi 3 kun' },
    { value: '7', label: 'So\'nggi hafta' },
    { value: '30', label: 'So\'nggi oy' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Eng yangi' },
    { value: 'oldest', label: 'Eng eski' },
    { value: 'salary-high', label: 'Maosh (yuqoridan pastga)' },
    { value: 'salary-low', label: 'Maosh (pastdan yuqoriga)' },
    { value: 'relevance', label: 'Mos keladigan' },
    { value: 'company', label: 'Kompaniya nomi' }
  ]

  // Generate mock jobs data
  const generateMockJobs = useCallback(() => {
    const companies = [
      { name: 'TechSoft LLC', logo: '🚀', industry: 'IT', size: '100-500' },
      { name: 'Design Studio', logo: '🎨', industry: 'Design', size: '50-100' },
      { name: 'Growth Agency', logo: '📈', industry: 'Marketing', size: '20-50' },
      { name: 'Cloud Solutions', logo: '☁️', industry: 'IT', size: '500-1000' },
      { name: 'AI Innovations', logo: '🤖', industry: 'IT', size: '100-200' },
      { name: 'App Factory', logo: '📱', industry: 'IT', size: '50-150' },
      { name: 'FinTech Pro', logo: '💳', industry: 'Finance', size: '200-500' },
      { name: 'EduTech', logo: '📚', industry: 'Education', size: '50-100' },
      { name: 'HealthCare+', logo: '🏥', industry: 'Healthcare', size: '1000+' },
      { name: 'BuildPro', logo: '🏗️', industry: 'Construction', size: '100-300' }
    ]

    const jobTitles = {
      it: ['Senior React Developer', 'Full Stack Engineer', 'DevOps Engineer', 'UI/UX Designer', 
           'Data Scientist', 'Mobile Developer', 'Backend Developer', 'Frontend Developer',
           'Solution Architect', 'Tech Lead', 'Product Manager', 'QA Engineer'],
      design: ['UI/UX Designer', 'Graphic Designer', 'Motion Designer', 'Brand Designer',
               'Web Designer', 'Product Designer', 'Creative Director', 'Art Director'],
      marketing: ['Marketing Manager', 'Digital Marketer', 'Content Manager', 'SEO Specialist',
                  'Social Media Manager', 'Brand Manager', 'Growth Hacker', 'Marketing Analyst'],
      finance: ['Financial Analyst', 'Accountant', 'Finance Manager', 'Investment Advisor',
                'Risk Manager', 'Treasury Specialist', 'Budget Analyst', 'Credit Analyst'],
      education: ['English Teacher', 'Math Teacher', 'Curriculum Developer', 'Education Coordinator',
                  'Academic Advisor', 'Training Specialist', 'Learning Designer', 'Principal'],
      healthcare: ['Nurse', 'Doctor', 'Medical Assistant', 'Healthcare Administrator',
                   'Pharmacist', 'Physical Therapist', 'Lab Technician', 'Medical Coder'],
      construction: ['Project Manager', 'Civil Engineer', 'Architect', 'Construction Supervisor',
                     'Estimator', 'Safety Manager', 'Site Engineer', 'Quantity Surveyor'],
      support: ['Customer Support', 'Technical Support', 'Help Desk', 'Support Manager',
                'Client Success', 'Support Specialist', 'IT Support', 'Service Desk']
    }

    const locations = ['Toshkent', 'Samarqand', 'Buxoro', 'Namangan', 'Andijon', 'Farg\'ona', 
                      'Nukus', 'Qarshi', 'Termiz', 'Jizzax', 'Guliston', 'Kokand']
    
    const types = ['To\'liq vaqt', 'Yarim vaqt', 'Shartnoma', 'Freelance', 'Masofaviy', 'Gibrid']
    const experiences = ['Boshlang\'ich', 'Junior', 'Middle', 'Senior', 'Lead', 'Executive']
    
    const mockJobs = []
    
    for (let i = 1; i <= 150; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)]
      const categoryKeys = Object.keys(jobTitles)
      const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)]
      const titles = jobTitles[category]
      const title = titles[Math.floor(Math.random() * titles.length)]
      
      const salaryMin = Math.floor(Math.random() * 3000) + 500
      const salaryMax = salaryMin + Math.floor(Math.random() * 1500) + 500
      
      const postedDaysAgo = Math.floor(Math.random() * 30)
      const postedAt = new Date()
      postedAt.setDate(postedAt.getDate() - postedDaysAgo)
      
      const skills = {
        it: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'Docker'],
        design: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InVision', 'Principle'],
        marketing: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics', 'Content Marketing', 'Email Marketing'],
        finance: ['Excel', 'SAP', 'QuickBooks', 'Financial Modeling', 'Risk Analysis', 'GAAP'],
        education: ['Curriculum Design', 'LMS', 'Pedagogy', 'Assessment', 'Classroom Management'],
        healthcare: ['EMR', 'Medical Terminology', 'Patient Care', 'HIPAA', 'Clinical Skills'],
        construction: ['AutoCAD', 'Project Management', 'Safety Protocols', 'Building Codes'],
        support: ['Zendesk', 'Salesforce', 'Communication Skills', 'Problem Solving', 'CRM']
      }
      
      const categorySkills = skills[category] || skills.it
      const jobSkills = categorySkills.slice(0, Math.floor(Math.random() * 4) + 2)
      
      mockJobs.push({
        id: i,
        title,
        company: company.name,
        companyLogo: company.logo,
        companySize: company.size,
        location: locations[Math.floor(Math.random() * locations.length)],
        type: types[Math.floor(Math.random() * types.length)],
        experience: experiences[Math.floor(Math.random() * experiences.length)],
        category,
        salary: `$${salaryMin}-${salaryMax}`,
        salaryMin,
        salaryMax,
        postedAt: postedAt.toISOString(),
        postedDaysAgo,
        description: `${title} vazifasini bajarish uchun tajribali mutaxassis izlanmoqda. ${company.name} kompaniyasi ${company.size} xodimli, tez rivojlanayotgan tashkilot.`,
        requirements: ['Tegishli ta\'lim', 'Professional tajriba', 'Jamoada ishlash ko\'nikmalari', 'Ingliz tili bilimi'],
        benefits: ['Raqobatbardosh maosh', 'Flexible ish vaqti', 'Professional rivojlanish', 'Tibbiy sug\'urta'],
        skills: jobSkills,
        views: Math.floor(Math.random() * 5000) + 100,
        applicants: Math.floor(Math.random() * 50) + 1,
        isNew: postedDaysAgo <= 3,
        isFeatured: Math.random() > 0.8,
        isUrgent: Math.random() > 0.9,
        companyVerified: Math.random() > 0.3,
        remoteOk: types[Math.floor(Math.random() * types.length)] === 'Masofaviy' || Math.random() > 0.7,
        rating: (Math.random() * 2 + 3).toFixed(1) // 3.0 - 5.0
      })
    }
    
    return mockJobs
  }, [])

  // Load jobs data
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const mockJobs = generateMockJobs()
      setJobs(mockJobs)
      setLoading(false)
    }, 800)
  }, [generateMockJobs])

  // Filter and sort jobs
  useEffect(() => {
    let filtered = [...jobs]

    // Apply filters
    if (filters.query) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(filters.query.toLowerCase()))
      )
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category)
    }

    if (filters.jobType) {
      const typeMap = {
        'full-time': 'To\'liq vaqt',
        'part-time': 'Yarim vaqt',
        'contract': 'Shartnoma',
        'freelance': 'Freelance',
        'remote': 'Masofaviy',
        'hybrid': 'Gibrid'
      }
      filtered = filtered.filter(job => job.type === typeMap[filters.jobType])
    }

    if (filters.experienceLevel) {
      const expMap = {
        'entry': 'Boshlang\'ich',
        'junior': 'Junior',
        'mid': 'Middle',
        'senior': 'Senior',
        'lead': 'Lead',
        'executive': 'Executive'
      }
      filtered = filtered.filter(job => job.experience === expMap[filters.experienceLevel])
    }

    if (filters.salaryRange) {
      if (filters.salaryRange === '3000+') {
        filtered = filtered.filter(job => job.salaryMin >= 3000)
      } else {
        const [min, max] = filters.salaryRange.split('-').map(Number)
        filtered = filtered.filter(job => 
          job.salaryMin >= min && (max ? job.salaryMax <= max : true)
        )
      }
    }

    if (filters.postedWithin) {
      const days = parseInt(filters.postedWithin)
      filtered = filtered.filter(job => job.postedDaysAgo <= days)
    }

    if (filters.featured) {
      filtered = filtered.filter(job => job.isFeatured)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.postedAt) - new Date(a.postedAt)
        case 'oldest':
          return new Date(a.postedAt) - new Date(b.postedAt)
        case 'salary-high':
          return b.salaryMax - a.salaryMax
        case 'salary-low':
          return a.salaryMin - b.salaryMin
        case 'company':
          return a.company.localeCompare(b.company)
        case 'relevance':
        default:
          return b.views - a.views
      }
    })

    setFilteredJobs(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1)
  }, [jobs, filters, sortBy])

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString())
    })
    if (sortBy !== 'newest') params.append('sort', sortBy)
    if (currentPage > 1) params.append('page', currentPage.toString())
    
    setSearchParams(params)
  }, [filters, sortBy, currentPage, setSearchParams])

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      query: '',
      location: '',
      category: '',
      jobType: '',
      experienceLevel: '',
      salaryRange: '',
      postedWithin: '',
      featured: false
    })
  }

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) {
        newSet.delete(jobId)
      } else {
        newSet.add(jobId)
      }
      return newSet
    })
  }

  const handleBulkSave = () => {
    setSavedJobs(prev => new Set([...prev, ...selectedJobs]))
    setSelectedJobs(new Set())
    setShowBulkActions(false)
  }

  // Get paginated jobs
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-8">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Vakansiyalar</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600">
            {filteredJobs.length.toLocaleString()} ta vakansiya topildi
            {activeFiltersCount > 0 && ` (${activeFiltersCount} ta filtr qo'llanilgan)`}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Search bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                placeholder="Lavozim, kompaniya yoki kalit so'z"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder="Shahar yoki viloyat"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center space-x-2 px-4 py-3 border rounded-lg transition-colors relative ${
                showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Sliders size={20} />
              <span>Filtrlar</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input select"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>

                <select
                  value={filters.jobType}
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  className="input select"
                >
                  {jobTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>

                <select
                  value={filters.experienceLevel}
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  className="input select"
                >
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>

                <select
                  value={filters.salaryRange}
                  onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                  className="input select"
                >
                  {salaryRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>

                <select
                  value={filters.postedWithin}
                  onChange={(e) => handleFilterChange('postedWithin', e.target.value)}
                  className="input select"
                >
                  {postedWithinOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.featured}
                      onChange={(e) => handleFilterChange('featured', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Faqat tanlangan vakansiyalar</span>
                  </label>
                </div>

                <button
                  onClick={handleClearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                >
                  <X size={16} />
                  <span>Filtrlarni tozalash</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {showBulkActions && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedJobs.size} ta tanlangan
                </span>
                <button
                  onClick={handleBulkSave}
                  className="btn btn-sm btn-primary"
                >
                  Hammasini saqlash
                </button>
                <button
                  onClick={() => {
                    setSelectedJobs(new Set())
                    setShowBulkActions(false)
                  }}
                  className="btn btn-sm btn-outline"
                >
                  Bekor qilish
                </button>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500">
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredJobs.length)} / {filteredJobs.length}
          </div>
        </div>

        {/* Jobs Grid/List */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Hech narsa topilmadi</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Qidiruv parametrlaringizga mos vakansiya topilmadi. 
              Iltimos, boshqa kalit so'zlar yoki filtrlar bilan qayta urinib ko'ring.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleClearFilters}
                className="btn btn-primary"
              >
                Barcha filtrlarni tozalash
              </button>
              <div className="text-sm text-gray-500">
                Yoki mashhur qidiruvlarni sinab ko'ring:
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['React Developer', 'UX Designer', 'Project Manager', 'Data Scientist'].map(term => (
                  <button
                    key={term}
                    onClick={() => handleFilterChange('query', term)}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'
                : 'space-y-4 mb-8'
            }>
              {paginatedJobs.map((job, index) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  viewMode={viewMode}
                  isSaved={savedJobs.has(job.id)}
                  onSave={() => handleSaveJob(job.id)}
                  isSelected={selectedJobs.has(job.id)}
                  onSelect={(selected) => {
                    const newSelected = new Set(selectedJobs)
                    if (selected) {
                      newSelected.add(job.id)
                    } else {
                      newSelected.delete(job.id)
                    }
                    setSelectedJobs(newSelected)
                    setShowBulkActions(newSelected.size > 0)
                  }}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(Math.min(7, totalPages))].map((_, index) => {
                  let pageNum
                  if (totalPages <= 7) {
                    pageNum = index + 1
                  } else if (currentPage <= 4) {
                    pageNum = index + 1
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + index
                  } else {
                    pageNum = currentPage - 3 + index
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {totalPages > 7 && currentPage < totalPages - 3 && (
                  <>
                    <span className="px-2">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Job Card Component
const JobCard = ({ job, viewMode, isSaved, onSave, isSelected, onSelect, index }) => {
  const [showMore, setShowMore] = useState(false)
  
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6 border border-gray-200">
        <div className="flex items-start space-x-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="text-3xl">{job.companyLogo}</div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link 
                  to={`/jobs/${job.id}`}
                  className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {job.title}
                </Link>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-gray-600">{job.company}</span>
                  {job.companyVerified && (
                    <CheckCircle className="text-blue-500" size={16} />
                  )}
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-gray-600">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="ml-1 text-sm">{job.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {job.isNew && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full font-medium">
                    Yangi
                  </span>
                )}
                {job.isFeatured && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full font-medium">
                    ⭐ Tanlangan
                  </span>
                )}
                {job.isUrgent && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full font-medium">
                    🔥 Shoshilinch
                  </span>
                )}
                <button
                  onClick={onSave}
                  className={`p-2 rounded-lg transition-colors ${
                    isSaved ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Heart className={isSaved ? 'fill-current' : ''} size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Briefcase size={14} className="mr-1" />
                {job.type}
              </div>
              <div className="flex items-center text-green-600 font-medium">
                <DollarSign size={14} className="mr-1" />
                {job.salary}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                {job.postedDaysAgo === 0 ? 'Bugun' : `${job.postedDaysAgo} kun oldin`}
              </div>
            </div>
            
            <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 4).map((skill, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded font-medium">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 4 && (
                  <span className="text-gray-500 text-xs">+{job.skills.length - 4} ko'proq</span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  {job.views}
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-1" />
                  {job.applicants}
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Batafsil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group transform hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
      style={{ 
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.5s ease-out forwards'
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="text-3xl">{job.companyLogo}</div>
            <div>
              <Link 
                to={`/jobs/${job.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors group-hover:text-blue-600"
              >
                {job.title}
              </Link>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-gray-600 text-sm">{job.company}</span>
                {job.companyVerified && (
                  <CheckCircle className="text-blue-500" size={14} />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {job.isNew && (
              <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full font-medium">
                Yangi
              </span>
            )}
            <button
              onClick={onSave}
              className={`p-2 rounded-lg transition-colors ${
                isSaved ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Heart className={isSaved ? 'fill-current' : ''} size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={14} className="mr-2" />
            {job.location}
            {job.remoteOk && (
              <span className="ml-2 bg-green-50 text-green-700 px-2 py-0.5 text-xs rounded-full">
                Remote OK
              </span>
            )}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Briefcase size={14} className="mr-2" />
            {job.type} • {job.experience}
          </div>
          <div className="flex items-center text-green-600 text-sm font-medium">
            <DollarSign size={14} className="mr-2" />
            {job.salary}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded font-medium">
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-gray-500 text-xs">+{job.skills.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Eye size={14} className="mr-1" />
              {job.views}
            </div>
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              {job.applicants}
            </div>
            <div className="flex items-center">
              <Star className="text-yellow-400 fill-current mr-1" size={14} />
              {job.rating}
            </div>
          </div>
          
          <span className="text-gray-500 text-sm">
            {job.postedDaysAgo === 0 ? 'Bugun' : `${job.postedDaysAgo} kun oldin`}
          </span>
        </div>
      </div>

      {job.isFeatured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-b-xl"></div>
      )}
      {job.isUrgent && (
        <div className="bg-gradient-to-r from-red-400 to-pink-500 h-1 rounded-b-xl"></div>
      )}
    </div>
  )
}

export default Jobs

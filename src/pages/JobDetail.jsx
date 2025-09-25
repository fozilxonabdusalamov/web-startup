import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, MapPin, Calendar, Eye, Share2, Bookmark, ExternalLink,
  Building2, Users, Clock, DollarSign, Briefcase, CheckCircle, 
  AlertCircle, User, Mail, Phone, Globe, Star, Award, Target,
  FileText, Send, X, ChevronRight, Copy, Check, Shield, Zap,
  TrendingUp, Heart, MessageCircle, Download, Upload, Linkedin,
  Twitter, Facebook, ChevronDown, ChevronUp, PlayCircle
} from 'lucide-react'

// Mock comprehensive job data
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    experience: '5+ years',
    remote: 'Hybrid',
    urgency: 'high',
    featured: true,
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Node.js', 'GraphQL', 'AWS'],
    posted: '2 days ago',
    deadline: '2024-02-15',
    applicants: 47,
    views: 1250,
    status: 'active',
    benefits: [
      'Health, Dental & Vision Insurance',
      'Flexible PTO',
      'Remote Work Options',
      '$5,000 Learning Budget',
      'Stock Options',
      'Gym Membership',
      '401k Matching'
    ],
    perks: [
      'Free Lunch',
      'Standing Desks',
      'Latest MacBook Pro',
      'Conference Attendance',
      'Team Retreats'
    ],
    description: `We are seeking a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using modern technologies.
      
Key Responsibilities:
• Develop high-quality frontend applications using React and TypeScript
• Collaborate with design and backend teams to implement user interfaces
• Write clean, maintainable, and well-tested code
• Participate in code reviews and technical discussions
• Mentor junior developers and contribute to team growth
• Lead technical initiatives and architectural decisions
• Optimize applications for performance and scalability
      
Requirements:
• 5+ years of experience in frontend development
• Strong proficiency in React, JavaScript, and TypeScript
• Experience with modern CSS frameworks and methodologies
• Knowledge of testing frameworks (Jest, Cypress)
• Experience with version control systems (Git)
• Strong problem-solving and communication skills
• Experience with GraphQL and state management
• Understanding of web accessibility standards
      
Nice to Have:
• Experience with Next.js or similar SSR frameworks
• Knowledge of Docker and CI/CD pipelines
• Experience with micro-frontends
• Contribution to open-source projects`,
    company_info: {
      name: 'TechCorp Inc.',
      size: '50-100 employees',
      industry: 'Technology',
      founded: '2018',
      website: 'https://techcorp.com',
      logo: '/api/placeholder/80/80',
      rating: 4.8,
      reviews: 156,
      locations: ['San Francisco', 'New York', 'Austin'],
      description: 'TechCorp is a leading software development company specializing in innovative web solutions for enterprise clients.',
      culture: [
        'Innovation-driven environment',
        'Work-life balance priority',
        'Continuous learning culture',
        'Diversity and inclusion focus'
      ],
      tech_stack: ['React', 'Node.js', 'AWS', 'MongoDB', 'Docker', 'Kubernetes']
    },
    recruiter: {
      name: 'Sarah Johnson',
      title: 'Senior Technical Recruiter',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      photo: '/api/placeholder/60/60'
    },
    interview_process: [
      { step: 1, name: 'Initial Screening', duration: '30 min', type: 'Phone' },
      { step: 2, name: 'Technical Assessment', duration: '90 min', type: 'Online' },
      { step: 3, name: 'Team Interview', duration: '60 min', type: 'Video' },
      { step: 4, name: 'Final Interview', duration: '45 min', type: 'In-person' }
    ]
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    experience: '3+ years',
    remote: 'Remote',
    urgency: 'medium',
    featured: false,
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
    posted: '1 week ago',
    deadline: '2024-02-20',
    applicants: 23,
    views: 892,
    status: 'active',
    benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Equity'],
    description: 'Join our dynamic startup as a Full Stack Developer...',
    company_info: {
      name: 'StartupXYZ',
      size: '10-50 employees',
      industry: 'Fintech',
      founded: '2022',
      website: 'https://startupxyz.com',
      logo: '/api/placeholder/80/80',
      rating: 4.2,
      reviews: 34,
      locations: ['New York'],
      description: 'Revolutionary fintech startup changing how people manage money.',
      culture: ['Fast-paced', 'Innovative', 'Collaborative'],
      tech_stack: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    recruiter: {
      name: 'Mike Chen',
      title: 'CTO',
      email: 'mike@startupxyz.com',
      phone: '+1 (555) 987-6543',
      photo: '/api/placeholder/60/60'
    }
  }
]

function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [applied, setApplied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [relatedJobs, setRelatedJobs] = useState([])
  const [viewCount, setViewCount] = useState(0)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  })
  
  // Scroll effect for sticky header (removed as not used in current implementation)
  useEffect(() => {
    // Reserved for future sticky header functionality
  }, [])
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const foundJob = mockJobs.find(job => job.id === parseInt(id))
        if (foundJob) {
          setJob(foundJob)
          setViewCount(foundJob.views || Math.floor(Math.random() * 500) + 100)
          
          const related = mockJobs.filter(j => j.id !== parseInt(id)).slice(0, 3)
          setRelatedJobs(related)
          
          setViewCount(prev => prev + 1)
        } else {
          setError('Job not found')
        }
      } catch {
        setError('Failed to load job details')
      } finally {
        setLoading(false)
      }
    }
    
    fetchJob()
  }, [id])
  
  const handleApply = () => {
    setShowApplicationModal(true)
  }
  
  const handleSave = () => {
    setSaved(!saved)
    const bookmark = document.querySelector('.bookmark-icon')
    if (bookmark) {
      bookmark.classList.add('animate-bounce')
      setTimeout(() => bookmark.classList.remove('animate-bounce'), 600)
    }
  }
  
  const handleShare = async (platform) => {
    const url = window.location.href
    const title = job?.title
    const text = `Check out this job: ${title} at ${job?.company}`
    
    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(url)
          setCopiedLink(true)
          setTimeout(() => setCopiedLink(false), 2000)
        } catch {
          const textArea = document.createElement('textarea')
          textArea.value = url
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          setCopiedLink(true)
          setTimeout(() => setCopiedLink(false), 2000)
        }
        break
    }
    
    setShowShareModal(false)
  }
  
  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    setApplied(true)
    setShowApplicationModal(false)
  }
  
  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The job you're looking for doesn't exist or has been removed. 
            It might have been filled or the posting has expired.
          </p>
          <div className="space-y-4">
            <Link to="/jobs" className="btn btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse All Jobs
            </Link>
            <div className="text-sm text-gray-500">
              or <Link to="/" className="text-primary-600 hover:text-primary-700">return to homepage</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/jobs" className="text-gray-600 hover:text-primary-600 transition-colors">
              Jobs
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{job.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-full transform translate-x-8 -translate-y-8"></div>
              </div>
              
              <div className="relative">
                {/* Status Badges */}
                <div className="flex items-center gap-2 mb-4">
                  {job.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  )}
                  {job.urgency === 'high' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <Zap className="w-3 h-3" />
                      Urgent
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3" />
                    Actively Hiring
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {job.title}
                </h1>

                {/* Company & Location */}
                <div className="flex flex-wrap items-center gap-6 mb-6 text-lg">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Building2 className="w-5 h-5 text-primary-600" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-5 h-5" />
                    {job.type}
                  </div>
                  {job.remote && (
                    <div className="flex items-center gap-2 text-primary-600">
                      <Globe className="w-5 h-5" />
                      {job.remote}
                    </div>
                  )}
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">{job.salary}</div>
                    <div className="text-sm text-gray-600">Salary</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">{job.experience}</div>
                    <div className="text-sm text-gray-600">Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">{viewCount}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">{job.applicants}</div>
                    <div className="text-sm text-gray-600">Applicants</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleApply}
                    disabled={applied}
                    className={`btn ${applied ? 'btn-success' : 'btn-primary'} btn-lg px-8`}
                  >
                    {applied ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Applied Successfully
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Apply Now
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleSave}
                    className={`btn ${saved ? 'btn-primary' : 'btn-outline'} btn-lg`}
                  >
                    <Bookmark className={`w-5 h-5 mr-2 bookmark-icon ${saved ? 'fill-current' : ''}`} />
                    {saved ? 'Saved' : 'Save Job'}
                  </button>
                  
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="btn btn-outline btn-lg"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </button>
                </div>

                {/* Posted Date & Deadline */}
                <div className="flex items-center gap-6 mt-6 pt-6 border-t text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Posted {job.posted}
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    Apply by {new Date(job.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary-600" />
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium hover:bg-primary-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary-600" />
                Job Description
              </h2>
              <div className="prose prose-lg max-w-none">
                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                  {job.description}
                </pre>
              </div>
            </div>

            {/* Benefits & Perks */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-600" />
                Benefits & Perks
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                  <div className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {job.perks && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Perks</h3>
                    <div className="space-y-2">
                      {job.perks.map((perk, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                          <span className="text-gray-700">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interview Process */}
            {job.interview_process && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-primary-600" />
                  Interview Process
                </h2>
                <div className="space-y-4">
                  {job.interview_process.map((step, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{step.name}</h4>
                        <p className="text-gray-600 text-sm">{step.duration} • {step.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                  Similar Jobs
                </h2>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <Link
                      key={relatedJob.id}
                      to={`/jobs/${relatedJob.id}`}
                      className="block p-6 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{relatedJob.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{relatedJob.company}</span>
                            <span>{relatedJob.location}</span>
                            <span>{relatedJob.salary}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">Ready to Apply?</h3>
              <p className="text-primary-700 mb-4 text-sm">
                Join {job.applicants} other candidates who have already applied for this position.
              </p>
              <button
                onClick={handleApply}
                disabled={applied}
                className="btn btn-primary w-full"
              >
                {applied ? 'Applied' : 'Apply Now'}
              </button>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.company_info.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(job.company_info.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {job.company_info.rating} ({job.company_info.reviews} reviews)
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {job.company_info.description}
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium text-gray-900">{job.company_info.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Company Size</span>
                  <span className="font-medium text-gray-900">{job.company_info.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium text-gray-900">{job.company_info.founded}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={job.company_info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Website
                </a>
                <Link
                  to={`/employers/${job.company_info.name.toLowerCase().replace(' ', '-')}`}
                  className="btn btn-outline w-full"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  View All Jobs
                </Link>
              </div>
            </div>

            {/* Contact Recruiter */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Recruiter</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{job.recruiter.name}</h4>
                  <p className="text-sm text-gray-600">{job.recruiter.title}</p>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href={`mailto:${job.recruiter.email}`}
                  className="btn btn-outline w-full text-left"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  {job.recruiter.email}
                </a>
                <a
                  href={`tel:${job.recruiter.phone}`}
                  className="btn btn-outline w-full text-left"
                >
                  <Phone className="w-4 h-4 mr-3" />
                  {job.recruiter.phone}
                </a>
                {job.recruiter.linkedin && (
                  <a
                    href={job.recruiter.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline w-full text-left"
                  >
                    <Linkedin className="w-4 h-4 mr-3" />
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>

            {/* Job Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-bold text-gray-900">{viewCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-bold text-gray-900">{job.applicants}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium text-gray-900">{job.posted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span className="font-medium text-red-600">{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Report Job */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <button className="text-red-600 hover:text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Report this job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Share this job</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
                <span className="font-medium">LinkedIn</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Facebook</span>
              </button>
              <button
                onClick={() => handleShare('email')}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Email</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={typeof window !== 'undefined' ? window.location.href : ''}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-600"
              />
              <button
                onClick={() => handleShare('copy')}
                className="btn btn-primary btn-sm"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Apply for {job.title}</h3>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={applicationData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="input"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={applicationData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={applicationData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="input"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleInputChange('resume', e.target.files[0])}
                  className="input"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  rows={4}
                  value={applicationData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  className="input"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" required className="rounded border-gray-300" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-primary-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetail

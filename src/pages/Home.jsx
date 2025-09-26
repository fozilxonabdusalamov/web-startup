import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  Play,
  Award,
  Globe,
  Clock,
  DollarSign,
  Filter,
  ChevronRight,
  Zap,
  Shield,
  Target,
  Heart,
  Code,
  Palette,
  BookOpen,
  Headphones,
  Calculator,
  Truck,
  Stethoscope,
  Hammer,
  Camera,
  Music,
  Coffee,
  Lightbulb,
  PieChart,
  BarChart3,
  UserCheck,
  Sparkles,
  Trophy,
  Rocket,
  Eye,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import "./Home.css";

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  // Animation intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [featuredJobs, categories]);

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Mock featured jobs data
      setFeaturedJobs([
        {
          id: 1,
          title: "Senior React Developer",
          company: "TechSoft LLC",
          logo: "🚀",
          location: "Toshkent, O'zbekiston",
          type: "To'liq vaqt",
          salary: "$2,000-3,500",
          postedDays: 2,
          isNew: true,
          isFeatured: true,
          skills: ["React", "TypeScript", "Node.js", "GraphQL"],
          description:
            "Join our dynamic team and build cutting-edge web applications.",
        },
        {
          id: 2,
          title: "UI/UX Designer",
          company: "Design Studio Pro",
          logo: "🎨",
          location: "Samarqand, O'zbekiston",
          type: "Masofaviy",
          salary: "$1,500-2,500",
          postedDays: 1,
          isNew: true,
          isFeatured: true,
          skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
          description: "Create beautiful and intuitive user experiences.",
        },
        {
          id: 3,
          title: "Marketing Manager",
          company: "Growth Agency",
          logo: "📈",
          location: "Toshkent, O'zbekiston",
          type: "To'liq vaqt",
          salary: "$1,800-2,800",
          postedDays: 3,
          isNew: false,
          isFeatured: true,
          skills: ["Digital Marketing", "Analytics", "Strategy", "SEO"],
          description: "Drive marketing strategies for innovative companies.",
        },
        {
          id: 4,
          title: "DevOps Engineer",
          company: "Cloud Solutions",
          logo: "☁️",
          location: "Namangan, O'zbekiston",
          type: "Gibrid",
          salary: "$2,500-4,000",
          postedDays: 4,
          isNew: false,
          isFeatured: true,
          skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
          description: "Scale and optimize cloud infrastructure.",
        },
        {
          id: 5,
          title: "Data Scientist",
          company: "AI Innovations",
          logo: "🤖",
          location: "Toshkent, O'zbekiston",
          type: "To'liq vaqt",
          salary: "$2,200-3,800",
          postedDays: 5,
          isNew: false,
          isFeatured: true,
          skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
          description: "Unlock insights from complex data sets.",
        },
        {
          id: 6,
          title: "Mobile Developer",
          company: "App Factory",
          logo: "📱",
          location: "Andijon, O'zbekiston",
          type: "Masofaviy",
          salary: "$1,800-3,200",
          postedDays: 7,
          isNew: false,
          isFeatured: true,
          skills: ["Flutter", "React Native", "iOS", "Android"],
          description: "Build next-generation mobile applications.",
        },
      ]);

      // Mock categories data
      setCategories([
        {
          id: 1,
          name: "IT va Texnologiya",
          slug: "technology",
          icon: Code,
          jobs: 12450,
          color: "text-blue-600",
          description: "Dasturlash, web-development, data science",
        },
        {
          id: 2,
          name: "Dizayn",
          slug: "design",
          icon: Palette,
          jobs: 3240,
          color: "text-purple-600",
          description: "UI/UX, grafik dizayn, branding",
        },
        {
          id: 3,
          name: "Marketing",
          slug: "marketing",
          icon: Target,
          jobs: 5680,
          color: "text-green-600",
          description: "Digital marketing, SMM, content",
        },
        {
          id: 4,
          name: "Moliya",
          slug: "finance",
          icon: Calculator,
          jobs: 4320,
          color: "text-yellow-600",
          description: "Accounting, banking, investment",
        },
        {
          id: 5,
          name: "Ta'lim",
          slug: "education",
          icon: BookOpen,
          jobs: 2890,
          color: "text-indigo-600",
          description: "O'qituvchi, trener, mentor",
        },
        {
          id: 6,
          name: "Sog'liqni saqlash",
          slug: "healthcare",
          icon: Stethoscope,
          jobs: 1650,
          color: "text-red-600",
          description: "Shifokor, hamshira, farmatsevt",
        },
        {
          id: 7,
          name: "Qurilish",
          slug: "construction",
          icon: Hammer,
          jobs: 2340,
          color: "text-orange-600",
          description: "Muhandis, arxitektor, foreman",
        },
        {
          id: 8,
          name: "Qo'llab-quvvatlash",
          slug: "support",
          icon: Headphones,
          jobs: 1890,
          color: "text-teal-600",
          description: "Customer service, technical support",
        },
      ]);

      // Mock testimonials data
      setTestimonials([
        {
          id: 1,
          name: "Aziza Karimova",
          role: "Frontend Developer",
          company: "TechCorp",
          avatar: "👩‍💻",
          rating: 5,
          text: "JobBoard orqali orzuimdagi ishni topdim. Platforma juda qulay va professional. Har qadamda yordam va qo'llab-quvvatlash bor.",
          duration: "2 hafta ichida ish topdim",
        },
        {
          id: 2,
          name: "Bobur Rahimov",
          role: "Marketing Manager",
          company: "Growth Agency",
          avatar: "👨‍💼",
          rating: 5,
          text: "Ajoyib platform! Ko'plab sifatli vakansiyalar va oson qidiruv tizimi. HR menegerlar bilan to'g'ridan-to'g'ri aloqa o'rnatish imkoni bor.",
          duration: "1 oy ichida 3 ta taklif oldim",
        },
        {
          id: 3,
          name: "Nilufar Sodiqova",
          role: "UX Designer",
          company: "Design Studio",
          avatar: "👩‍🎨",
          rating: 5,
          text: "Eng yaxshi ish qidirish platformasi! Har doim yangi imkoniyatlar bor. Portfolio ko'rsatish va kompaniyalar bilan networking uchun ajoyib.",
          duration: "Dream job topildi!",
        },
        {
          id: 4,
          name: "Akmal Tursunov",
          role: "DevOps Engineer",
          company: "CloudTech",
          avatar: "👨‍💻",
          rating: 5,
          text: "Professional dasturchilar uchun eng yaxshi platform. Salary range'lar aniq ko'rsatilgan va interview jarayoni shaffof.",
          duration: "3 hafta ichida remote job",
        },
      ]);

      loadData();
    };

    loadData();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const features = [
  
    {
      icon: Shield,
      title: "100% Xavfsiz",
      description: "Ma'lumotlaringiz shifrlangan va himoyalangan",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "250K+ Jamoa",
      description: "Faol professional jamoamizga qo'shiling",
      color: "text-blue-600",
    },
    {
      icon: Award,
      title: "Verified Jobs",
      description: "Faqat tekshirilgan va sifatli vakansiyalar",
      color: "text-purple-600",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Personallashtirilgan Qidiruv",
      description:
        "AI sizning ko'nikmalaringiz va tajribangizga mos vakansiyalarni tavsiya qiladi. Smart matching algoritmi orqali eng yaxshi imkoniyatlarni toping.",
    },
    {
      icon: Rocket,
      title: "Tez Ariza Berish",
      description:
        "Bir klikda ko'plab vakansiyalarga ariza yuboring. Auto-fill CV va cover letter generatsiyasi bilan vaqtingizni tejang.",
    },
    {
      icon: Heart,
      title: "Karyera Coaching",
      description:
        "Professional career coach'lardan bepul maslahat oling. Interview tayyorlash, CV yaxshilash va karyera rejalashtirish bo'yicha yordam.",
    },
    {
      icon: Globe,
      title: "Global Imkoniyatlar",
      description:
        "Mahalliy va xalqaro kompaniyalardagi vakansiyalar. Remote work, freelance va full-time imkoniyatlarga ega bo'ling.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Faol vakansiya", icon: Briefcase },
    { number: "250K+", label: "Ro'yxatdan o'tgan", icon: Users },
    { number: "5K+", label: "Kompaniya", icon: Building2 },
    { number: "98%", label: "Muvaffaqiyat", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-decoration hero-decoration-1"></div>
          <div className="hero-decoration hero-decoration-2"></div>
          <div className="hero-decoration hero-decoration-3"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-gradient">Orzuyingizdagi</span>
              <br />
              ishni toping
            </h1>

            <p className="hero-subtitle">
              50,000+ vakansiya, 5,000+ kompaniya va minglab muvaffaqiyat
              hikoyalar sizni kutmoqda. Professional karyerangizni bugun
              boshlang va o'z sohangizda yetakchi bo'ling.
            </p>

            {/* Hero Stats */}
            <div className="hero-stats">
              {" "}
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <div className="hero-stat-number">{stat.number}</div>
                  <div className="hero-stat-label">
                    <stat.icon
                      size={16}
                      style={{
                        display: "inline",
                        marginRight: "0.5rem",
                        color: "#886BFF",
                      }}
                    />
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nega aynan JobBoard?</h2>
            <p className="section-subtitle">
              Eng zamonaviy texnologiyalar va professional yondashuv bilan ish
              qidirish jarayonini osonlashtirdik va samarali qildik
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                data-animate
                id={`feature-${index}`}
                className={`feature-card fade-in ${
                  visibleElements.has(`feature-${index}`) ? "visible" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="feature-icon">
                  <feature.icon className={feature.color} size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="jobs-section">
        <div className="container">
          <div className="jobs-header">
            <div className="jobs-header-content">
              <h2>Tanlangan vakansiyalar</h2>
              <p>
                Eng yaxshi kompaniyalardan maxsus tanlov va ekskluziv takliflar
              </p>
            </div>
            <Link to="/jobs?featured=true" className="jobs-view-all">
              <span>Barchasini ko'rish</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="jobs-grid">
            {featuredJobs.map((job, index) => (
              <div
                key={job.id}
                data-animate
                id={`job-${index}`}
                className={`job-card fade-in ${
                  visibleElements.has(`job-${index}`) ? "visible" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="job-header">
                  <div className="job-company-info">
                    <div className="job-logo">{job.logo}</div>
                    <div className="job-info">
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                    </div>
                  </div>
                  {job.isNew && <span className="job-badge">Yangi</span>}
                </div>

                <div className="job-details">
                  <div className="job-detail">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="job-detail">
                    <Clock size={16} />
                    <span>{job.type}</span>
                  </div>
                  <div className="job-detail">
                    <DollarSign size={16} />
                    <span className="job-salary">{job.salary}</span>
                  </div>
                </div>

                <div className="job-skills">
                  {job.skills?.slice(0, 4).map((skill) => (
                    <span key={skill} className="job-skill">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="job-footer">
                  <span className="job-posted">{job.postedDays} kun oldin</span>
                  <Link to={`/jobs/${job.id}`} className="job-apply-btn">
                    Batafsil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Kategoriyalar bo'yicha qidiring</h2>
            <p className="section-subtitle">
              O'zingizga mos sohada minglab vakansiyalar va professional
              imkoniyatlar
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/jobs?category=${category.slug}`}
                data-animate
                id={`category-${index}`}
                className={`category-card fade-in ${
                  visibleElements.has(`category-${index}`) ? "visible" : ""
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="category-icon">
                  <category.icon className={category.color} size={28} />
                </div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-count">
                  {category.jobs.toLocaleString()} ta vakansiya
                </p>
              </Link>
            ))}
          </div>

          <div className="categories-view-all">
            <Link to="/jobs" className="categories-view-all-btn">
              <span>Barcha kategoriyalar</span>
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Bizning afzalliklarimiz</h2>
            <p className="section-subtitle">
              JobBoard platformasini tanlash orqali siz professional
              karyerangizda yangi imkoniyatlarga ega bo'lasiz
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                data-animate
                id={`benefit-${index}`}
                className={`benefit-card fade-in ${
                  visibleElements.has(`benefit-${index}`) ? "visible" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="benefit-icon">
                  <benefit.icon className="text-blue-600" size={24} />
                </div>
                <div className="benefit-content">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Foydalanuvchilar fikri</h2>
            <p className="section-subtitle">
              Bizning platformamiz orqali ish topgan professionallarning haqiqiy
              tajribasi
            </p>
          </div>

          {testimonials.length > 0 && (
            <div className="testimonial-container">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400"
                      size={20}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <blockquote className="testimonial-text">
                  {testimonials[currentTestimonial]?.text}
                </blockquote>

                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonials[currentTestimonial]?.avatar}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonials[currentTestimonial]?.name}</h4>
                    <p className="role">
                      {testimonials[currentTestimonial]?.role} -{" "}
                      {testimonials[currentTestimonial]?.company}
                    </p>
                    <p className="duration">
                      {testimonials[currentTestimonial]?.duration}
                    </p>
                  </div>
                </div>
              </div>

              <div className="testimonial-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`testimonial-dot ${
                      index === currentTestimonial ? "active" : ""
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

# Ish qidirish platformasi — Texnik topshiriq (TT) v2.0

Bu hujjat “Job Board” (Ish qidirish platformasi) uchun to‘liq funksional, texnik, UX/UI va qabul mezonlarini belgilaydi. Foydalanuvchi segmentlari: Ish izlovchi (Seeker), Ish beruvchi (Employer), Administrator (Admin), Mehmon (Guest).

## 0. Loyiha maqsadi

- Ish izlovchi: vakansiyalarni qidirish, filtrlash, saqlash, ariza topshirish.
- Ish beruvchi: vakansiya joylash, arizalarni ko‘rish va boshqarish, kompaniya brendi sahifasi.
- MVP ishga tushirish: 4–6 hafta. KPI (MVP):
  - P95 sahifa ochilishi ≤ 3s, LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms
  - Qidiruvdan ariza topshirish konversiyasi ≥ 2%
  - SEO: Top 100 kalit so‘zda indeksatsiya va 70+ Lighthouse SEO score

## 1. Rol va ruxsatlar

- Guest: Jobs ko‘rish, qidirish, kategoriya bo‘yicha ko‘rish, vakansiya detallari, FAQ, Aloqa.
- Seeker: yuqoridagilarga qo‘shimcha profil, CV/rezume, saqlangan vakansiyalar, ariza topshirish, ariza statuslari.
- Employer: kompaniya profili, vakansiya yaratish/tahrirlash, arizalar ro‘yxati, nomzodlar bilan aloqa.
- Admin: foydalanuvchi boshqaruvi, kontent moderatsiyasi, kategoriyalar/teglar, hisobotlar/analytics.

## 2. Axborot arxitekturasi va navigatsiya

### 2.1 Navbar (sticky)

- Elementlar:
  - Logo (Home-ga olib boradi)
  - Home
  - Jobs
  - Employers
  - Login/Register
  - Login bo‘lganda: avatar dropdown (Profile, Dashboard, Saved Jobs, Logout)
- Responsiv:
  - Desktop: to‘liq menyu
  - Tablet/Mobil: hamburger menyu; “Login/Register” — primary CTA
- Holatlar: active/hover/focus; light/dark kontrast; 320px+ ekranlar uchun.

Qabul mezonlari:

- [ ] Logo doim Home-ga olib boradi
- [ ] Ruxsatga ko‘ra menyu bandlari to‘g‘ri ko‘rinadi (Seeker/Employer/Admin)
- [ ] Mobil menyu 320px’da ochilib-yopiladi, klaviatura bilan boshqariladi
- [ ] Focus ring WCAG 2.1 AA talabiga mos

### 2.2 Hero (Home yuqori qismi)

- Sarlavha: “Find Your Dream Job”
- Sub-sarlavha: “Orzuyingizdagi ishni toping”
- Qidiruv:
  - Input: “Lavozim yoki kalit so‘z” (e.g., Developer, Designer)
  - Input: “Joylashuv” (Toshkent, Namangan…). Geolokatsiya ixtiyoriy; ruxsat bo‘lmasa nozik degradatsiya.
  - Button: Qidirish
  - Link: Advanced filters → /jobs
- Tez teglar: IT Developer, Designer, Teacher… (bosilganda qidiruvni to‘ldiradi)

Qabul mezonlari:

- [ ] Enter bosilganda /jobs?query=&location= ga yo‘naltiriladi
- [ ] Mobil qurilmada inputlar ustma-ust, tugma to‘liq kenglikda
- [ ] Geolokatsiya ruxsati rad etilganda xato xabarsiz ishlashda davom etadi

### 2.3 Featured Jobs

- 6–8 ta “featured” yoki so‘nggi vakansiyalar, serverdan sort/flag orqali
- Karta: lavozim, kompaniya, lokatsiya, ish turi (Full-time/Part-time/Remote), maosh (ixtiyoriy), “New/Featured” belgisi, sana
- Amal: “Ko‘rish” (detail), “Saqlash” (login talab qilinadi)

Qabul mezonlari:

- [ ] Bo‘sh holatda skeleton va “Hozircha tanlangan vakansiyalar yo‘q”
- [ ] Saqlash bosilganda login bo‘lmasa auth modal ochiladi
- [ ] 2 qatorga truncation; kartalar teng balandlikda

### 2.4 Category Cards

- Kategoriyalar: IT, Finance, Education, Marketing…
- Karta: ikonka, nom, vakansiyalar soni
- Klik: /jobs?category={slug}

Qabul mezonlari:

- [ ] Kategoriya soni real vaqtga yaqin (≤ 15 min kechikish) ko‘rsatiladi
- [ ] Klaviatura va screen reader uchun to‘liq kirish imkoniyati

### 2.5 Footer

- Bo‘limlar:
  - Aloqa (kontakt form/link)
  - FAQ
  - Privacy Policy
  - Terms of Service (qo‘shish)
  - Social links (ixtiyoriy)
  - Til selektori: Uz / Ru / En
- Huquq: © {yil} {brand}.

Qabul mezonlari:

- [ ] Footer barcha sahifalarda mavjud
- [ ] Privacy/Terms sahifalari SSR va indeksatsiyaga ochiq

## 3. Asosiy sahifalar va oqimlar

### 3.1 Jobs ro‘yxati (Search/Listing) — /jobs

- Filtrlar:
  - Kalit so‘z, Lokatsiya
  - Kategoriya, Ish turi (Full-time, Part-time, Contract, Remote)
  - Maosh oralig‘i (min-max), Tajriba (Junior/Mid/Senior)
  - Sana bo‘yicha (so‘nggi 24h/7d/30d)
- Sort: Yangi, Moslik, Maosh (↑/↓)
- Natijalar: karta ro‘yxati, pagination yoki infinite scroll
- Empty state: “Hech narsa topilmadi” + foydali takliflar

Qabul mezonlari:

- [ ] URL parametrlaridan state qayta tiklanadi
- [ ] Filtr o‘zgarsa query-string yangilanadi (sharable)
- [ ] Server-side pagination (P95 < 3s)

### 3.2 Job Detail — /jobs/{slug-id}

- Tarkib:
  - Lavozim, kompaniya, lokatsiya, ish turi, maosh, e’lon sanasi, ko‘rishlar soni
  - Tavsif (markdown), talablar, imtiyozlar
  - Kompaniya kartasi: logo, nom, sahifa (/employers/{slug})
  - CTA: Apply Now, Save Job, Share
- SEO:
  - Meta title/description, OpenGraph, FAQ schema (ixtiyoriy)

Qabul mezonlari:

- [ ] Apply bosilganda: onboarding yoki apply modal (agar employer external link bo‘lsa — redirect)
- [ ] Saved holati real vaqt yangilanadi
- [ ] 404 uchun chiroyli “Job not found” sahifasi

### 3.3 Employers landing — /employers

- Nega biz? Tariflar (Free/Pro), qanday ishlaydi, muvaffaqiyat hikoyalari
- CTA: “Post a Job” (registratsiya → employer onboarding)

Qabul mezonlari:

- [ ] Tariflar taqqoslama jadvali
- [ ] “Post a Job”ga 2 klikdan ko‘p bo‘lmasin

### 3.4 Employer Dashboard — /dashboard/employer

- Bo‘limlar:
  - My Jobs (draft/published/archived)
  - Create Job (multi-step forma)
  - Applications (job bo‘yicha filtr, status: New/In Review/Interview/Rejected/Hired)
  - Company Profile (logo, about, links)
  - Billing (ixtiyoriy, agar pullik)
- Import: vakansiyani JSON/CSV’dan import (ixtiyoriy)

Qabul mezonlari:

- [ ] Job yaratish formasi autosave draft
- [ ] Application status o‘zgarishi activity logga yoziladi

### 3.5 Seeker Dashboard — /dashboard/seeker

- Bo‘limlar: Profile, Resume/CV, Saved Jobs, Applications, Alerts (email job alerts)
- Profile: ism, email, telefon, skills, experience, education
- CV: fayl (.pdf, .docx) va builder (ixtiyoriy)

Qabul mezonlari:

- [ ] Saved Jobs offline-first (IndexedDB) ko‘rinishda ham cachelanadi
- [ ] Applications ro‘yxatida statuslar real vaqtga yaqin yangilanadi

### 3.6 Auth oqimi

- Login/Register (email/password, ijtimoiy auth ixtiyoriy)
- Email verifikatsiya
- Forgot/Reset password
- Seeker/Employer rol tanlash

Qabul mezonlari:

- [ ] Parol siyosati: min 8, 1 katta, 1 raqam, 1 maxsus belg
- [ ] Rate limit: 10/min IP bo‘yicha
- [ ] 2FA (ixtiyoriy, keyingi bosqich)

### 3.7 Admin Panel — /admin

- Users, Jobs, Employers, Reports, Categories/Tags
- Moderatsiya: spam, nojo‘ya kontent flaglari
- Export: CSV/Excel, audit log

Qabul mezonlari:

- [ ] RBAC (Admin/Moderator) ajratilgan
- [ ] Harakatlar auditlanadi (kim, qachon, nima)

## 4. Dizayn va brending

- Dizayn tizimi: komponentlar (Button, Input, Select, Modal, Card, Tag, Badge, Pagination, Toast)
- Rangi: brend primary/secondary, success/warn/error, high contrast
- Dark/Light rejim (ixtiyoriy, keyinchalik)
- Tipografiya: 14–16px base font, 1.5+ line-height
- Ikkilamchi til: Uz (default), Ru, En

Qabul mezonlari:

- [ ] WCAG 2.1 AA rang kontrasti (4.5:1)
- [ ] Fokus ko‘rinadi, skip-to-content mavjud

## 5. Texnik arxitektura

### 5.1 Stack

- Frontend: Next.js (App Router, SSR/SSG/ISR), React 18, TypeScript, Tailwind/Chakra/AntD
- Backend: NestJS (Node.js), TypeScript, REST (keyinchalik GraphQL ixtiyoriy)
- DB: PostgreSQL (Primary), Prisma ORM
- Cache/Queue: Redis (session, rate-limit, job-alert queue)
- Fayl saqlash: S3-compatible (Cloudflare R2/MinIO/AWS S3)
- Auth: JWT (access/refresh), HTTP-only cookies; OAuth ixtiyoriy
- Search: Postgres full-text yoki Meilisearch/Elastic (keyingi bosqich)
- Infra: Docker, CI/CD (GitHub Actions), Vercel/Render/Fly.io yoki Kubernetes (ixtiyoriy)

### 5.2 API (MVP)

- Auth
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/logout
  - POST /api/auth/forgot-password
  - POST /api/auth/reset-password
  - GET /api/auth/me
- Jobs
  - GET /api/jobs?query=&location=&category=&type=&minSalary=&maxSalary=&experience=&postedWithin=&page=&size=&sort=
  - GET /api/jobs/{id}
  - POST /api/jobs (Employer)
  - PATCH /api/jobs/{id} (Owner/Admin)
  - DELETE /api/jobs/{id} (Owner/Admin)
- Applications
  - POST /api/jobs/{id}/apply (Seeker)
  - GET /api/employer/jobs/{id}/applications (Employer)
  - PATCH /api/applications/{id} (status)
- Saved Jobs
  - GET /api/saved
  - POST /api/saved/{jobId}
  - DELETE /api/saved/{jobId}
- Categories
  - GET /api/categories
- Employer
  - GET /api/employer/profile
  - PATCH /api/employer/profile
- Seeker
  - GET /api/seeker/profile
  - PATCH /api/seeker/profile
  - POST /api/seeker/cv (upload)
- Admin
  - GET /api/admin/dashboard
  - GET/PATCH /api/admin/jobs/{id}
  - GET/PATCH /api/admin/users/{id}

Response format: JSON; pagination: cursor yoki page/size; xatoliklar: RFC 7807 uslubida (problem+json).

### 5.3 Ma’lumotlar modeli (soddalashtirilgan)

- User { id, email, password_hash, role[seeker|employer|admin], name, phone, createdAt, verifiedAt }
- SeekerProfile { userId(FK), headline, location, skills[], experience[], education[], cvUrl }
- EmployerProfile { userId(FK), companyName, logoUrl, website, about, locations[], verified }
- Job { id, employerId(FK), title, slug, description_md, location, type, categoryId, salaryMin, salaryMax, currency, isFeatured, status[draft|published|archived], postedAt, views }
- Category { id, name, slug }
- Application { id, jobId(FK), seekerId(FK), cvUrl, coverLetter, status[new|review|interview|rejected|hired], createdAt, updatedAt }
- SavedJob { seekerId(FK), jobId(FK), savedAt }
- AuditLog { id, actorId, action, entityType, entityId, meta(json), createdAt }

Indekslar: Jobs(title, description tsvector), Jobs(location), Jobs(categoryId), Application(jobId, status), SavedJob(seekerId).

### 5.4 Xavfsizlik

- JWT HTTP-only cookies; refresh token rotation; CSRF himoya (same-site/labile)
- Rate limit: auth 10/min/IP; umumiy 100/min/IP
- Input validation (DTO + Zod/ class-validator)
- Fayl skan (ClamAV/AV Service) CV yuklamalari uchun
- RBAC middleware/guards
- Audit log (admin/employer muhim amallar)

### 5.5 Ishlash va kesh

- ISR/SSR: Home, Job detail, Category sahifalari
- API kesh: GET /jobs 60s (surge protektsiya), CDN
- Redis: tez-tez so‘raladigan ro‘yxatlar (categories, featured counts)
- N+1 oldini olish: Prisma include/select strategiyalari
- Background queues: email yuborish, job view inkrementi, job-alert digest

## 6. SEO, i18n, A11y, Analytics

### 6.1 SEO

- SSR meta: title/description, OpenGraph, Twitter cards
- Breadcrumb schema (Job detail), JobPosting schema (Google Jobs mark-up)
- Canonical URL, hreflang (Uz/Ru/En)
- Robots.txt, sitemap.xml (har 24 soatda), 404/410

### 6.2 i18n

- Lokalizatsiya: Uz (default), Ru, En; i18next/next-intl
- Matnlar JSON katalogi; RTL talab bo‘lsa keyinchalik qo‘shish

### 6.3 Accessibility (WCAG 2.1 AA)

- Kontrast ≥ 4.5:1, fokus ringlar, skip-link
- ARIA atributlari (role, aria-label), semantik HTML
- Klaviatura navigatsiyasi, form xato holati uchun “aria-describedby”

### 6.4 Analytics

- Pageview, search_query, filter_applied, job_view, job_save, job_apply_start, job_apply_complete, signup_complete, login_success, employer_job_posted, application_status_changed
- Consent banner (GDPR/Uzbekistan privacy mosligi)

## 7. Email va bildirishnomalar

- Templatlar:
  - Email verification (Seeker/Employer)
  - Password reset
  - Application received (Employer/Seeker)
  - Application status updated (Seeker)
  - Weekly job alerts (Seeker opt-in)
- Texnika: Transactional email (Resend/Sendgrid/SES), queue orqali yuborish, retry.

## 8. Test va sifat kafolati

### 8.1 Unit/Integration/E2E

- Front: Jest/RTL, Playwright/Cypress (kritik oqimlar)
- Back: Jest + Supertest; test DB; seedlar

### 8.2 Qabul mezonlari (umumiy)

- [ ] Navbar: barcha rol holatlari, mobil o‘lchamlar
- [ ] Qidiruv: URL bilan sinxron, Enter bilan ishlaydi
- [ ] Featured/Category: bo‘sh holat, skeletonlar
- [ ] Jobs listing: filtr/sort, pagination, sharable URL
- [ ] Job detail: Apply/Save oqimlari, SEO taglar
- [ ] Auth: register/login/reset; verifikatsiya
- [ ] Seeker dashboard: saved/applications CRUD
- [ ] Employer dashboard: job create/edit/publish, applications status
- [ ] Admin: moderatsiya, audit log
- [ ] A11y: klaviatura, screen reader tekshiruvi
- [ ] Performance: Lighthouse ≥ 80 (Perf/Best Practices/SEO)
- [ ] Error states: 4xx/5xx foydalanuvchi-do‘stona xabarlar

## 9. Yetkazib berish rejasi (MVP 4–6 hafta)

- 1-hafta:
  - Arxitektura, dizayn tizimi, auth skeleti, DB migratsiyalar
  - Home: Navbar, Hero, Footer, Category fetch
- 2-hafta:
  - Jobs API + Listing + Filters + SEO
  - Job detail + Apply oqimi (basic) + Save
- 3-hafta:
  - Seeker dashboard (Saved, Applications)
  - Employer: Create Job (draft → publish), Company profile
- 4-hafta:
  - Admin minimal (Jobs/Users ko‘rish, status)
  - Email templar, Analytics, Sitemap/Robots
- 5–6-hafta:
  - Hardening: A11y, perf tuning, i18n, e2e testlar
  - Prod tayyorlash: CI/CD, monitoring, loglar

Deliverables:

- Repo: frontend, backend, infradoc
- Dizayn fayllari (Figma)
- API OpenAPI (Swagger JSON/YAML)
- Qo‘llanma: deploy, env, runbook

## 10. Qo‘shimcha (nice-to-have)

- Social login (Google, GitHub)
- Advanced search (Meilisearch/Elastic)
- Job alerts real-time (web push)
- CV Builder
- Pricing/checkout (Stripe) va job boosting
- Company pages uchun “Open roles” vidjeti

## 11. Muhit o‘zgaruvchilari (env — namunaviy)

- FRONTEND: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_ANALYTICS_KEY
- BACKEND: DATABASE_URL, JWT_SECRET, REFRESH_SECRET, REDIS_URL, STORAGE_BUCKET, EMAIL_API_KEY, NODE_ENV, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX

## 12. Risklar va mitigatsiya

- Trafik piklari → CDN + ISR + kesh qatlamlari
- Spam arizalar → reCAPTCHA/Turnstile, rate limit, email verify
- Ma’lumot maxfiyligi → RBAC, audit log, PII shifrlash (ixtiyoriy)
- SEO penalti → toza SSR, canonical, duplikatlarga 301

---

Savollar yoki biznes qoidalarini aniqlashtirish uchun:

- Maoshni ko‘rsatish majburiymi?
- External apply linklari qo‘llab-quvvatlanadimi?
- Tariflar va to‘lov modeli (agar mavjud bo‘lsa)?
- Qaysi tillar MVP’da ishga tushadi (Uz/Ru/En kombinatsiyasi)?

Tayyor: implementatsiya uchun to‘liq TT v2.0.

/**
 * Zehra - Portfolio Main JavaScript Engine
 * Features: High-performance Particle Canvas, Filterable Projects & Modals,
 * Form Validation & Toast System.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Language Switcher (TR / EN)
  initLanguageSwitcher();

  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Interactive Particle Canvas Background
  initParticleCanvas();

  // 3. Header Scroll State & Mobile Navigation
  initNavigation();

  // 4. Project Filter & Deep-Dive Modals
  initProjectsSection();

  // 5. Contact Form & Email Copy Toast
  initContactFeatures();

  // 6. Title Marquee Effect
  initTitleMarquee();
});

/* ==========================================================================
   0. Internationalization (i18n) Engine (TR / EN)
   ========================================================================== */
const i18nData = {
  tr: {
    nav_home: "Giriş",
    nav_tech: "Teknolojiler",
    nav_projects: "Projeler",
    nav_about: "Hakkımda",
    nav_contact: "İletişim",

    hero_title: 'Kodluyor,<br><span class="gradient-text">Öğreniyor</span> &<br>Üretiyorum.',
    hero_desc: '.NET 9 & Bilgisayar Mühendisliği 3. sınıf öğrencisiyim. .NET, Angular, PostgreSQL ve Docker ile full-stack uygulamalar geliştiriyor; modern yazılım mimarileri ve yapay zeka destekli sistemler üzerine kendimi geliştiriyorum.',
    hero_btn_projects: 'Projelerimi Keşfet',
    hero_btn_contact: 'İletişime Geç',

    tech_subtitle: 'Yetkinlikler & Araçlar',
    tech_card1_title: 'Backend & Kurumsal Mimari',
    tech_card1_desc: 'Clean Architecture, Modüler Monolit ve DDD prensipleriyle güvenli, ölçeklenebilir kurumsal sistem tasarımı.',
    tech_card2_title: 'Modern Web Frontend',
    tech_card2_desc: 'Standalone bileşenler ve reaktif sinyaller (Signals) kullanarak dinamik kullanıcı arayüzleri.',
    tech_card3_title: 'Veri Tabanı & Altyapı',
    tech_card3_desc: 'İlişkisel modelleme, tam metin arama optimizasyonları ve CAS (İçerik-Adresli) depolama.',
    tech_card4_title: 'DevOps, Test & Araçlar',
    tech_card4_desc: 'Konteynerizasyon, CI/CD, otomatik test altyapıları ve API belgelendirme standartları.',
    tech_card5_title: 'Yapay Zeka & Görüntü İşleme',
    tech_card5_desc: 'Bilgisayarlı görü, göz takibi (eye-tracking), OCR ve makine öğrenmesi algoritmaları.',
    tech_card6_title: 'Mobil Geliştirme',
    tech_card6_desc: 'Modern mobil teknolojiler kullanarak iOS ve Android platformları için çapraz platform çözümler.',

    projects_subtitle: 'Çalışmalarım',
    projects_title: 'Öne Çıkan Kurumsal & Modern Projeler',
    projects_desc: 'Gerçek iş problemlerini çözen, ölçeklenebilir mimarilerle geliştirilmiş seçilmiş projeler.',

    p1_cat: 'Staj Projesi 1 — Tofaş IT',
    p1_title: 'Kurumsal Bayi Doküman Yönetim Portalı',
    p1_desc: 'Yetkili bayilerin kurumsal dokümanlara tek merkezden erişmesini sağlayan; Modular Monolith, Clean Architecture, JWT & Role-Based Authorization ve marka bazlı yetkilendirme mimarili web portalı.',

    p2_cat: 'Staj Projesi 2 — Tofaş IT',
    p2_title: 'VaultCore — Metadata Doküman Yönetimi & İş Akışı',
    p2_desc: 'M-Files mimarisinden esinlenen; dinamik şema modelleme, materyalize ACL güvenlik motoru, durum makineli iş akışı otomasyonu, check-out versiyonlama ve OCR destekli FTS sunan kurumsal DMS platformu.',

    p3_cat: 'Mobil Uygulama & Bulut',
    p3_title: 'BeYourself — Kişisel İlham & Medya Asistanı',
    p3_desc: 'Instagram Reels/Carousel medya ayrıştırıcı, Vercel Serverless CORS proxy, Android Home Widget, zamanlanmış yerel bildirimler ve Supabase bulut senkronizasyonlu modern Flutter uygulaması.',

    p4_cat: 'Masaüstü & C# Çözümü',
    p4_title: 'Not Hesaplama & Akademik Başarı Aracı',
    p4_desc: 'Vize, ödev ağırlıkları ve geçme notu hedeflerine göre final sınavında alınması gereken minimum notu anlık hesaplayan, dinamik toleranslı C# WinForms masaüstü aracı.',

    p5_cat: 'Oyun Geliştirme & Veri Yapıları',
    p5_title: 'Memory Match — 2D Kart Eşleştirme Oyunu',
    p5_desc: 'C++ ve SFML kütüphanesi ile geliştirilmiş; struct, 2D Array, Queue ve Map veri yapıları kullanılarak bellek yönetimi ve kullanıcı etkileşimi sağlanan 4x4 hafıza oyunu.',

    p6_cat: 'Backend & Konsol Uygulaması',
    p6_title: 'Mini Twitter — Terminal Tabanlı Sosyal Medya',
    p6_desc: 'Java 17 ve OOP prensipleri ile geliştirilmiş; kullanıcı oturum yönetimi, tweet paylaşımı, hashtag etiketleme, takip mekanizması ve kişiselleştirilmiş öneri motoru sunan konsol uygulaması.',

    btn_view_details: 'Detaylı İncele',

    about_subtitle: 'Mühendislik Vizyonum',
    about_title: 'Problem Çözmek, Sistem Kurmak, Öğrenmeye Devam Etmek.',
    about_p1: 'Bilgisayar Mühendisliği öğrencisi olarak yazılım geliştirmeyi yalnızca kod yazmak olarak değil, gerçek problemlere sürdürülebilir çözümler üretmek olarak görüyorum. Backend geliştirme, yapay zeka entegreli sistemler alanlarında kendimi geliştirirken; temiz, anlaşılabilir ve ölçeklenebilir sistemler tasarlamaya odaklanıyorum.',
    about_p2: 'C#, Java ve Python ile çalışıyor; ASP.NET Core, veritabanları, REST API\'ler ve modern yazılım mimarileri üzerine deneyim kazanıyorum. Aynı zamanda yapay zeka entegreli sistemler alanında ilerleyerek yazılım mühendisliği altyapımı AI ile birleştirmeyi hedefliyorum.',
    about_p3: 'Öğrenmeyi projeler üzerinden seviyorum. Üniversite çalışmalarından gerçek dünya staj deneyimine, TÜBİTAK araştırmalarından kişisel projelere kadar her çalışmayı kendimi bir adım ileri taşımak için kullanıyorum.',

    btn_cv_tr: 'CV İndir (TR)',
    btn_cv_en: 'CV İndir (EN)',

    timeline1_date: '2026 – Günümüz',
    timeline1_title: 'Bilgisayar Mühendisliği 3.Sınıf Öğrencisi',
    timeline1_subtitle: 'Yazılım Geliştirme • Yapay Zeka Entegreli Sistemler • Full-Stack Web ve Masaüstü Uygulamaları',
    timeline1_desc: 'TOFAŞ\'taki staj sürecimde kurumsal bir ortamda gerçek bir yazılım projesinin geliştirme sürecini deneyimledim. Backend geliştirme, API\'ler, veritabanı, doküman yönetimi ve ekip içi yazılım geliştirme süreçleri hakkında pratik deneyim kazandım.',

    timeline2_date: '2025',
    timeline2_title: 'Bilgisayar Mühendisliği 2.Sınıf Öğrencisi',
    timeline2_subtitle: 'TÜBİTAK 2209A Araştırma Projesi • Kulüp Etkinlikleri',
    timeline2_bullet1: '<strong>TÜBİTAK 2209-A:</strong> Nöropazarlamada Cinsiyet Temelli Dikkat Modelleri: Webcam Tabanlı Eye-Tracking ve Makine Öğrenmesi Yaklaşımı',
    timeline2_bullet2: '<strong>Bilişim Zirvesi\'25:</strong> Yapay zeka, siber güvenlik, blokzincir ve girişimcilik alanlarını bir araya getiren etkinliğin organizasyonunda görev aldım.',
    timeline2_bullet3: '<strong>YAZAKİ Teknik Gezisi:</strong> Otomotiv sektöründeki üretim ve teknoloji süreçlerini yerinde gözlemleme fırsatı buldum.',
    timeline2_bullet4: '<strong>SQL Server 2025 Workshop:</strong> SQL Server 2025 ve modern veritabanı teknolojileri üzerine uygulamalı bir workshop\'a katıldım.',
    timeline2_bullet5: '<strong>GDG Bursa DevFest:</strong> Yapay zeka, Google teknolojileri ve modern yazılım geliştirme üzerine teknik oturumlara katıldım.',
    timeline2_bullet6: '<strong>StartTech\'25:</strong> Teknoloji ve girişimcilik odaklı StartTech\'25 etkinliğine kulübümüzü temsilen katıldım.',

    timeline3_date: '2024',
    timeline3_title: 'Bilgisayar Mühendisliği 1.Sınıf Öğrencisi',
    timeline3_subtitle: 'Kariyer Fuarı Deneyimi • Etkinlik Organizasyonu',
    timeline3_bullet1: '<strong>Kariyer Fuarı:</strong> Kocaeli Üniversitesi kariyer fuarına katılarak hem sektörü yakından tanıma hem de staj imkanlarını değerlendirme fırsatı buldum. Etkinlik boyunca NETWORK ve teknoloji alanındaki güncel yaklaşımları dinledim ve çeşitli şirketlerin staj programları hakkında bilgi edindim.',
    timeline3_bullet2: '<strong>Bilişim Zirvesi\'24:</strong> Yapay zeka, siber güvenlik, blokzincir ve girişimcilik alanlarını bir araya getiren etkinliğin organizasyonunda görev aldım.',

    contact_subtitle: 'Bağlantı Kurun',
    contact_title: 'Birlikte Harika Projeler Geliştirelim',
    contact_desc: 'Kurumsal projeler, mimari danışmanlık veya teknoloji iş birlikleri için bana dilediğiniz zaman ulaşabilirsiniz.',
    contact_channels: 'İletişim Kanalları',
    contact_email: 'E-Posta',
    contact_btn_copy: 'E-Postayı Kopyala',

    label_name: 'Adınız & Soyadınız',
    ph_name: 'Örn: Ahmet Yılmaz',
    label_email: 'E-Posta Adresiniz',
    ph_email: 'ornek@sirket.com',
    label_subject: 'Proje / Konu',
    ph_subject: 'Örn: Yeni Proje Mimari Danışmanlığı',
    label_message: 'Mesajınız',
    ph_message: 'Projeniz veya iletmek istediğiniz detaylar...',
    btn_send_message: 'Mesajı Gönder',
    success_title: 'Mesajınız Başarıyla İletildi!',
    success_desc: 'Geri bildiriminiz için teşekkür ederim. En kısa sürede sizinle iletişime geçeceğim. 🚀',

    footer_rights: 'Tüm hakları saklıdır.'
  },
  en: {
    nav_home: "Home",
    nav_tech: "Technologies",
    nav_projects: "Projects",
    nav_about: "About",
    nav_contact: "Contact",

    hero_title: 'Coding,<br><span class="gradient-text">Learning</span> &<br>Building.',
    hero_desc: '3rd-year Computer Engineering student specializing in .NET 9. Developing full-stack applications with .NET, Angular, PostgreSQL, and Docker while advancing in modern software architectures and AI-assisted systems.',
    hero_btn_projects: 'Explore My Projects',
    hero_btn_contact: 'Get in Touch',

    tech_subtitle: 'Skills & Tools',
    tech_card1_title: 'Backend & Enterprise Architecture',
    tech_card1_desc: 'Designing secure and scalable enterprise systems using Clean Architecture, Modular Monolith, and DDD principles.',
    tech_card2_title: 'Modern Web Frontend',
    tech_card2_desc: 'Crafting dynamic user interfaces using Standalone components and reactive Angular Signals.',
    tech_card3_title: 'Database & Infrastructure',
    tech_card3_desc: 'Relational database modeling, Full-Text Search optimizations, and Content-Addressable Storage (CAS).',
    tech_card4_title: 'DevOps, Testing & Tools',
    tech_card4_desc: 'Containerization, CI/CD pipelines, automated testing infrastructure, and OpenAPI standards.',
    tech_card5_title: 'AI & Computer Vision',
    tech_card5_desc: 'Computer Vision, webcam eye-tracking models, OCR integration, and Python-based machine learning pipelines.',
    tech_card6_title: 'Mobile Development',
    tech_card6_desc: 'Cross-platform solutions for iOS and Android built with modern mobile engineering frameworks.',

    projects_subtitle: 'My Portfolio',
    projects_title: 'Featured Enterprise & Modern Projects',
    projects_desc: 'Selected projects engineered with scalable architectures to solve real business problems.',

    p1_cat: 'Internship Project 1 — Tofaş IT',
    p1_title: 'Enterprise Dealer Document Management Portal',
    p1_desc: 'Centralized enterprise web portal enabling authorized dealers to access corporate documents with Modular Monolith, Clean Architecture, JWT & Role-Based Authorization, and brand-based permissions.',

    p2_cat: 'Internship Project 2 — Tofaş IT',
    p2_title: 'VaultCore — Metadata Document Management & Workflow',
    p2_desc: 'Enterprise DMS platform inspired by M-Files architecture featuring dynamic runtime schema modeling, materialized ACL security engine, state machine workflow automation, check-out versioning, and OCR-supported FTS.',

    p3_cat: 'Mobile App & Cloud',
    p3_title: 'BeYourself — Personal Inspiration & Media Assistant',
    p3_desc: 'Modern Flutter application featuring Instagram Reels/Carousel media parser, Vercel Serverless CORS proxy, Android Home Widget, scheduled local notifications, and Supabase cloud sync.',

    p4_cat: 'Desktop & C# Solution',
    p4_title: 'Grade Calculation & Academic Success Tool',
    p4_desc: 'Dynamic tolerance C# WinForms desktop application calculating required final exam scores based on midterm weights, homework assignments, and target passing grades.',

    p5_cat: 'Game Development & Data Structures',
    p5_title: 'Memory Match — 2D Card Matching Game',
    p5_desc: '4x4 memory matching game developed with C++ and SFML library, utilizing struct, 2D Array, Queue, and Map data structures for efficient memory management.',

    p6_cat: 'Backend & Console Application',
    p6_title: 'Mini Twitter — Terminal-Based Social Media',
    p6_desc: 'Console application built with Java 17 and OOP principles, featuring user session management, tweeting, hashtagging, follow mechanisms, and a personalized recommendation engine.',

    btn_view_details: 'View Details',

    about_subtitle: 'Engineering Vision',
    about_title: 'Solving Problems, Building Systems, Continuous Learning.',
    about_p1: 'As a Computer Engineering student, I view software development not merely as writing code, but as building sustainable solutions for real-world problems. While growing in backend development and AI-integrated systems, I focus on engineering clean, understandable, and scalable architectures.',
    about_p2: 'Working with C#, Java, and Python, I gain hands-on experience in ASP.NET Core, databases, REST APIs, and modern software architectures. I also aim to merge my software engineering background with AI-integrated systems.',
    about_p3: 'I thrive on project-based learning. From academic coursework to real-world corporate internships, TÜBİTAK research projects to personal builds, I leverage every opportunity to push my boundaries.',

    btn_cv_tr: 'Download CV (TR)',
    btn_cv_en: 'Download CV (EN)',

    timeline1_date: '2026 – Present',
    timeline1_title: 'Computer Engineering — 3rd Year Student',
    timeline1_subtitle: 'Software Development • AI-Integrated Systems • Full-Stack Web & Desktop Applications',
    timeline1_desc: 'During my software engineering internship at TOFAŞ, I experienced the development lifecycle of a real enterprise software project. Gained hands-on expertise in backend engineering, APIs, databases, document management, and team-based software workflows.',

    timeline2_date: '2025',
    timeline2_title: 'Computer Engineering — 2nd Year Student',
    timeline2_subtitle: 'TÜBİTAK 2209A Research Project • Tech Club Activities',
    timeline2_bullet1: '<strong>TÜBİTAK 2209-A:</strong> Gender-Based Attention Models in Neuromarketing: Webcam-Based Eye-Tracking and Machine Learning Approach',
    timeline2_bullet2: '<strong>IT Summit \'25:</strong> Served in the organizing committee of the conference bringing together AI, cybersecurity, blockchain, and entrepreneurship.',
    timeline2_bullet3: '<strong>YAZAKI Technical Visit:</strong> Observed production and technology processes firsthand in the automotive industry.',
    timeline2_bullet4: '<strong>SQL Server 2025 Workshop:</strong> Participated in a hands-on workshop on SQL Server 2025 and modern database technologies.',
    timeline2_bullet5: '<strong>GDG Bursa DevFest:</strong> Attended technical sessions on AI, Google technologies, and modern software engineering.',
    timeline2_bullet6: '<strong>StartTech\'25:</strong> Represented our student club at the StartTech\'25 tech and entrepreneurship event.',

    timeline3_date: '2024',
    timeline3_title: 'Computer Engineering — 1st Year Student',
    timeline3_subtitle: 'Career Fair Experience • Event Organization',
    timeline3_bullet1: '<strong>Career Fair:</strong> Attended Kocaeli University Career Fair to network with industry professionals and evaluate internship opportunities across tech companies.',
    timeline3_bullet2: '<strong>IT Summit \'24:</strong> Contributed to the organization team for the summit covering AI, cybersecurity, blockchain, and technology trends.',

    contact_subtitle: 'Get in Touch',
    contact_title: 'Let\'s Build Great Projects Together',
    contact_desc: 'Feel free to reach out for enterprise project inquiries, architecture discussions, or technology collaborations.',
    contact_channels: 'Contact Channels',
    contact_email: 'Email',
    contact_btn_copy: 'Copy Email Address',

    label_name: 'Full Name',
    ph_name: 'e.g. John Doe',
    label_email: 'Email Address',
    ph_email: 'example@company.com',
    label_subject: 'Project / Subject',
    ph_subject: 'e.g. New Project Architecture Discussion',
    label_message: 'Message',
    ph_message: 'Your project details or inquiry...',
    btn_send_message: 'Send Message',
    success_title: 'Message Sent Successfully!',
    success_desc: 'Thank you for reaching out. I will get back to you as soon as possible. 🚀',

    footer_rights: 'All rights reserved.'
  }
};

let currentAppLanguage = 'tr';

function initLanguageSwitcher() {
  const toggleBtn = document.getElementById('lang-toggle-btn');
  const trOpt = toggleBtn ? toggleBtn.querySelector('.lang-tr') : null;
  const enOpt = toggleBtn ? toggleBtn.querySelector('.lang-en') : null;

  let savedLang = localStorage.getItem('portfolio_lang') || 'tr';

  function applyLanguage(lang) {
    currentAppLanguage = lang;
    localStorage.setItem('portfolio_lang', lang);

    if (trOpt && enOpt) {
      if (lang === 'tr') {
        trOpt.classList.add('active');
        enOpt.classList.remove('active');
      } else {
        enOpt.classList.add('active');
        trOpt.classList.remove('active');
      }
    }

    const dict = i18nData[lang] || i18nData['tr'];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    document.documentElement.lang = lang;
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nextLang = currentAppLanguage === 'tr' ? 'en' : 'tr';
      applyLanguage(nextLang);
    });
  }

  applyLanguage(savedLang);
}

/* ==========================================================================
   2. Particle Network Canvas Background
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.8;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254, 0.45)' : 'rgba(99, 102, 241, 0.45)';
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
  }

  let particles = [];
  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 14000);
    for (let i = 0; i < Math.min(count, 85); i++) {
      particles.push(new Particle());
    }
  }
  createParticles();

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const opacity = 1 - distance / 130;
          ctx.strokeStyle = `rgba(0, 242, 254, ${opacity * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   3. Navigation & Header
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking a link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   4. Projects Filter & Deep-Dive Modals
   ========================================================================== */
function initProjectsSection() {


  // Modal Setup
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-content-area');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  // Lightbox Elements
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close-btn');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  const projectDetailsTr = {
    p1: {
      tag: '🏢 Staj Projesi — Tofaş IT | Modular Monolith & Clean Architecture',
      title: 'Kurumsal Bayi Doküman Yönetim Portalı',
      contextNotice: 'Bu proje, Tofaş bünyesindeki yazılım geliştirme stajı kapsamında geliştirilmiştir. Yetkili bayi kullanıcılarının kendilerine tanımlanan dokümanlara, duyurulara ve kurumsal içeriklere Role-Based Authorization ve marka bazlı yetkilendirme ile merkezi ve kontrollü erişimini sağlar.',
      purpose: 'Yetkili bayi kullanıcılarının yetkileri dahilindeki kurumsal dokümanlara tek bir platform üzerinden güvenle ulaşabilmesi ve içerik yaşam döngüsünün uçtan uca yönetilmesi.',
      roles: [
        { name: '👤 Administrator', desc: 'Kullanıcı, bayi, marka, kategori ve doküman yönetimi; sistem erişim logları ve giriş aktivitelerinin denetimi.' },
        { name: '📝 Content Manager', desc: 'Doküman oluşturma, dosya yükleme, güncelleme, içerik yayınlama ve arşivleme süreçlerinin yönetimi.' },
        { name: '🏢 Dealer User', desc: 'Yalnızca yetkili olduğu markalara ait dokümanları listeleme, detay inceleme, güvenli indirme ve bildirim takibi.' }
      ],
      problems: [
        {
          title: '🏷️ 1. Marka Bazlı İçerik Yetkilendirme',
          desc: 'Her bayi kullanıcısının tüm dokümanlara erişmemesi gerekiyordu. Bayi ile marka ilişkisi (DealerBrands) ve dokümanın hedeflediği markalar (MaterialBrands) üzerinden çok katmanlı dinamik yetkilendirme modeli kurgulandı.'
        },
        {
          title: '📁 2. Dosya Yönetimi & Metadata İzolasyonu',
          desc: 'Binary dosya içerikleri doğrudan veritabanında tutulmayıp bağımsız File Storage yapısına aktarıldı. PostgreSQL üzerinde FileName, StoredFileName, Extension ve MIME Type gibi metadata alanları ilişkisel olarak saklandı.'
        },
        {
          title: '🔐 3. Güvenlik, JWT ve DTO İzolasyonu',
          desc: 'JWT tabanlı authentication ve Backend Role-Based Authorization sağlandı. DTO yapıları ile hassas verilerin (Password Hash, sunucu dosya yolları vb.) istemciye sızması engellendi. Soft Delete ile veri kaybı önlendi.'
        },
        {
          title: '📊 4. Audit Trail & İzlenebilirlik (Access Logs)',
          desc: 'Kurumsal denetim standartları için doküman görüntüleme ve indirme işlemleri kullanıcı, tarih/saat ve doküman bazında Access Log mekanizmasıyla eksiksiz kayıt altına alındı.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 Angular Frontend (SPA)                      │
│        Components • Services • Route Guards • Interceptors  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JWT Authentication
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   ASP.NET Core Web API                      │
│        Controllers • Middleware • JWT Auth • Swagger        │
└──────────────────────────────┬──────────────────────────────┘
                               │ Clean Architecture
                               ▼
┌─────────────────────────────────────────────────────────────┐
│     Core (Entities) ──► Application (DTO, Logic) ──► Infra  │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
      ┌─────────────────┐            ┌──────────────────┐
      │ PostgreSQL DB   │            │ File Storage     │
      │ (Metadata, Logs)│            │ (Binary Files)   │
      └─────────────────┘            └──────────────────┘`,
      responsibilities: [
        'RESTful API ve iş kurallarının (business logic) Clean Architecture prensipleriyle geliştirilmesi',
        'Entity Framework Core ve PostgreSQL ile ilişkisel veri modelinin tasarlanması ve migration yönetimi',
        'JWT tabanlı kimlik doğrulama ve Role-Based Authorization yetkilendirme altyapısının kodlanması',
        'Marka bazlı çoktan-çoğa (many-to-many) dinamik doküman yetkilendirme algoritmasının kurulması',
        'Dosya yükleme, güvenli indirme ve Access Logs (denetim izi) mekanizmalarının entegrasyonu',
        'Docker ve Docker Compose geliştirme ortamının yapılandırılması ve Swagger API testleri',
        'Angular frontend ekibiyle API kontratları (DTO) üzerinden koordineli geliştirme'
      ],
      tech: [
        'ASP.NET Core', '.NET 9', 'Clean Architecture', 'Modular Monolith',
        'Angular', 'TypeScript', 'PostgreSQL', 'EF Core',
        'JWT Authentication', 'Role-Based Auth (RBAC)', 'REST API',
        'Docker', 'Docker Compose', 'Swagger / OpenAPI'
      ],
      screenshots: [
        {
          category: '🏢 Bayi Portalı Arayüzleri',
          items: [
            { img: 'ekran_goruntuleri/internproject-1/assets/01_bayi_login.png', title: 'Bayi Giriş Ekranı', desc: 'JWT tabanlı güvenli kimlik doğrulama arayüzü.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/02_bayi_home.png', title: 'Bayi Ana Sayfası', desc: 'Kullanıcıya özel güncel duyurular ve hızlı işlem paneli.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/04_bayi_documents.png', title: 'Bayi Doküman Listesi', desc: 'Yalnızca yetkili olunan markalara ait listelenen dokümanlar.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/05_bayi_document_detail.png', title: 'Doküman İnceleme & İndirme', desc: 'Metadata detayları ve güvenli dosya indirme aksiyonu.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/03_bayi_notifications.png', title: 'Bildirimler & Duyurular', desc: 'Bayiyle ilişkili bildirimlerin takip edildiği akış.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/06_bayi_profile.png', title: 'Bayi Kullanıcı Profili', desc: 'Kullanıcı bilgileri ve yetkili bayi detayları.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/07_bayi_settings.png', title: 'Kullanıcı Ayarları', desc: 'Kişiselleştirme ve hesap tercihleri ekranı.' }
          ]
        },
        {
          category: '🛠️ Yönetim Paneli & Doküman Yönetimi (Admin & Content Manager)',
          items: [
            { img: 'ekran_goruntuleri/internproject-1/assets/08_admin_login.png', title: 'Yönetici Giriş Paneli', desc: 'Admin ve Content Manager rolleri için özel giriş ekranı.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/09_admin_dashboard.png', title: 'Yönetim Dashboard', desc: 'Sistem geneli metrikler, doküman ve kullanıcı istatistikleri.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/10_admin_documents_list.png', title: 'Doküman Yönetimi', desc: 'Merkezi doküman listesi, arama ve marka filtreleme araçları.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/11_admin_document_detail_drawer.png', title: 'Doküman Detay & Drawer', desc: 'Dokümana ait marka ilişkileri ve metadata düzenleme paneli.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/12_admin_pool_calendar.png', title: 'Havuz & Takvim Görünümü', desc: 'Doküman yayın ve planlama takvimi arayüzü.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/13_admin_document_access_report.png', title: 'Doküman Erişim Raporu', desc: 'Doküman bazlı erişim ve kullanım analiz raporları.' }
          ]
        },
        {
          category: '📊 Sistem Tanımları & Audit Kayıtları (İzlenebilirlik)',
          items: [
            { img: 'ekran_goruntuleri/internproject-1/assets/14_admin_login_activity.png', title: 'Giriş Aktiviteleri (Login Audit)', desc: 'Kullanıcıların giriş zamanları, durumları ve oturum kayıtları.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/15_admin_access_logs.png', title: 'Erişim Kayıtları (Access Logs)', desc: 'Hangi kullanıcının hangi dokümana ne zaman eriştiğinin izi.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/16_admin_definitions_users.png', title: 'Kullanıcı Tanımları & Roller', desc: 'Sistem kullanıcılarının rolleri ve durum yönetimi.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/17_admin_definitions_dealers.png', title: 'Bayi Tanımları', desc: 'Bayi oluşturma ve marka yetkilendirme eşleştirmeleri.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/18_admin_definitions_brands.png', title: 'Marka Tanımları', desc: 'Sistemdeki markaların merkezi yönetimi.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/19_admin_definitions_categories.png', title: 'Kategori Tanımları', desc: 'Doküman kategorilerinin hiyerarşik yapılandırılması.' }
          ]
        }
      ]
    },
    p2: {
      tag: '🏛️ Staj Projesi — TOFAŞ Bilgi Teknolojileri | Metadata DMS & Workflow Automation',
      title: 'VaultCore — Kurumsal Metadata Doküman Yönetim ve İş Akışı Otomasyon Portalı',
      contextNotice: 'Bu proje, Tofaş Bilgi Teknolojileri bünyesindeki yazılım mühendisliği stajım kapsamında geliştirilmiştir. M-Files mimarisinden esinlenerek; klasörsüz nesne modeli, çalışma zamanında (runtime) şema modelleme, materyalize ACL izin motoru, durum makineli iş akışı orkestrasyonu, check-out versiyonlama ve OCR destekli FTS sunan kurumsal bir platformdur.',
      purpose: 'Geleneksel katı klasör hiyerarşisini ortadan kaldırarak; doküman ve iş nesnelerinin zengin metadata özellikleri, sanal kayıtlı görünümler (SavedView) ve kural tabanlı iş akışlarıyla güvenli, ölçeklenebilir ve denetlenebilir şekilde yönetilmesini sağlamak.',
      roles: [
        { name: '🏛️ System Administrator', desc: 'Migration gerektirmeyen şema modelleme (ObjectType, ObjectClass, PropertyDefinition, ValueList), görsel iş akışı tasarımı ve denetim izi analizi.' },
        { name: '🛡️ Güvenlik & İzin Yöneticisi', desc: 'İzin kuralları matrisi (PermissionRule), Materyalize ObjectAcl hesaplama, ACL analitik haritası ve kullanıcı yetki simülasyonu.' },
        { name: '👥 Kurumsal Kullanıcı & Onaycı', desc: 'M-Files sanal gezgini, dinamik form ile doküman girişi, check-out kilitleme, SLA takipli açık görev onayları ve vekalet devri.' }
      ],
      problems: [
        {
          title: '🗂️ 1. Migration Olmadan Dinamik Şema Yönetimi',
          desc: 'Yeni doküman tipi veya özellik eklendiğinde DB migration çalıştırmak yerine ObjectType → ObjectClass → PropertyDefinition soyutlaması kuruldu. İlişkisel tutarlılık için PropertyValue, yüksek hızlı aramalar için ObjectVersion.PropertiesJson (jsonb) hibrit mimarisi geliştirildi.'
        },
        {
          title: '⚡ 2. 100.000+ Nesnede Milisaniyenin Altında İzin Filtreleme',
          desc: 'Dinamik kural bazlı izinlerin (ABAC) her sorguda hesaplanması yerine Materyalize ACL Motoru geliştirildi. İzinler nesne kaydedilirken hesaplanıp ObjectAcl tablosuna yazıldı; arama sorguları karmaşık kurallar yerine tek bir indeksli JOIN ile anlık yanıt verir hale getirildi.'
        },
        {
          title: '🔄 3. Veri Odaklı Durum Makinesi (İş Akışı Otomasyonu)',
          desc: 'Kod içine gömülü if/else mantıkları yerine durumların, geçişlerin, SLA sürelerinin, rol atamalarının ve elektronik parola onaylarının tamamen veritabanında tutulduğu ve görsel tuvalden yönetildiği durum makinesi inşa edildi.'
        },
        {
          title: '🔍 4. Türkçe Karakter FTS & Tesseract OCR Arama',
          desc: 'Türkçe morfolojisine uygun turkish_unaccent konfigürasyonu ve PostgreSQL GIN indeksleri kuruldu. Arka plan işçileri ile taranan evraklardan Tesseract OCR ile otomatik metin çıkarılarak arama dizinine eklendi.'
        },
        {
          title: '🔒 5. Check-Out Kilidi & İçerik-Adresli Depolama (CAS)',
          desc: 'Dokümanların eş zamanlı düzenlenmesini önleyen check-out kilit mekanizması ve dosyaların diskte SHA-256 hash özetiyle segmente saklandığı (CAS), Path Traversal açıklarını önleyen güvenli dosya deposu kurgulandı.'
        },
        {
          title: '🧪 6. 315 Backend + 112 Frontend Otomatik Test Mimarisi',
          desc: 'Karmaşık ACL ve iş akışı regresyonlarını önlemek için Testcontainers & WebApplicationFactory ile gerçek PostgreSQL üzerinde 315 API/entegrasyon testi ve Jasmine/Karma ile 112 frontend testi yazıldı.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 Angular 20 Frontend (SPA)                   │
│   • Standalone Bileşenler      • Reaktif Signals Durumu     │
│   • Dinamik Metadata Kartı     • Rol/İzin Route Guard'ları  │
│   • M-Files Sanal Gezgini      • HTTP Interceptor Zinciri   │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / REST / JWT Bearer
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    VaultCore.API Katmanı                    │
│   • İnce Controller'lar        • [RequireObjectPermission]  │
│   • Global Exception Filter    • Rate Limiting & Güvenlik   │
│   • Swagger / OpenAPI Dökümanı • WebDAV & WOPI Host Protokol│
└──────────────────────────────┬──────────────────────────────┘
                               │ Clean Architecture
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                VaultCore.Application Katmanı                │
│   • ObjectService & Search     • AclEngineService           │
│   • WorkflowService & Görevler • AclRecalculation & OCR     │
│   • Fluent Validation & DTO    • MetadataSuggestion (AI)    │
└──────────────────┬───────────────────────────┬──────────────┘
                   │                           │
                   ▼                           ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│       VaultCore.Core        │ │  VaultCore.Infrastructure   │
│  • Domain Varlıkları (DDD)  │ │  • EF Core 9 / PostgreSQL 16│
│  • Domain Enum & Kuralları  │ │  • SHA-256 CAS Dosya Deposu │
│  • Domain İstisnaları (Saf) │ │  • Tesseract OCR Servisleri │
└─────────────────────────────┘ └──────────────┬──────────────┘
                                               │
                               ┌───────────────┴──────────────┐
                               ▼                              ▼
                      ┌─────────────────┐            ┌────────────────┐
                      │ PostgreSQL 16   │            │ CAS Storage    │
                      │ (Metadata, ACL) │            │ (SHA-256 Files)│
                      └─────────────────┘            └────────────────┘`,
      responsibilities: [
        'Clean Architecture ve Domain-Driven Design ilkelerine uygun Modüler Monolit backend mimarisinin geliştirilmesi',
        'PostgreSQL ve EF Core 9 üzerinde dinamik şema (ObjectType, ObjectClass, PropertyValue) ve ilişkisel modellerin tasarlanması',
        'Yüksek performanslı Materyalize ACL motorunun (ObjectAcl) ve [RequireObjectPermission] filtre altyapısının geliştirilmesi',
        'Görsel durum makinesi (Workflow Engine), otomatik SLA görev üretim ve elektronik parola onay mekanizmalarının kodlanması',
        'İçerik-Adresli Depolama (CAS - SHA-256), Check-Out kilitleme ve immutable ObjectVersion yaşam döngüsünün inşası',
        'PostgreSQL turkish_unaccent tam metin arama (FTS) ve Tesseract OCR arka plan servislerinin entegrasyonu',
        'Angular 20 Standalone mimarisi, Signals reaktif durum yönetimi ve dinamik metadata formu bileşenlerinin geliştirilmesi',
        'Testcontainers ve WebApplicationFactory ile 315 backend entegrasyon/birim testinin ve 112 frontend testinin hazırlanması'
      ],
      tech: [
        'ASP.NET Core', '.NET 9 (C# 13)', 'Clean Architecture', 'Modular Monolith',
        'Angular 20', 'Standalone Components', 'Angular Signals', 'TypeScript',
        'PostgreSQL 16', 'EF Core 9', 'Materyalize ACL', 'FTS & GIN Index',
        'Tesseract OCR', 'CAS File Storage', 'JWT Bearer', 'Docker & Compose',
        'Testcontainers', 'Swagger / OpenAPI'
      ],
      screenshots: [
        {
          category: '🔐 Kimlik Doğrulama, Profil & İş Akışı Merkezi',
          items: [
            { img: 'ekran_goruntuleri/internproject-2/01_giris_ekrani.png', title: 'Kurumsal Giriş Ekranı', desc: 'Cam efektli, rate-limiting korumalı JWT oturum açma arayüzü.' },
            { img: 'ekran_goruntuleri/internproject-2/02_gosterge_paneli.png', title: 'Yönetici Gösterge Paneli', desc: 'SLA gecikmeleri, bekleyen görevler ve kritik KPI metrikleri.' },
            { img: 'ekran_goruntuleri/internproject-2/03_akislar_ana_sayfa.png', title: 'İş Akışları Genel Bakış', desc: 'Kurum genelindeki aktif iş akışları ve süreç sayaçları.' },
            { img: 'ekran_goruntuleri/internproject-2/06_akis_2_sozlesme_mali_onay.png', title: 'Sözleşme & Mali Onay', desc: 'Çok kademeli mali onay ve hukuki inceleme süreci.' },
            { img: 'ekran_goruntuleri/internproject-2/07_akis_3_teknik_servis_garanti.png', title: 'Teknik Servis & Garanti', desc: 'Arıza bildirimleri ve garanti eksper operasyonları.' },
            { img: 'ekran_goruntuleri/internproject-2/08_gorevlerim_acik_gorevler.png', title: 'Açık Görevlerim', desc: 'Bekleyen onay talepleri, kalan SLA süreleri ve öncelikler.' },
            { img: 'ekran_goruntuleri/internproject-2/09_gorevlerim_tamamlanan_gorevler.png', title: 'Tamamlanan Görev Geçmişi', desc: 'Geçmiş onay kararları, onay notları ve işlem zamanları.' },
            { img: 'ekran_goruntuleri/internproject-2/10_profilim.png', title: 'Kullanıcı Profili', desc: 'Kullanıcı rolleri ve oturum yönetim paneli.' },
            { img: 'ekran_goruntuleri/internproject-2/11_profilim_guvenlik_vekalet.png', title: 'Görev Vekalet Devri', desc: 'İzin durumunda görevlerin denetim iziyle devredilmesi.' }
          ]
        },
        {
          category: '🗂️ M-Files Sanal Gezgini & Dinamik Form Üretimi',
          items: [
            { img: 'ekran_goruntuleri/internproject-2/12_nesne_gezgini.png', title: 'Nesne Gezgini (Sanal Düzen)', desc: 'Sanal klasör ağacı, nesne tablosu ve metadata çekmecesi.' },
            { img: 'ekran_goruntuleri/internproject-2/13_yeni_dokuman_olusturma_formu.png', title: 'Dinamik Doküman Formu', desc: 'Seçilen sınıfa göre runtime üretilen dinamik doğrulama formu.' }
          ]
        },
        {
          category: '⚙️ Vault Yapısı & Dinamik Şema Yönetimi (Kodsuz Şema)',
          items: [
            { img: 'ekran_goruntuleri/internproject-2/15_admin_vault_yapisi_siniflar.png', title: 'Sınıflar & Akış Bağlantısı', desc: 'Doküman sınıfları ve varsayılan iş akışı eşleştirmeleri.' },
            { img: 'ekran_goruntuleri/internproject-2/16_admin_vault_yapisi_nesne_turleri.png', title: 'Nesne Türleri', desc: 'Doküman, Sözleşme, Araç, Tedarikçi varlık tanımları.' },
            { img: 'ekran_goruntuleri/internproject-2/17_admin_vault_yapisi_ozellik_tanimlari.png', title: 'Özellik Tanımları', desc: 'Metadata alanları, veri tipleri ve kural konfigürasyonları.' },
            { img: 'ekran_goruntuleri/internproject-2/18_admin_vault_yapisi_deger_listeleri.png', title: 'Değer Listeleri (Lookup)', desc: 'Dinamik açılır liste ve hiyerarşik veri tanımları.' }
          ]
        },
        {
          category: '🛡️ Güvenlik, Materyalize ACL, İş Akışları & Denetim İzi',
          items: [
            { img: 'ekran_goruntuleri/internproject-2/19_admin_izin_kurallari.png', title: 'İzin Kuralları Matrisi', desc: 'Rol, grup ve metadata kesişiminde dinamik izin kuralları.' },
            { img: 'ekran_goruntuleri/internproject-2/20_admin_is_akislari_tasarimcisi.png', title: 'Görsel İş Akışı Tasarımcısı', desc: 'Durum makinesi adımları ve görsel akış tuvali.' },
            { img: 'ekran_goruntuleri/internproject-2/21_admin_is_akislari_adim_detaylari.png', title: 'Akış Adım Detayları & SLA', desc: 'SLA süreleri, rol atamaları ve parola onay ayarları.' },
            { img: 'ekran_goruntuleri/internproject-2/22_admin_denetim_izi.png', title: 'Sistem Denetim İzi (Audit Trail)', desc: 'Tüm kullanıcı aksiyonlarının değiştirilemez günlüğü.' },
            { img: 'ekran_goruntuleri/internproject-2/23_admin_denetim_izi_detay_modali.png', title: 'Denetim İzi Detay Modalı', desc: 'Ham JSON payload, veri diff farkları ve istemci IP detayları.' },
            { img: 'ekran_goruntuleri/internproject-2/24_admin_kullanici_yonetimi.png', title: 'Kullanıcı Yönetimi', desc: 'Hesap tanımları, global roller ve durum kontrolü.' },
            { img: 'ekran_goruntuleri/internproject-2/25_admin_grup_yonetimi.png', title: 'Grup & Departman Yönetimi', desc: 'Organizasyonel birimler ve onay komiteleri yönetimi.' },
            { img: 'ekran_goruntuleri/internproject-2/26_admin_acl_analitik_haritasi.png', title: 'ACL Analitik Haritası', desc: 'İzin kurallarının dağılımı ve Allow/Deny oranları.' },
            { img: 'ekran_goruntuleri/internproject-2/27_admin_acl_tanilama_kullanici_sonucu.png', title: 'ACL Tanılama & Simülasyon', desc: 'Kullanıcı bazlı kural eşleşme ve yetki simülasyonu.' }
          ]
        }
      ]
    },
    p3: {
      tag: '✨ Mobil Uygulama & Bulut Mimarisi | Flutter, Riverpod & Supabase',
      title: 'BeYourself — Kişisel İlham, Alıntı Defteri & Instagram Medya Asistanı',
      contextNotice: 'Sosyal medyada karşılaşılan ilham verici alıntıları, Reels videolarını ve galeri gönderilerini tek tıkla kaydeden; Vercel Serverless CORS proxy altyapısı, Android Home Widget, zamanlanmış yerel bildirimler ve Supabase bulut senkronizasyonuna sahip modern bir Flutter uygulamasıdır.',
      purpose: 'Kullanıcıların sosyal medyada gördükleri değerli sözleri ve ilham verici medya içeriklerini kaybolmadan kategorize etmelerini, gün içinde motivasyon bildirimleri almalarını ve ana ekran widget\'ı ile canlı olarak takip edebilmelerini sağlamak.',
      roles: [
        { name: '🎬 Medya & Video Motoru', desc: 'Instagram URL çözümleme, Reels oynatıcı, 10 fotoğrafa kadar kaydırılabilir carousel galeri, pinch-to-zoom ve Vercel Serverless CORS proxy entegrasyonu.' },
        { name: '📲 Widget & Bildirim Altyapısı', desc: 'Android Home Widget canlı senkronizasyonu ve flutter_local_notifications ile zamanlanmış, kategori filtreli çevrimdışı bildirim motoru.' },
        { name: '☁️ Hibrit Veri Mimarisi', desc: 'Hızlı offline deneyim için Local-First SharedPreferences + profil yedekleme ve veri senkronizasyonu için Supabase bulut veritabanı.' }
      ],
      problems: [
        {
          title: '🌐 1. Web ve iOS CORS Medya Engellerinin Aşılması',
          desc: 'Instagram medya URL\'lerinin doğrudan indirilmesinde ortaya çıkan CORS kısıtlamalarını aşmak amacıyla Vercel üzerinde koşan özel sunucusuz (serverless) proxy API geliştirilerek istemciye kesintisiz medya akışı sağlandı.'
        },
        {
          title: '📲 2. Android Home Widget ve Canlı Veri Senkronizasyonu',
          desc: 'Uygulama içinde bir alıntı silindiğinde veya güncellendiğinde home_widget servisi aracılığıyla ana ekrandaki widget anlık olarak yeni bir söze veya fallback içeriğine tetiklendi.'
        },
        {
          title: '⏰ 3. Çevrimdışı ve Güvenilir Yerel Bildirim Zamanlaması',
          desc: 'İnternet bağlantısı gerekmeksizin kullanıcı tarafından belirlenen saat aralıklarında (örn. 09:00, 14:00, 21:00) ve seçilen kategorilerden ilham veren yerel bildirimler zamanlandı.'
        },
        {
          title: '🧠 4. Otomatik Başlık ve Caption Ayrıştırma Algoritması',
          desc: 'Instagram gönderi açıklamasından otomatik olarak ilk cümleden vurucu kısa başlık (shortText) üreten ve yazar bilgisini profil üzerinden ayrıştıran regex tabanlı akıllı metin motoru kuruldu.'
        },
        {
          title: '🎲 5. Rastgele İlham Çarkı & Buffer Hafızası',
          desc: 'Haptic Feedback dokunsal titreşim desteği ve son 5 alıntıyı hatırlayan geçmiş buffer hafızası ile art arda aynı sözün gelmesi engellendi.'
        },
        {
          title: '🧪 6. %100 Başarı Oranlı 50 Birim & Widget Testi',
          desc: 'State management (Riverpod), medya ayrıştırma, bildirim senkronizasyonu, widget ve SharedPreferences kalıcılığını kapsayan 50 test ile tam regresyon koruması sağlandı.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                    Flutter 3.x UI Katmanı                   │
│   • Outfit & Plus Jakarta Sans  • Glassmorphism Dark/Light  │
│   • Reaktif Riverpod 2.5 State  • Pinch-to-Zoom Galeri      │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│   Cihaz & İşletim Sistemi   │ │      Bulut & API Katmanı    │
│  • Android Home Widget      │ │  • Vercel Serverless CORS   │
│  • Local Notifications      │ │  • Supabase Cloud Database  │
│  • SharedPreferences Cache  │ │  • Instagram Media Parser   │
└─────────────────────────────┘ └─────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             Test Altyapısı (50/50 Passed Unit Tests)        │
│   • Riverpod Providers • Downloader • Widget • Notifications│
└─────────────────────────────┘`,
      responsibilities: [
        'Flutter 3.x ve Riverpod 2.5 kullanılarak reaktif ve temiz mobil mimarinin sıfırdan tasarlanması',
        'Vercel üzerinde koşan Serverless CORS Proxy API\'nin geliştirilip Instagram medya ayrıştırma servisine entegre edilmesi',
        'Android Home Widget ve background update/fallback senkronizasyon mekanizmasının kodlanması',
        'flutter_local_notifications ve timezone ile zamanlanmış çevrimdışı bildirim sisteminin kurulması',
        'Supabase bulut veritabanı ile kullanıcı profili ve verilerin çift yönlü senkronizasyonunun sağlanması',
        '50 adet birim ve widget testi yazılarak %100 başarı oranlı test koruma altyapısının kurulması'
      ],
      tech: [
        'Flutter 3.x', 'Dart 3.x', 'Riverpod 2.5', 'Supabase',
        'Vercel Serverless', 'Android Home Widget', 'Local Notifications',
        'SharedPreferences', 'Video Player', 'Unit Testing (50 Tests)'
      ],
      screenshots: [
        {
          category: '📱 Ana Sayfa, Medya Akışı & Keşif',
          items: [
            { img: 'ekran_goruntuleri/beyourself/1000115787.jpg', title: 'Açılış & Karşılama Ekranı', desc: 'Minimalist origami logo ve modern karşılama arayüzü.' },
            { img: 'ekran_goruntuleri/beyourself/1000115788.jpg', title: 'Ana Sayfa & Günün Alıntısı Akışı', desc: 'Dinamik selamlama, arama çubuğu, günün sözü kartı ve kategori filtreleri.' },
            { img: 'ekran_goruntuleri/beyourself/1000115785.jpg', title: 'Alıntı Detayı & Tam Ekran Medya', desc: 'Instagram Reels video/görsel oynatıcı ve tam ekran medya deneyimi.' },
            { img: 'ekran_goruntuleri/beyourself/1000115786.jpg', title: 'Otomatik Caption & Metin Detayı', desc: 'Instagram\'dan otomatik çekilen açıklama metni ve detaylı alıntı içeriği.' }
          ]
        },
        {
          category: '🎬 Instagram Medya İndirme & Yeni Alıntı Ekleme',
          items: [
            { img: 'ekran_goruntuleri/beyourself/1000115782.jpg', title: 'Instagram Link Girişi & Medya İndirici', desc: 'Reels ve post linkini yapıştırarak medyayı ve açıklamayı tek tıkla çekme.' },
            { img: 'ekran_goruntuleri/beyourself/1000115783.jpg', title: 'Medya Seçimi, Yazar & Kategori Atama', desc: 'Cihaz galerisinden medya yükleme, yazar tanımlama ve kategori seçimi.' },
            { img: 'ekran_goruntuleri/beyourself/1000115784.jpg', title: 'Rastgele Keşfet Çarkı (Zar At & Keşfet)', desc: 'Haptic dokunsal titreşimle çalışan, kategori filtreli rastgele ilham keşfi.' }
          ]
        },
        {
          category: '🗂️ Kategoriler & Favoriler Koleksiyonu',
          items: [
            { img: 'ekran_goruntuleri/beyourself/1000115779.jpg', title: 'Kategoriler & Akıllı İkonlar', desc: 'Kategori kartları, özel ikonlar ve kategori bazlı alıntı sayaçları.' },
            { img: 'ekran_goruntuleri/beyourself/1000115780.jpg', title: 'Dinamik Kategori Ekleme Modalı', desc: 'Kullanıcının dilediği gibi yeni kategori oluşturabilmesini sağlayan modal.' },
            { img: 'ekran_goruntuleri/beyourself/1000115781.jpg', title: 'Favoriler Koleksiyonu', desc: 'Kullanıcının beğendiği ve saklamak istediği favori alıntılar listesi.' }
          ]
        },
        {
          category: '👤 Profil, Avatar, Motto & Bildirim Ayarları',
          items: [
            { img: 'ekran_goruntuleri/beyourself/1000115775.jpg', title: 'Uygulama Ayarları & Tema Yönetimi', desc: 'Karanlık/aydınlık mod, bildirim anahtarı ve profil ayarlarına erişim menüsü.' },
            { img: 'ekran_goruntuleri/beyourself/1000115776.jpg', title: 'Zamanlanmış Bildirim & Saat Ayarları', desc: 'Günlük bildirim sıklığı slider\'ı, başlangıç/bitiş saatleri ve test bildirimi.' },
            { img: 'ekran_goruntuleri/beyourself/1000115777.jpg', title: 'Profil Ayarları & Hazır Avatar Seçici', desc: '16 adet hazır ilham avatarı veya galeriden profil fotoğrafı belirleme arayüzü.' },
            { img: 'ekran_goruntuleri/beyourself/1000115778.jpg', title: 'Kişisel Yaşam Mottosu & Hitap Tercihi', desc: 'Kullanıcı mottosu, kişiselleştirilmiş bildirim hitap stili ve hesap istatistikleri.' }
          ]
        }
      ]
    },
    p4: {
      tag: '🎓 Masaüstü Yazılım & Algoritma | C# .NET WinForms',
      title: 'Not Hesaplama & Akademik Başarı Takip Aracı',
      contextNotice: 'Üniversite ve lise öğrencilerinin ders başarı kriterlerine göre dönem sonu final sınavından almaları gereken minimum hedef notu anında hesaplayan, esnek parametreli ve hafif C# WinForms masaüstü yazılımıdır.',
      purpose: 'Öğrencilerin vize, ödev (1, 2, 3) etki oranlarını ve geçme barajını serbestçe tanımlayarak, kalan ders yüklerini optimize etmelerine ve gereken minimum başarı notunu matematiksel olarak anında görmelerine olanak tanımak.',
      roles: [
        { name: '🧮 Ağırlıklı Not Hesaplama Motoru', desc: 'Vize, ödevler ve final etki yüzdelerinin dinamik katsayı formülüyle hesaplanması ve hedef geçme barajına göre çözümlenmesi.' },
        { name: '🛡️ Esnek Girdi & Boş Alan Toleransı', desc: 'Girilmeyen veya yapılmayan ödevlerin otomatik olarak 0 puan kabul edilerek formüle dahil edilmesi ve çökme risklerinin önlenmesi.' },
        { name: '⚡ Akıllı Durum & Başarı Kontrolü', desc: 'Mevcut notlarla dersin zaten geçilmiş olması durumunda "Zaten geçmişsiniz!" anlık geri bildirimi sunulması.' }
      ],
      problems: [
        {
          title: '📐 1. Dinamik Yüzde & Katsayı Formülasyonu',
          desc: 'Farklı üniversite ve bölümlerin değişen müfredat ağırlıklarına (örn. %30 Vize, %20 Ödev, %50 Final) uyum sağlayacak esnek tersine matematiksel hedef not algoritması geliştirildi.'
        },
        {
          title: '🚫 2. Boş Giriş ve Format Hatalarının Engellenmesi',
          desc: 'Kullanıcıların boş bıraktığı ödev kutularının otomatik 0 varsayılması ve harf/geçersiz karakter girişlerinin Exception Handling ve Input Validation ile güvenle yakalanması sağlandı.'
        },
        {
          title: '🎯 3. Koşullu Durum Yönetimi & Erken Başarı Bildirimi',
          desc: 'Hesaplama neticesinde gereken final notunun 0 veya negatif çıkması durumunda kullanıcıya "Zaten geçmişsiniz!" müjdesi verilerek gereksiz sınav kaygısının önüne geçildi.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 C# .NET WinForms UI Katmanı                 │
│   • Form Giriş Alanları (Geçme Notu, Vize %, Final %, Ödev) │
│   • Hesapla Butonu & Anında Sonuç / Durum Bildirimi         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Hesaplama & Doğrulama Motoru                │
│   • Input Validation & Boş Alan Toleransı (0 Varsayılan)    │
│   • Ağırlıklı Ortalama & Hedef Final Notu Formülü           │
│   • Mantıksal Durum Kontrolü (Baraj Altı / Üstü / Başarılı) │
└─────────────────────────────────────────────────────────────┘`,
      responsibilities: [
        'C# ve .NET WinForms teknolojisi kullanılarak sezgisel ve sade masaüstü kullanıcı arayüzünün tasarlanması',
        'Dinamik vize, ödev ve final etki yüzdelerini hesaplayan matematiksel mantık algoritmasının kodlanması',
        'Kullanıcı veri girişlerinde oluşabilecek format ve boşluk hatalarını ele alan sağlam doğrulama mekanizmasının geliştirilmesi',
        'Açık kaynak olarak GitHub üzerinde yayınlanması ve sürüm dokümantasyonunun hazırlanması'
      ],
      tech: ['C#', '.NET WinForms', 'Algoritmik Hesaplama', 'Input Validation', 'Desktop Application'],
      screenshots: [
        {
          category: '🖥️ Uygulama Arayüzü & Hesaplama Senaryoları',
          items: [
            { img: 'ekran_goruntuleri/notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164217.png', title: 'Boş Form & Giriş Parametreleri', desc: 'Geçme notu, vize/final yüzdeleri ve 3 farklı ödev etki oranlarının girilebildiği başlangıç formu.' },
            { img: 'ekran_goruntuleri/notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164330.png', title: 'Dinamik Hesaplama & Hedef Final Notu', desc: 'Vize (%30: 60), Ödev 1-2 (%10: 80/70) ve Final (%50) verileriyle hesaplanan minimum 24,00 geçme notu.' },
            { img: 'ekran_goruntuleri/notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164404.png', title: 'Erken Başarı & "Zaten Geçmişsiniz!" Durumu', desc: 'Yüksek vize ve ödev performansı sonrası final sınavına girmeden ders barajının aşıldığını bildiren sonuç ekranı.' }
          ]
        }
      ]
    },
    p5: {
      tag: '🎴 Oyun Geliştirme & Veri Yapıları | C++ & SFML',
      title: 'Memory Match — C++ & SFML 2D Kart Eşleştirme Oyunu',
      contextNotice: 'Veri Yapıları ve Temel Programlama prensiplerini pekiştirmek amacıyla C++ ve SFML (Simple and Fast Multimedia Library) kullanılarak geliştirilmiş, 4x4 matris üzerinde çalışan grafik arayüzlü (GUI) kart eşleştirme ve hafıza oyunudur.',
      purpose: 'struct, 2D dizi, kuyruk (queue) ve harita (map) gibi temel veri yapılarının gerçek zamanlı bir grafik oyun döngüsünde (Game Loop) nasıl organize edildiğini, bellek yönetimini ve fare etkileşimlerinin nasıl işlendiğini göstermek.',
      roles: [
        { name: '🗂️ 2D Array & Kart struct Mimarisi', desc: '4x4 = 16 kartlık oyun tahtasını temsil eden iki boyutlu matris ve kartın harf değeri, açık/kapalı durumu ve koordinatlarını tutan hafif struct yapısı.' },
        { name: '⏳ Queue (Kuyruk) Eşleşme Kontrolü', desc: 'Oyuncunun tıkladığı kartları FIFO (First-In, First-Out) sırasıyla hafızaya alıp eşleşme kontrolünü ve gecikmeli kapanma mantığını yöneten kuyruk yapısı.' },
        { name: '🗺️ Map (Harita) Doku & Varlık Eşleştirmesi', desc: 'Karakterler (A, B, C...) ile SFML grafik dokuları ve sprite\'ları arasında O(1) hızında eşleme kuran map veri yapısı.' }
      ],
      problems: [
        {
          title: '🎮 1. Gerçek Zamanlı Oyun Döngüsü & Event Handling',
          desc: 'SFML pencere olaylarının (fare tıklamaları, pencere kapatma) 60 FPS akıcılığında işlenmesi ve tıklanan piksel koordinatlarının 4x4 matris hücrelerine doğru eşleştirilmesi sağlandı.'
        },
        {
          title: '⏱️ 2. Yanlış Eşleşmelerde Gecikmeli Kapanma Mantığı',
          desc: 'Eşleşmeyen iki kart seçildiğinde oyuncunun kartları görebilmesi için kısa bir bekleme süresinin oyun akışını ve render döngüsünü dondurmadan (non-blocking timer mantığıyla) yönetilmesi sağlandı.'
        },
        {
          title: '🎲 3. Rastgele Kart Dağıtımı & Çiftlerin Garantilenmesi',
          desc: '8 farklı harfin her birinden tam 2 adet üretilerek 4x4 matrise adil ve rastgele karıştırılarak yerleştirilmesi (Fisher-Yates Shuffle yaklaşımı) uygulandı.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 SFML 2.x Grafik Penceresi                   │
│   • 60 FPS Render Döngüsü • Mouse Event Listener            │
│   • Sprite & Texture Çizimi (Yıldız & Harf Varlıkları)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Veri Yapıları & Oyun Mantığı               │
│   • 2D Array [4][4] -> struct Card (state, value, pos)      │
│   • std::queue<Card*> -> Sıralı Tıklama & Eşleşme Kontrolü  │
│   • std::map<char, Texture> -> Doku / Harf Eşleme           │
│   • Karıştırma & Durum Makinesi (Kapalı/Açık/Eşleşti)       │
└──────────────────────────────┬──────────────────────────────┘`,
      responsibilities: [
        'C++ ve SFML kütüphanesi kullanılarak oyun motoru döngüsü ve grafik kullanıcı arayüzünün kodlanması',
        'struct, 2D array, queue ve map veri yapılarının entegre edilerek oyun durumlarının yönetilmesi',
        'Fare tıklama koordinatlarının 2D matris hücreleriyle eşleştirilmesi algoritmasının yazılması',
        'Visual Studio C++ linker, SFML include/lib bağımlılıkları ve DLL yapılandırmalarının tamamlanması'
      ],
      tech: ['C++', 'SFML 2.x', 'Veri Yapıları (Queue, Map, 2D Array)', 'Visual Studio', 'GUI Game Development'],
      screenshots: [
        {
          category: '🎮 Oyun İçi Ekran Görüntüleri & Eşleşme Senaryoları',
          items: [
            { img: 'ekran_goruntuleri/kart_oyunu/Ekran görüntüsü 2026-01-25 131812.png', title: '4x4 Oyun Tahtası & Başarılı "A" Eşleşmesi', desc: '16 kartlık matriste 2 adet "A" harfli kartın doğru eşleştirilerek açık kaldığı oyun anı.' },
            { img: 'ekran_goruntuleri/kart_oyunu/Ekran görüntüsü 2026-01-25 131823.png', title: 'Çoklu Eşleşme Durumu & "A" - "C" Çiftleri', desc: 'Oyuncunun ardışık hamlelerle "A" ve "C" kart çiftlerini bularak tahtayı tamamlamaya yaklaştığı an.' }
          ]
        }
      ]
    },
    p6: {
      tag: '📢 Backend & OOP Mimarisi | Java 17 Terminal Çözümü',
      title: 'Mini Twitter — Java 17 & OOP Tabanlı Sosyal Medya Platformu',
      contextNotice: 'Java 17 ve Nesne Yönelimli Programlama (OOP) prensipleri kullanılarak geliştirilmiş; oturum yönetimi, tweet/hashtag etkileşimi, kullanıcı takip sistemi ve kişiselleştirilmiş öneri algoritmasına sahip terminal uygulamasıdır.',
      purpose: 'Nesne yönelimli mimari (Kullanıcı, Tweet, Takip, Öneri servisleri), Regex e-posta doğrulaması ve oturum durum makinesinin (State Management) konsol ortamında güvenilir şekilde nasıl kurgulandığını sergilemek.',
      roles: [
        { name: '👤 Kullanıcı & Oturum Yönetimi', desc: 'Geçerli e-posta doğrulaması (Regex), şifreli oturum açma, şifre sıfırlama ve aktif kullanıcı (Session) kontrolü.' },
        { name: '📢 Tweet & Hashtag Motoru', desc: 'Tweet oluşturma, hashtag etiketleme, beğenme sayıları ve tüm akışı listeleme modülü.' },
        { name: '🧠 Akıllı Öneri Algoritması', desc: 'Takip edilen kullanıcıların gönderilerini ve kullanıcının ilgi duyduğu etiketleri analiz ederek kişiselleştirilmiş tweet sunan öneri motoru.' }
      ],
      problems: [
        {
          title: '🔁 1. Oturum Açılmadan İşlem Yapılmasının Önlenmesi',
          desc: 'Oturum açmadan tweet atılması mantık hatası, aktifKullanici != null durum kontrolü ve kullanıcı yönlendirmesi eklenerek engellendi.'
        },
        {
          title: '👯‍♀️ 2. Kullanıcı Değişiminde Oturum Güncelleme',
          desc: 'Farklı kullanıcılar giriş yaptığında eski oturum verilerinin kalması sorunu her kayıt/giriş aksiyonundan sonra aktif oturum nesnesinin dinamik güncellenmesiyle çözüldü.'
        },
        {
          title: '📩 3. Gelişmiş E-posta Doğrulaması',
          desc: 'Geçersiz e-posta formatlarının sisteme kaydolması Regex tabanlı @ ve domain kontrolü eklenerek koruma altına alındı.'
        },
        {
          title: '🔓 4. Çift Oturum ve Kayıt Çatışması Engelleme',
          desc: 'Aktif oturum varken yeni kayıt açılması "önce çıkış yapmalısınız" uyarısı ve kural matrisi ile güvenli hale getirildi.'
        }
      ],
      architectureDiagram: `┌───────────────────────────────────────────────────────────────┐
│                 Java 17 CLI Konsol Arayüzü                    │
│   • Ana Menü Olay Döngüsü (Kayıt, Giriş, Tweet, Takip, Öneri) │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                 OOP Servis & Model Katmanı                      │
│   • User & Tweet Modelleri (Hashtags, Likes, Followings)        │
│   • Auth & Session Manager (aktifKullanici Kontrolü)            │
│   • Recommendation Engine (Kişiselleştirilmiş Akış Algoritması) │
└─────────────────────────────────────────────────────────────────┘`,
      responsibilities: [
        'Java 17 ve OOP prensipleri (Kapsülleme, Kalıtım, Polimorfizm) kullanılarak temiz sınıf mimarisinin tasarlanması',
        'Takip edilen kullanıcılar ve hashtag ilişkilerine dayalı akıllı öneri algoritmasının geliştirilmesi',
        'E-posta regex doğrulaması, şifre yenileme ve oturum güvenliği mekanizmalarının kodlanması',
        'Karşılaşılan 4 kritik mantık hatasının tespit edilip refactor edilerek test edilmesi'
      ],
      tech: ['Java 17', 'OOP Mimarisi', 'Console CLI', 'Öneri Algoritması', 'IntelliJ IDEA'],
      screenshots: [
        {
          category: '📢 Konsol Ekran Görüntüleri & Uygulama Akışı',
          items: [
            { img: 'ekran_goruntuleri/twitter/1_kayit_ve_giris.png', title: 'Kullanıcı Kaydı & Oturum Açma Kontrolü', desc: 'E-mail doğrulama (regex), parola belirleme ve aktif kullanıcı oturum açma akışı.' },
            { img: 'ekran_goruntuleri/twitter/2_tweet_paylaşımı.png', title: 'Tweet Oluşturma & Hashtag Etiketleme', desc: 'Tweet paylaşımı, dinamik hashtag ayrıştırma ve tüm tweet akışını listeleme.' },
            { img: 'ekran_goruntuleri/twitter/3_takip_ve_begenı.png', title: 'Takip Sistemi & Beğeni Etkileşimi', desc: 'Kullanıcılar arası takip mekanizması, tweet beğenme ve etkileşim sayaçları.' },
            { img: 'ekran_goruntuleri/twitter/4_oneri_motoru.png', title: 'Kişiselleştirilmiş Akış & Öneri Motoru', desc: 'Takip edilen kullanıcılar ve ilgili hashtag etiketlerine göre akıllı öneri algoritması.' },
            { img: 'ekran_goruntuleri/twitter/5_sifre_ve_cikis.png', title: 'Şifre Sıfırlama & Güvenli Oturum Kapatma', desc: 'E-posta doğrulamalı şifre güncelleme, oturum sonlandırma ve güvenli çıkış.' }
          ]
        }
      ]
    }
  };

  const projectDetailsEn = {
    p1: {
      tag: '🏢 Internship Project — Tofaş IT | Modular Monolith & Clean Architecture',
      title: 'Enterprise Dealer Document Management Portal',
      contextNotice: 'Developed during my software engineering internship at Tofaş IT. It enables authorized dealer users to gain centralized, controlled access to assigned documents, announcements, and corporate media via Role-Based Authorization and brand-based permissions.',
      purpose: 'Providing authorized dealer users secure, single-platform access to corporate documents within their permission scope and managing the end-to-end document lifecycle.',
      roles: [
        { name: '👤 Administrator', desc: 'User, dealer, brand, category, and document management; auditing system access logs and login activities.' },
        { name: '📝 Content Manager', desc: 'Managing document creation, file uploading, updating, content publishing, and archiving workflows.' },
        { name: '🏢 Dealer User', desc: 'Listing, inspecting, securely downloading documents belonging strictly to authorized brands, and tracking notifications.' }
      ],
      problems: [
        {
          title: '🏷️ 1. Brand-Based Content Permissioning',
          desc: 'Preventing dealer users from accessing unauthorized documents. Engineered a multi-layered dynamic permission model based on Dealer-to-Brand relations (DealerBrands) and Document target brands (MaterialBrands).'
        },
        {
          title: '📁 2. File Management & Metadata Isolation',
          desc: 'Decoupled binary file contents from database storage into an independent File Storage structure. Stored metadata attributes like FileName, StoredFileName, Extension, and MIME Type relationally in PostgreSQL.'
        },
        {
          title: '🔐 3. Security, JWT & DTO Isolation',
          desc: 'Implemented JWT-based authentication and Backend Role-Based Authorization. Prevented leakage of sensitive server data (Password Hashes, internal file paths) to clients using DTO structures and Soft Delete.'
        },
        {
          title: '📊 4. Audit Trail & Traceability (Access Logs)',
          desc: 'Recorded document viewing and download actions with full timestamps, user IDs, and document IDs via an Access Log audit mechanism to meet corporate compliance standards.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 Angular Frontend (SPA)                      │
│        Components • Services • Route Guards • Interceptors  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JWT Authentication
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   ASP.NET Core Web API                      │
│        Controllers • Middleware • JWT Auth • Swagger        │
└──────────────────────────────┬──────────────────────────────┘
                               │ Clean Architecture
                               ▼
┌─────────────────────────────────────────────────────────────┐
│     Core (Entities) ──► Application (DTO, Logic) ──► Infra  │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
      ┌─────────────────┐            ┌──────────────────┐
      │ PostgreSQL DB   │            │ File Storage     │
      │ (Metadata, Logs)│            │ (Binary Files)   │
      └─────────────────┘            └──────────────────┘`,
      responsibilities: [
        'Engineered RESTful APIs and core business logic following Clean Architecture principles',
        'Designed relational data models in Entity Framework Core & PostgreSQL and managed DB migrations',
        'Coded JWT-based authentication and Role-Based Authorization (RBAC) security infrastructure',
        'Built brand-based many-to-many dynamic document permission algorithms',
        'Integrated file upload, secure download streams, and Access Logs audit mechanisms',
        'Configured Docker & Docker Compose development environments and performed OpenAPI/Swagger API testing',
        'Coordinated with the Angular frontend team via strict DTO API contracts'
      ],
      tech: [
        'ASP.NET Core', '.NET 9', 'Clean Architecture', 'Modular Monolith',
        'Angular', 'TypeScript', 'PostgreSQL', 'EF Core',
        'JWT Authentication', 'Role-Based Auth (RBAC)', 'REST API',
        'Docker', 'Docker Compose', 'Swagger / OpenAPI'
      ],
      screenshots: [
        {
          category: '🏢 Dealer Portal Interfaces',
          items: [
            { img: 'ekran_goruntuleri/internproject-1/assets/01_bayi_login.png', title: 'Dealer Login Screen', desc: 'JWT-based secure authentication interface.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/02_bayi_home.png', title: 'Dealer Homepage', desc: 'Customized announcements and quick action dashboard for users.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/04_bayi_documents.png', title: 'Dealer Document List', desc: 'Listed documents belonging strictly to authorized brands.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/05_bayi_document_detail.png', title: 'Document Inspection & Download', desc: 'Metadata details and secure file download actions.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/03_bayi_notifications.png', title: 'Notifications & Announcements', desc: 'Stream tracking notifications associated with the dealer.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/06_bayi_profile.png', title: 'Dealer User Profile', desc: 'User information and authorized dealer details.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/07_bayi_settings.png', title: 'User Settings', desc: 'Personalization and account preferences screen.' }
          ]
        },
        {
          category: '🛠️ Admin Panel & Document Management (Admin & Content Manager)',
          items: [
            { img: 'ekran_goruntuleri/internproject-1/assets/08_admin_login.png', title: 'Admin Login Panel', desc: 'Dedicated login interface for Admin and Content Manager roles.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/09_admin_dashboard.png', title: 'Admin Dashboard', desc: 'System-wide metrics, document stats, and user analytics.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/10_admin_documents_list.png', title: 'Document Management', desc: 'Centralized document list, search tools, and brand filters.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/11_admin_document_detail_drawer.png', title: 'Document Details Drawer', desc: 'Brand relationships and metadata editing side drawer.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/12_admin_pool_calendar.png', title: 'Pool & Calendar View', desc: 'Document publishing and scheduling calendar interface.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/13_admin_document_access_report.png', title: 'Document Access Report', desc: 'Document-based access analytics and usage reports.' }
          ]
        },
        {
          category: '📊 System Definitions & Audit Logs (Traceability)',
          items: [
            { img: 'ekran_goruntuleri/internproject-1/assets/14_admin_login_activity.png', title: 'Login Activity (Login Audit)', desc: 'User login timestamps, statuses, and session records.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/15_admin_access_logs.png', title: 'Access Logs (Audit Trail)', desc: 'Traceability logs recording which user accessed which document when.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/16_admin_definitions_users.png', title: 'User Definitions & Roles', desc: 'System user roles and account status management.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/17_admin_definitions_dealers.png', title: 'Dealer Definitions', desc: 'Dealer creation and brand permission mappings.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/18_admin_definitions_brands.png', title: 'Brand Definitions', desc: 'Centralized management of brands registered in the system.' },
            { img: 'ekran_goruntuleri/internproject-1/assets/19_admin_definitions_categories.png', title: 'Category Definitions', desc: 'Hierarchical structuring of document categories.' }
          ]
        }
      ]
    },
    p2: {
      tag: '🏛️ Internship Project — TOFAŞ IT | Metadata DMS & Workflow Automation',
      title: 'VaultCore — Enterprise Metadata Document Management & Workflow Portal',
      contextNotice: 'Engineered during my software engineering internship at Tofaş IT. Inspired by M-Files architecture, VaultCore is an enterprise platform featuring folderless object modeling, runtime schema definition, materialized ACL permission engine, state-machine workflow orchestration, check-out versioning, and OCR-supported FTS.',
      purpose: 'Eliminating rigid folder hierarchies by leveraging rich metadata properties, SavedViews, and rule-based workflows to manage documents and business objects in a secure, scalable, and auditable manner.',
      roles: [
        { name: '🏛️ System Administrator', desc: 'Zero-migration schema modeling (ObjectType, ObjectClass, PropertyDefinition, ValueList), visual workflow design, and audit log analytics.' },
        { name: '🛡️ Security & Permission Manager', desc: 'Permission rule matrix (PermissionRule), Materialized ObjectAcl calculation, ACL analytics heatmap, and user privilege simulation.' },
        { name: '👥 Enterprise User & Approver', desc: 'M-Files virtual explorer, dynamic form document entry, check-out locking, open task approvals with SLA tracking, and delegation.' }
      ],
      problems: [
        {
          title: '🗂️ 1. Dynamic Schema Management Without DB Migrations',
          desc: 'Replaced traditional DB migrations when adding new document types or properties with an ObjectType → ObjectClass → PropertyDefinition abstraction layer. Built a hybrid model combining PropertyValue relational integrity and ObjectVersion.PropertiesJson (jsonb) for ultra-fast searches.'
        },
        {
          title: '⚡ 2. Sub-Millisecond Permission Filtering on 100,000+ Objects',
          desc: 'Pre-calculated dynamic Attribute-Based Access Control (ABAC) rules into a Materialized ACL Engine (ObjectAcl) upon object save. Replaced heavy dynamic runtime permission evaluations with indexed single-JOIN queries.'
        },
        {
          title: '🔄 3. Data-Driven State Machine (Workflow Automation)',
          desc: 'Engineered a database-driven state machine managed via a visual canvas, replacing hardcoded if/else statements with configurable states, transitions, SLA timeouts, role assignments, and electronic password signatures.'
        },
        {
          title: '🔍 4. Turkish Morphological FTS & Tesseract OCR Search',
          desc: 'Configured PostgreSQL turkish_unaccent and GIN indexes. Integrated background worker services using Tesseract OCR to automatically extract text from scanned documents into the search index.'
        },
        {
          title: '🔒 5. Check-Out Locking & Content-Addressable Storage (CAS)',
          desc: 'Implemented check-out lock mechanisms to prevent concurrent edits and constructed Content-Addressable Storage (CAS) indexing files by SHA-256 hashes to prevent Path Traversal vulnerabilities.'
        },
        {
          title: '🧪 6. 315 Backend + 112 Frontend Automated Test Architecture',
          desc: 'Wrote 315 integration/API tests using Testcontainers & WebApplicationFactory against real PostgreSQL instances and 112 frontend tests with Jasmine/Karma to ensure zero regression.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 Angular 20 Frontend (SPA)                   │
│   • Standalone Components      • Reactive Signals State     │
│   • Dynamic Metadata Card      • Role/Permission RouteGuards│
│   • M-Files Virtual Explorer   • HTTP Interceptor Chain     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / REST / JWT Bearer
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    VaultCore.API Layer                      │
│   • Thin Controllers           • [RequireObjectPermission]  │
│   • Global Exception Filter    • Rate Limiting & Security   │
│   • Swagger / OpenAPI Docs     • WebDAV & WOPI Host Protocol│
└──────────────────────────────┬──────────────────────────────┘
                               │ Clean Architecture
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                VaultCore.Application Layer                  │
│   • ObjectService & Search     • AclEngineService           │
│   • WorkflowService & Tasks    • AclRecalculation & OCR     │
│   • Fluent Validation & DTO    • MetadataSuggestion (AI)    │
└──────────────────┬───────────────────────────┬──────────────┘
                   │                           │
                   ▼                           ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│       VaultCore.Core        │ │  VaultCore.Infrastructure   │
│  • Domain Entities (DDD)    │ │  • EF Core 9 / PostgreSQL 16│
│  • Domain Enums & Rules     │ │  • SHA-256 CAS File Store   │
│  • Pure Domain Exceptions   │ │  • Tesseract OCR Services   │
└─────────────────────────────┘ └──────────────┬──────────────┘
                                               │
                               ┌───────────────┴──────────────┐
                               ▼                              ▼
                      ┌─────────────────┐            ┌────────────────┐
                      │ PostgreSQL 16   │            │ CAS Storage    │
                      │ (Metadata, ACL) │            │ (SHA-256 Files)│
                      └─────────────────┘            └────────────────┘`,
      responsibilities: [
        'Engineered a Modular Monolith backend following Clean Architecture and Domain-Driven Design (DDD) principles',
        'Designed dynamic relational schemas (ObjectType, ObjectClass, PropertyValue) on PostgreSQL 16 & EF Core 9',
        'Developed the high-performance Materialized ACL Engine (ObjectAcl) and [RequireObjectPermission] filter infrastructure',
        'Coded the visual Workflow Engine, automatic SLA task generation, and electronic password re-authentication mechanisms',
        'Constructed Content-Addressable Storage (CAS - SHA-256), Check-Out locking, and immutable ObjectVersion lifecycles',
        'Integrated PostgreSQL turkish_unaccent full-text search (FTS) and Tesseract OCR background services',
        'Built Angular 20 Standalone components with Angular Signals reactive state management and dynamic metadata forms',
        'Authored 315 backend integration tests with Testcontainers and 112 frontend unit tests'
      ],
      tech: [
        'ASP.NET Core', '.NET 9 (C# 13)', 'Clean Architecture', 'Modular Monolith',
        'Angular 20', 'Standalone Components', 'Angular Signals', 'TypeScript',
        'PostgreSQL 16', 'EF Core 9', 'Materialized ACL', 'FTS & GIN Index',
        'Tesseract OCR', 'CAS File Storage', 'JWT Bearer', 'Docker & Compose',
        'Testcontainers', 'Swagger / OpenAPI'
      ],
      screenshots: [
        {
          category: '🔐 Authentication, Profile & Workflow Hub',
          items: [
            { img: 'ekran_goruntuleri/internproject-2/01_giris_ekrani.png', title: 'Corporate Login Screen', desc: 'Glassmorphic JWT authentication UI protected with rate limiting.' },
            { img: 'ekran_goruntuleri/internproject-2/02_gosterge_paneli.png', title: 'Admin Dashboard', desc: 'SLA delays, pending approval tasks, and key KPI metrics.' },
            { img: 'ekran_goruntuleri/internproject-2/03_akislar_ana_sayfa.png', title: 'Workflows Overview', desc: 'Active organizational workflows and process counters.' },
            { img: 'ekran_goruntuleri/internproject-2/06_akis_2_sozlesme_mali_onay.png', title: 'Contract & Financial Approval', desc: 'Multi-stage financial approval and legal review process.' },
            { img: 'ekran_goruntuleri/internproject-2/07_akis_3_teknik_servis_garanti.png', title: 'Technical Service & Warranty', desc: 'Defect reports and warranty inspector operation flows.' },
            { img: 'ekran_goruntuleri/internproject-2/08_gorevlerim_acik_gorevler.png', title: 'Open Tasks', desc: 'Pending approval requests, remaining SLA deadlines, and priorities.' },
            { img: 'ekran_goruntuleri/internproject-2/09_gorevlerim_tamamlanan_gorevler.png', title: 'Completed Tasks History', desc: 'Past approval decisions, notes, and operation timestamps.' },
            { img: 'ekran_goruntuleri/internproject-2/10_profilim.png', title: 'User Profile', desc: 'User roles and session management panel.' },
            { img: 'ekran_goruntuleri/internproject-2/11_profilim_guvenlik_vekalet.png', title: 'Task Delegation', desc: 'Transferring tasks with an audit trail during leave of absence.' }
          ]
        },
        {
          category: '🗂️ M-Files Virtual Explorer & Dynamic Form Builder',
          items: [
            { img: 'ekran_goruntuleri/internproject-2/12_nesne_gezgini.png', title: 'Object Explorer (Virtual Layout)', desc: 'Virtual folder tree, object grid, and metadata drawer.' },
            { img: 'ekran_goruntuleri/internproject-2/13_yeni_dokuman_olusturma_formu.png', title: 'Dynamic Document Form', desc: 'Runtime generated dynamic validation form based on selected class.' }
          ]
        },
        {
          category: '⚙️ Vault Structure & Dynamic Schema (No-Code Schema)',
          items: [
            { img: 'ekran_goruntuleri/internproject-2/15_admin_vault_yapisi_siniflar.png', title: 'Classes & Workflow Binding', desc: 'Document classes and default workflow mappings.' },
            { img: 'ekran_goruntuleri/internproject-2/16_admin_vault_yapisi_nesne_turleri.png', title: 'Object Types', desc: 'Document, Contract, Vehicle, Supplier entity definitions.' },
            { img: 'ekran_goruntuleri/internproject-2/17_admin_vault_yapisi_ozellik_tanimlari.png', title: 'Property Definitions', desc: 'Metadata fields, data types, and rule configurations.' },
            { img: 'ekran_goruntuleri/internproject-2/18_admin_vault_yapisi_deger_listeleri.png', title: 'Value Lists (Lookup)', desc: 'Dynamic dropdown list and hierarchical data definitions.' }
          ]
        },
        {
          category: '🛡️ Security, Materialized ACL, Workflows & Audit Trail',
          items: [
            { img: 'ekran_goruntuleri/internproject-2/19_admin_izin_kurallari.png', title: 'Permission Rules Matrix', desc: 'Dynamic permission rules at role, group, and metadata intersections.' },
            { img: 'ekran_goruntuleri/internproject-2/20_admin_is_akislari_tasarimcisi.png', title: 'Visual Workflow Designer', desc: 'State machine steps and visual workflow canvas.' },
            { img: 'ekran_goruntuleri/internproject-2/21_admin_is_akislari_adim_detaylari.png', title: 'Step Details & SLA', desc: 'SLA durations, role assignments, and password signature settings.' },
            { img: 'ekran_goruntuleri/internproject-2/22_admin_denetim_izi.png', title: 'System Audit Trail', desc: 'Immutable log of all user actions across the system.' },
            { img: 'ekran_goruntuleri/internproject-2/23_admin_denetim_izi_detay_modali.png', title: 'Audit Trail Detail Modal', desc: 'Raw JSON payloads, data diffs, and client IP details.' },
            { img: 'ekran_goruntuleri/internproject-2/24_admin_kullanici_yonetimi.png', title: 'User Management', desc: 'Account definitions, global roles, and status control.' },
            { img: 'ekran_goruntuleri/internproject-2/25_admin_grup_yonetimi.png', title: 'Group & Department Management', desc: 'Organizational units and approval committee management.' },
            { img: 'ekran_goruntuleri/internproject-2/26_admin_acl_analitik_haritasi.png', title: 'ACL Analytics Heatmap', desc: 'Permission rule distribution and Allow/Deny ratios.' },
            { img: 'ekran_goruntuleri/internproject-2/27_admin_acl_tanilama_kullanici_sonucu.png', title: 'ACL Diagnostics & Simulation', desc: 'User-based rule matching and privilege simulation.' }
          ]
        }
      ]
    },
    p3: {
      tag: '✨ Mobile App & Cloud Architecture | Flutter, Riverpod & Supabase',
      title: 'BeYourself — Personal Inspiration, Quote Notebook & Instagram Media Assistant',
      contextNotice: 'A modern Flutter app that saves inspiring quotes, Reels videos, and gallery posts from social media in one click, backed by Vercel Serverless CORS proxy infrastructure, Android Home Widget, scheduled local notifications, and Supabase cloud synchronization.',
      purpose: 'Enabling users to organize inspiring quotes and media from social media without losing them, receive daily motivation notifications, and track their favorite quotes live on their home screen widget.',
      roles: [
        { name: '🎬 Media & Video Engine', desc: 'Instagram URL parsing, Reels player, up to 10-photo swipeable carousel gallery, pinch-to-zoom, and Vercel Serverless CORS proxy integration.' },
        { name: '📲 Widget & Notification Infrastructure', desc: 'Live Android Home Widget synchronization and scheduled offline notification engine powered by flutter_local_notifications.' },
        { name: '☁️ Hybrid Data Architecture', desc: 'Local-First SharedPreferences for lightning-fast offline UX paired with Supabase cloud database for profile backups and sync.' }
      ],
      problems: [
        {
          title: '🌐 1. Bypassing Web & iOS CORS Media Constraints',
          desc: 'Built a dedicated Vercel Serverless CORS Proxy API to handle media requests and bypass CORS limitations when downloading Instagram URLs directly.'
        },
        {
          title: '📲 2. Android Home Widget & Real-Time Data Sync',
          desc: 'Implemented instant widget updates via home_widget services whenever a quote is modified or deleted in the app.'
        },
        {
          title: '⏰ 3. Offline & Reliable Local Notification Scheduling',
          desc: 'Scheduled local offline notifications based on user-defined time intervals (e.g. 09:00, 14:00, 21:00) without requiring an active internet connection.'
        },
        {
          title: '🧠 4. Automatic Title & Caption Parsing Algorithm',
          desc: 'Developed a regex-based text engine that automatically extracts impactful short titles and author metadata from raw Instagram post captions.'
        },
        {
          title: '🎲 5. Random Inspiration Wheel & Buffer Memory',
          desc: 'Utilized Haptic Feedback vibrations and a history buffer remembering the last 5 quotes to prevent consecutive duplicate quotes.'
        },
        {
          title: '🧪 6. 100% Pass Rate Across 50 Unit & Widget Tests',
          desc: 'Established full regression protection with 50 tests covering Riverpod state management, media parsing, notifications, and SharedPreferences persistence.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                    Flutter 3.x UI Layer                     │
│   • Outfit & Plus Jakarta Sans  • Glassmorphism Dark/Light  │
│   • Reactive Riverpod 2.5 State • Pinch-to-Zoom Gallery     │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│    Device & OS Systems      │ │     Cloud & API Layer       │
│  • Android Home Widget      │ │  • Vercel Serverless CORS   │
│  • Local Notifications      │ │  • Supabase Cloud Database  │
│  • SharedPreferences Cache  │ │  • Instagram Media Parser   │
└─────────────────────────────┘ └─────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            Test Infrastructure (50/50 Passed Unit Tests)    │
│   • Riverpod Providers • Downloader • Widget • Notifications│
└─────────────────────────────┘`,
      responsibilities: [
        'Architected a clean and reactive mobile application from scratch using Flutter 3.x and Riverpod 2.5',
        'Developed and deployed the Vercel Serverless CORS Proxy API integrated with Instagram media parsing services',
        'Coded Android Home Widget background updates and fallback sync mechanisms',
        'Established scheduled offline notifications using flutter_local_notifications and timezone',
        'Ensured bi-directional user profile and quote synchronization with Supabase cloud DB',
        'Wrote 50 comprehensive unit and widget tests achieving a 100% pass rate'
      ],
      tech: [
        'Flutter 3.x', 'Dart 3.x', 'Riverpod 2.5', 'Supabase',
        'Vercel Serverless', 'Android Home Widget', 'Local Notifications',
        'SharedPreferences', 'Video Player', 'Unit Testing (50 Tests)'
      ],
      screenshots: [
        {
          category: '📱 Homepage, Media Feed & Discovery',
          items: [
            { img: 'ekran_goruntuleri/beyourself/1000115787.jpg', title: 'Splash & Welcome Screen', desc: 'Minimalist origami logo and modern welcome interface.' },
            { img: 'ekran_goruntuleri/beyourself/1000115788.jpg', title: 'Homepage & Daily Quote Stream', desc: 'Dynamic greeting, search bar, daily quote card, and category filters.' },
            { img: 'ekran_goruntuleri/beyourself/1000115785.jpg', title: 'Quote Detail & Full-Screen Media', desc: 'Instagram Reels video/image player with full-screen media experience.' },
            { img: 'ekran_goruntuleri/beyourself/1000115786.jpg', title: 'Automatic Caption & Text Details', desc: 'Auto-fetched caption text and detailed quote contents.' }
          ]
        },
        {
          category: '🎬 Instagram Media Downloader & New Quote Entry',
          items: [
            { img: 'ekran_goruntuleri/beyourself/1000115782.jpg', title: 'Instagram URL Input & Media Fetcher', desc: 'Paste Reels/Post link to fetch media and caption automatically.' },
            { img: 'ekran_goruntuleri/beyourself/1000115783.jpg', title: 'Media Selection, Author & Category Assignment', desc: 'Upload media from gallery, set author, and pick category.' },
            { img: 'ekran_goruntuleri/beyourself/1000115784.jpg', title: 'Random Inspiration Wheel (Roll & Discover)', desc: 'Category-filtered random quote discovery with haptic vibration.' }
          ]
        },
        {
          category: '🗂️ Categories & Favorites Collection',
          items: [
            { img: 'ekran_goruntuleri/beyourself/1000115779.jpg', title: 'Categories & Custom Icons', desc: 'Category cards, custom icons, and quote counters.' },
            { img: 'ekran_goruntuleri/beyourself/1000115780.jpg', title: 'Dynamic Category Modal', desc: 'Modal dialog enabling users to create custom categories.' },
            { img: 'ekran_goruntuleri/beyourself/1000115781.jpg', title: 'Favorites Collection', desc: 'Saved list of favorite quotes curated by the user.' }
          ]
        },
        {
          category: '👤 Profile, Avatar, Motto & Notification Preferences',
          items: [
            { img: 'ekran_goruntuleri/beyourself/1000115775.jpg', title: 'App Settings & Theme Manager', desc: 'Dark/light mode toggle, notification switch, and profile settings access.' },
            { img: 'ekran_goruntuleri/beyourself/1000115776.jpg', title: 'Scheduled Notifications & Time Sliders', desc: 'Daily notification frequency slider, start/end hours, and test notification.' },
            { img: 'ekran_goruntuleri/beyourself/1000115777.jpg', title: 'Profile Settings & Preset Avatar Picker', desc: 'Select from 16 preset inspiration avatars or upload custom profile photo.' },
            { img: 'ekran_goruntuleri/beyourself/1000115778.jpg', title: 'Personal Motto & Salutation Style', desc: 'User life motto, personalized notification salutation style, and account stats.' }
          ]
        }
      ]
    },
    p4: {
      tag: '🎓 Desktop Software & Algorithm | C# .NET WinForms',
      title: 'Grade Calculation & Academic Success Tracking Tool',
      contextNotice: 'A lightweight C# WinForms desktop software that instantly calculates the minimum final exam grade required for students to pass their courses based on midterm, homework, and target passing criteria.',
      purpose: 'Allowing students to define custom midterm weights, homework weights, and target pass scores to optimize study workloads and instantly view exact required final exam grades.',
      roles: [
        { name: '🧮 Weighted Grade Calculation Engine', desc: 'Calculating dynamic coefficient formulas for midterms, homeworks, and final exam weight percentages against target pass thresholds.' },
        { name: '🛡️ Flexible Input & Blank Field Tolerance', desc: 'Treating unsubmitted homework entries as 0 points automatically to avoid mathematical formula exceptions and runtime crashes.' },
        { name: '⚡ Smart Status & Early Pass Detection', desc: 'Providing instant "Already Passed!" feedback if existing midterm and homework scores already exceed the passing threshold.' }
      ],
      problems: [
        {
          title: '📐 1. Dynamic Percentage & Coefficient Formulation',
          desc: 'Engineered a flexible reverse target grade algorithm adaptable to varying university grading policies (e.g. 30% Midterm, 20% Homework, 50% Final).'
        },
        {
          title: '🚫 2. Input Validation & Exception Handling',
          desc: 'Safely handled invalid character inputs and blank text fields with Robust Input Validation and Exception Handling.'
        },
        {
          title: '🎯 3. Early Success Notification',
          desc: 'Provided immediate notification when required final scores evaluate to 0 or negative, relieving unnecessary exam anxiety.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 C# .NET WinForms UI Layer                   │
│   • Form Inputs (Pass Grade, Midterm %, Final %, Homeworks) │
│   • Calculate Button & Instant Result / Status Feedback     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                Calculation & Validation Engine              │
│   • Input Validation & Blank Field Tolerance (Default 0)    │
│   • Weighted Average & Target Final Grade Formula           │
│   • Logical Status Evaluation (Below/Above Threshold/Passed)│
└─────────────────────────────┘`,
      responsibilities: [
        'Designed an intuitive desktop UI using C# and .NET WinForms technology',
        'Coded the core mathematical algorithm calculating weighted midterm, homework, and final target percentages',
        'Implemented robust input validation to gracefully capture format and empty field exceptions',
        'Published as open-source software on GitHub with version documentation'
      ],
      tech: ['C#', '.NET WinForms', 'Algorithmic Calculation', 'Input Validation', 'Desktop Application'],
      screenshots: [
        {
          category: '🖥️ Desktop UI & Calculation Scenarios',
          items: [
            { img: 'ekran_goruntuleri/notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164217.png', title: 'Empty Form & Parameter Inputs', desc: 'Initial form allowing entry of target grade, exam percentages, and 3 homework weights.' },
            { img: 'ekran_goruntuleri/notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164330.png', title: 'Dynamic Calculation & Final Grade Target', desc: 'Minimum 24.00 final score required calculation based on Midterm (30%: 60) and Homeworks (10%: 80/70).' },
            { img: 'ekran_goruntuleri/notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164404.png', title: 'Early Success & "Already Passed!" Status', desc: 'Result screen notifying that the course has already been passed prior to taking the final exam.' }
          ]
        }
      ]
    },
    p5: {
      tag: '🎴 Game Development & Data Structures | C++ & SFML',
      title: 'Memory Match — C++ & SFML 2D Card Matching Game',
      contextNotice: 'A 2D graphical GUI card matching memory game built with C++ and SFML (Simple and Fast Multimedia Library) operating on a 4x4 matrix to reinforce data structure concepts.',
      purpose: 'Demonstrating how fundamental data structures like struct, 2D arrays, FIFO queues, and maps organize real-time game loops, memory management, and mouse input handling.',
      roles: [
        { name: '🗂️ 2D Array & Card struct Architecture', desc: 'Representing a 4x4 (16 cards) game board with a 2D matrix and lightweight struct storing card letter, flipped state, and grid position.' },
        { name: '⏳ Queue (FIFO) Matching Controller', desc: 'Storing clicked cards in FIFO order to execute delayed flip-backs and matching evaluations non-blockingly.' },
        { name: '🗺️ Map Texture & Asset Binding', desc: 'Mapping character keys (A, B, C...) to SFML graphic textures and sprites with O(1) lookup speed.' }
      ],
      problems: [
        {
          title: '🎮 1. Real-Time Game Loop & Event Handling',
          desc: 'Processed SFML window events (mouse clicks, close signals) smoothly at 60 FPS while mapping mouse pixel coordinates to 4x4 grid cells.'
        },
        {
          title: '⏱️ 2. Non-Blocking Delayed Flip-Back Timer',
          desc: 'Managed a non-blocking delay timer for mismatched card pairs so players can memorize card positions without freezing the render loop.'
        },
        {
          title: '🎲 3. Random Card Shuffling & Pair Guarantees',
          desc: 'Applied Fisher-Yates shuffle logic to generate exactly 2 instances of 8 distinct letters and distribute them fairly across the 4x4 board.'
        }
      ],
      architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 SFML 2.x Graphics Window                    │
│   • 60 FPS Render Loop    • Mouse Event Listener            │
│   • Sprite & Texture Drawing (Star & Letter Assets)         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Data Structures & Game Logic                  │
│   • 2D Array [4][4] -> struct Card (state, value, pos)      │
│   • std::queue<Card*> -> Ordered Click & Match Controller   │
│   • std::map<char, Texture> -> Texture / Letter Mapping     │
│   • Shuffle & State Machine (Closed/Flipped/Matched)        │
└──────────────────────────────┬──────────────────────────────┘`,
      responsibilities: [
        'Coded game engine loop and graphical user interface using C++ and SFML library',
        'Integrated struct, 2D array, queue, and map data structures to manage game states',
        'Wrote coordinate conversion algorithms mapping mouse clicks to 2D matrix cells',
        'Configured Visual Studio C++ linker, SFML include/lib dependencies, and DLL binaries'
      ],
      tech: ['C++', 'SFML 2.x', 'Data Structures (Queue, Map, 2D Array)', 'Visual Studio', 'GUI Game Development'],
      screenshots: [
        {
          category: '🎮 Gameplay Screenshots & Matching Scenarios',
          items: [
            { img: 'ekran_goruntuleri/kart_oyunu/Ekran görüntüsü 2026-01-25 131812.png', title: '4x4 Game Board & Successful "A" Match', desc: 'Gameplay moment showing two "A" letter cards successfully matched and revealed.' },
            { img: 'ekran_goruntuleri/kart_oyunu/Ekran görüntüsü 2026-01-25 131823.png', title: 'Multiple Matches & "A" - "C" Pairs', desc: 'Board state as player discovers consecutive "A" and "C" card pairs.' }
          ]
        }
      ]
    },
    p6: {
      tag: '📢 Backend & OOP Architecture | Java 17 Terminal Solution',
      title: 'Mini Twitter — Java 17 & OOP-Based Social Media Platform',
      contextNotice: 'A CLI terminal platform built using Java 17 and Object-Oriented Programming (OOP) principles, featuring session management, tweeting, hashtagging, user following, and a personalized recommendation engine.',
      purpose: 'Demonstrating clean OOP architecture (User, Tweet, Follow, Recommendation services), Regex email validation, and state machine session management in a terminal environment.',
      roles: [
        { name: '👤 User & Session Management', desc: 'Regex email validation, encrypted login, password reset, and active user session tracking.' },
        { name: '📢 Tweet & Hashtag Engine', desc: 'Tweet creation, hashtag tagging, like counters, and timeline feed generation.' },
        { name: '🧠 Smart Recommendation Algorithm', desc: 'Personalized feed engine analyzing followed users and interested hashtags.' }
      ],
      problems: [
        {
          title: '🔁 1. Session Protection Against Unauthorized Actions',
          desc: 'Enforced activeUser != null checks to prevent posting tweets without an active login.'
        },
        {
          title: '👯‍♀️ 2. Dynamic Session State Updates',
          desc: 'Resolved session data persistence issues when switching accounts by dynamically refreshing session state objects.'
        },
        {
          title: '📩 3. Robust Email Regex Validation',
          desc: 'Protected the system against invalid email formats using strict Regex domain and syntax checking.'
        },
        {
          title: '🔓 4. Concurrent Registration Conflict Safeguards',
          desc: 'Prevented duplicate logins or registration while logged in using rule matrices.'
        }
      ],
      architectureDiagram: `┌───────────────────────────────────────────────────────────────┐
│                 Java 17 CLI Console UI                        │
│   • Main Menu Event Loop (Register, Login, Tweet, Follow, Rec)│
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                 OOP Service & Model Layer                       │
│   • User & Tweet Models (Hashtags, Likes, Followings)           │
│   • Auth & Session Manager (activeUser Check)                   │
│   • Recommendation Engine (Personalized Feed Algorithm)         │
└─────────────────────────────────────────────────────────────────┘`,
      responsibilities: [
        'Designed clean class architecture using Java 17 and OOP principles (Encapsulation, Inheritance, Polymorphism)',
        'Engineered smart recommendation algorithms based on followed users and hashtag correlations',
        'Implemented Regex email validation, password recovery, and session security mechanisms',
        'Identified, refactored, and tested solutions for 4 critical logic bugs'
      ],
      tech: ['Java 17', 'OOP Architecture', 'Console CLI', 'Recommendation Algorithm', 'IntelliJ IDEA'],
      screenshots: [
        {
          category: '📢 Console Screenshots & Application Flow',
          items: [
            { img: 'ekran_goruntuleri/twitter/1_kayit_ve_giris.png', title: 'User Registration & Login Check', desc: 'Email validation (regex), password setting, and active user login flow.' },
            { img: 'ekran_goruntuleri/twitter/2_tweet_paylaşımı.png', title: 'Tweet Posting & Hashtag Tagging', desc: 'Posting tweets, dynamic hashtag parsing, and listing tweet feeds.' },
            { img: 'ekran_goruntuleri/twitter/3_takip_ve_begenı.png', title: 'Follow System & Like Interactions', desc: 'Inter-user follow mechanism, tweet liking, and interaction counters.' },
            { img: 'ekran_goruntuleri/twitter/4_oneri_motoru.png', title: 'Personalized Feed & Recommendation Engine', desc: 'Smart recommendation algorithm based on followed users and hashtag tags.' },
            { img: 'ekran_goruntuleri/twitter/5_sifre_ve_cikis.png', title: 'Password Reset & Secure Logout', desc: 'Email-validated password updates, session termination, and safe logout.' }
          ]
        }
      ]
    }
  };

  let activeModalPid = null;

  function renderModal(pid) {
    if (!pid) return;
    activeModalPid = pid;
    const isEn = (currentAppLanguage === 'en');
    const data = (isEn && projectDetailsEn[pid]) ? projectDetailsEn[pid] : projectDetailsTr[pid];
    if (!data) return;

    const labels = {
      contextNotice: isEn ? '📌 Project Context & Security:' : '📌 Proje Bağlamı & Güvenlik:',
      purposeTitle: isEn ? '🎯 Project Purpose & User Roles' : '🎯 Proje Amacı & Kullanıcı Rolleri',
      problemsTitle: isEn ? '🧠 Engineering Problems & Solutions' : '🧠 Karşılaşılan Mühendislik Problemleri & Çözümler',
      archTitle: isEn ? '🏗️ System & Layered Architecture' : '🏗️ Sistem & Katmanlı Mimari Yapısı',
      respTitle: isEn ? '👩🏻‍💻 My Technical Contributions & Responsibilities' : '👩🏻‍💻 Projedeki Kişisel Katkılarım & Sorumluluklarım',
      galleryTitle: isEn ? '📸 Project Screenshots & Interface Gallery' : '📸 Proje Ekran Görüntüleri & Arayüz Galerisi',
      galleryDesc: isEn ? 'Click on any screenshot below to view the high-resolution detail preview.' : 'Aşağıdaki ekran görüntülerine tıklayarak yüksek çözünürlüklü detaylı önizlemesini açabilirsiniz.',
      inspect: isEn ? '🔍 Inspect' : '🔍 İncele',
      problemDef: isEn ? '🎯 Problem Definition' : '🎯 Problem Tanımı',
      solutionDef: isEn ? '💡 Implemented Solution & Architecture' : '💡 Uygulanan Çözüm & Mimari',
      techHighlights: isEn ? '⚡ Key Technical Features' : '⚡ Önemli Teknik Özellikler'
    };

    if (data.screenshots && data.screenshots.length > 0) {
      modalContent.innerHTML = `
        <div class="pm-header">
          <span class="pm-tag">${data.tag}</span>
          <h2 class="pm-title">${data.title}</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
            ${data.tech.map(t => `<span class="pill">${t}</span>`).join('')}
          </div>
        </div>

        <div class="pm-banner">
          <strong>${labels.contextNotice}</strong> ${data.contextNotice}
        </div>

        <div class="pm-section">
          <h3 class="pm-section-title">${labels.purposeTitle}</h3>
          <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1.25rem;">
            ${data.purpose}
          </p>
          <div class="pm-grid-3">
            ${data.roles.map(r => `
              <div class="pm-card">
                <h4 style="color: var(--accent-cyan);">${r.name}</h4>
                <p>${r.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pm-section">
          <h3 class="pm-section-title">${labels.problemsTitle}</h3>
          <div class="pm-grid-2">
            ${data.problems.map(p => `
              <div class="pm-card">
                <h4 style="color: #38bdf8;">${p.title}</h4>
                <p>${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pm-section">
          <h3 class="pm-section-title">${labels.archTitle}</h3>
          <pre class="pm-arch-box"><code>${data.architectureDiagram}</code></pre>
        </div>

        <div class="pm-section">
          <h3 class="pm-section-title">${labels.respTitle}</h3>
          <div class="pm-card" style="background: rgba(0, 242, 254, 0.02); border-color: rgba(0, 242, 254, 0.15);">
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem; padding: 0;">
              ${data.responsibilities.map(resp => `
                <li style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem; color: #cbd5e1;">
                  <span style="color: var(--accent-emerald); font-weight: bold; line-height: 1.2;">✔</span>
                  <span>${resp}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div class="pm-section">
          <h3 class="pm-section-title">${labels.galleryTitle}</h3>
          <p style="font-size: 0.88rem; color: #94a3b8; margin-bottom: 1.5rem;">
            ${labels.galleryDesc}
          </p>

          ${data.screenshots.map(group => `
            <div class="pm-gallery-group">
              <h4 class="pm-gallery-subheading">${group.category}</h4>
              <div class="pm-gallery-grid">
                ${group.items.map(item => `
                  <div class="pm-screenshot-card" data-img="${item.img}" data-title="${item.title} - ${item.desc}">
                    <div class="pm-screenshot-thumb">
                      <img src="${item.img}" alt="${item.title}" loading="lazy">
                      <div class="pm-screenshot-overlay">
                        <span>${labels.inspect}</span>
                      </div>
                    </div>
                    <div class="pm-screenshot-meta">
                      <div class="pm-screenshot-title">${item.title}</div>
                      <div class="pm-screenshot-desc">${item.desc}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;

      modalContent.querySelectorAll('.pm-screenshot-card').forEach(card => {
        card.addEventListener('click', () => {
          const imgSrc = card.getAttribute('data-img');
          const imgTitle = card.getAttribute('data-title');
          openLightbox(imgSrc, imgTitle);
        });
      });
    } else {
      modalContent.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span style="color: var(--accent-cyan); font-family: var(--font-code); font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">${data.subtitle}</span>
          <h2 style="font-size: 1.6rem; margin-top: 0.35rem; color: #fff;">${data.title}</h2>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #cbd5e1; margin-bottom: 0.4rem; font-size: 1.05rem;">${labels.problemDef}</h4>
          <p style="font-size: 0.92rem; line-height: 1.6;">${data.problem}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem; font-size: 1.05rem;">${labels.solutionDef}</h4>
          <p style="font-size: 0.92rem; line-height: 1.6;">${data.solution}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #cbd5e1; margin-bottom: 0.6rem; font-size: 1.05rem;">${labels.techHighlights}</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
            ${data.highlights.map(h => `
              <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: #94a3b8;">
                <span style="color: var(--accent-emerald);">✔</span> ${h}
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.tech.map(t => `<span class="pill">${t}</span>`).join('')}
        </div>
      `;
    }
  }

  window.refreshCurrentModal = () => {
    if (modal && modal.classList.contains('active') && activeModalPid) {
      renderModal(activeModalPid);
    }
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-id');
      renderModal(pid);
      modal.classList.add('active');
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (lightbox && lightbox.classList.contains('active')) {
          closeLightbox();
        } else if (modal.classList.contains('active')) {
          modal.classList.remove('active');
        }
      }
    });
  }
}

/* ==========================================================================
   5. Contact Form & Toast Notifications
   ========================================================================== */
function initContactFeatures() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');
  const toast = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');

  let toastTimer = null;
  function showToast(message) {
    if (!toast || !toastText) return;
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastText.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Check URL query parameters for ?submitted=true redirect callback
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('submitted')) {
    launchSuccessCelebration(3000);
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  }

  // Copy Email
  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      const isEn = (currentAppLanguage === 'en');
      navigator.clipboard.writeText(email).then(() => {
        showToast(isEn ? 'Email address copied to clipboard! 📋' : 'E-posta adresi panoya kopyalandı! 📋');
      }).catch(() => {
        showToast(isEn ? 'Copy failed, please copy manually.' : 'Kopyalama başarısız oldu, lütfen manuel kopyalayın.');
      });
    });
  }

  // Contact Form Submission
  // Handles local testing (file://) via mailto fallback & live web server (http/https) via FormSubmit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const isEn = (currentAppLanguage === 'en');
      const submitBtn = form.querySelector('button[type="submit"]');

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Yerel dosya sisteminden (file://) açıldığında FormSubmit engelini aşmak için mailto yönlendirmesi
      if (window.location.protocol === 'file:') {
        showToast(
          isEn
            ? 'You are in local test mode! Redirecting message to your email client (Mail/Outlook)... 📬'
            : 'Yerel test ortamındasınız! Mesaj e-posta uygulamanıza (Mail/Outlook) aktarılıyor... 📬'
        );

        setTimeout(() => {
          const mailtoUrl = `mailto:zehratuncer.dev@gmail.com?subject=${encodeURIComponent((isEn ? 'Portfolio: ' : 'Portfolyo: ') + subject)}&body=${encodeURIComponent((isEn ? 'Full Name: ' : 'Ad Soyad: ') + name + '\n' + (isEn ? 'Email: ' : 'E-Posta: ') + email + '\n\n' + (isEn ? 'Message:\n' : 'Mesaj:\n') + message)}`;
          window.location.href = mailtoUrl;
          form.reset();
        }, 1200);
        return;
      }

      // Canlı Web Sunucusu (GitHub Pages / Live Server / http / https)
      if (submitBtn) submitBtn.disabled = true;

      showToast(
        isEn
          ? 'Sending message... 🚀'
          : 'Mesajınız gönderiliyor... 🚀'
      );

      // Submit via FormData
      const formData = new FormData(form);
      formData.set('Ad_Soyad', name);
      formData.set('Eposta', email);
      formData.set('Konu', subject);
      formData.set('Mesaj', message);
      formData.set('_subject', `Portfolyo İletişim Formundan Yeni Mesaj: ${subject}`);
      formData.set('_captcha', 'false');
      formData.set('_template', 'table');

      fetch('https://formsubmit.co/ajax/zehratuncer.dev@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('FormSubmit AJAX request failed');
        }
        return response.json();
      })
      .then(data => {
        launchSuccessCelebration(3000);
        form.reset();
      })
      .catch((err) => {
        console.warn('FormSubmit AJAX error:', err);
        showToast(
          isEn
            ? 'An error occurred while sending your message. Please try again. ⚠️'
            : 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz. ⚠️'
        );
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }
}

/* ==========================================================================
   6. Fireworks Particle Animation & Success Modal Controller
   ========================================================================== */
function launchSuccessCelebration(duration = 3000) {
  const modalBackdrop = document.getElementById('success-modal-backdrop');
  const modalTitle = document.getElementById('success-modal-title');
  const modalDesc = document.getElementById('success-modal-desc');
  const canvas = document.getElementById('fireworks-canvas');

  if (!modalBackdrop || !canvas) return;

  const lang = currentAppLanguage || 'tr';
  const dict = (i18nData && i18nData[lang]) ? i18nData[lang] : i18nData['tr'];

  if (modalTitle && dict && dict.success_title) {
    modalTitle.textContent = dict.success_title;
  }
  if (modalDesc && dict && dict.success_desc) {
    modalDesc.textContent = dict.success_desc;
  }

  modalBackdrop.classList.add('active');

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];
  let isRunning = true;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  const colors = [
    '#00f2fe', '#4facfe', '#00ff87', '#60efff',
    '#ff007f', '#ff758c', '#ffea00', '#ffaa00',
    '#a855f7', '#ec4899', '#38ef7d', '#ffffff'
  ];

  function createFireworkBurst(originX, originY, particleCount = 70) {
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3.8 + 1.8,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012,
        gravity: 0.14,
        friction: 0.96
      });
    }
  }

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  // Staggered firework explosions around the center modal card
  createFireworkBurst(cx, cy - 130, 85);
  createFireworkBurst(cx - 180, cy, 75);
  createFireworkBurst(cx + 180, cy, 75);

  setTimeout(() => {
    if (isRunning) {
      createFireworkBurst(cx - 140, cy - 110, 80);
      createFireworkBurst(cx + 140, cy - 110, 80);
    }
  }, 350);

  setTimeout(() => {
    if (isRunning) {
      createFireworkBurst(cx, cy - 70, 95);
      createFireworkBurst(cx - 200, cy + 40, 70);
      createFireworkBurst(cx + 200, cy + 40, 70);
    }
  }, 850);

  setTimeout(() => {
    if (isRunning) {
      createFireworkBurst(cx - 90, cy - 150, 85);
      createFireworkBurst(cx + 90, cy - 150, 85);
    }
  }, 1450);

  function render() {
    if (!isRunning && particles.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 14;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Exactly 3 seconds display
  setTimeout(() => {
    isRunning = false;
    modalBackdrop.classList.remove('active');
    setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = [];
    }, 450);
  }, duration);
}

/* ==========================================================================
   6. Title Marquee Effect
   ========================================================================== */
function initTitleMarquee() {
  let titleText = "Zehra Tuncer | Yazılım Geliştiricisi \u2022     ";
  setInterval(() => {
    titleText = titleText.substring(1) + titleText[0];
    document.title = "\u200B" + titleText;
  }, 150);
}

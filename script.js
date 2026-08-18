/**
 * Zehra - Portfolio Main JavaScript Engine
 * Features: High-performance Particle Canvas, Filterable Projects & Modals,
 * Form Validation & Toast System.
 */

document.addEventListener('DOMContentLoaded', () => {
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

  const projectDetails = {
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
            { img: 'internproject-1/assets/01_bayi_login.png', title: 'Bayi Giriş Ekranı', desc: 'JWT tabanlı güvenli kimlik doğrulama arayüzü.' },
            { img: 'internproject-1/assets/02_bayi_home.png', title: 'Bayi Ana Sayfası', desc: 'Kullanıcıya özel güncel duyurular ve hızlı işlem paneli.' },
            { img: 'internproject-1/assets/04_bayi_documents.png', title: 'Bayi Doküman Listesi', desc: 'Yalnızca yetkili olunan markalara ait listelenen dokümanlar.' },
            { img: 'internproject-1/assets/05_bayi_document_detail.png', title: 'Doküman İnceleme & İndirme', desc: 'Metadata detayları ve güvenli dosya indirme aksiyonu.' },
            { img: 'internproject-1/assets/03_bayi_notifications.png', title: 'Bildirimler & Duyurular', desc: 'Bayiyle ilişkili bildirimlerin takip edildiği akış.' },
            { img: 'internproject-1/assets/06_bayi_profile.png', title: 'Bayi Kullanıcı Profili', desc: 'Kullanıcı bilgileri ve yetkili bayi detayları.' },
            { img: 'internproject-1/assets/07_bayi_settings.png', title: 'Kullanıcı Ayarları', desc: 'Kişiselleştirme ve hesap tercihleri ekranı.' }
          ]
        },
        {
          category: '🛠️ Yönetim Paneli & Doküman Yönetimi (Admin & Content Manager)',
          items: [
            { img: 'internproject-1/assets/08_admin_login.png', title: 'Yönetici Giriş Paneli', desc: 'Admin ve Content Manager rolleri için özel giriş ekranı.' },
            { img: 'internproject-1/assets/09_admin_dashboard.png', title: 'Yönetim Dashboard', desc: 'Sistem geneli metrikler, doküman ve kullanıcı istatistikleri.' },
            { img: 'internproject-1/assets/10_admin_documents_list.png', title: 'Doküman Yönetimi', desc: 'Merkezi doküman listesi, arama ve marka filtreleme araçları.' },
            { img: 'internproject-1/assets/11_admin_document_detail_drawer.png', title: 'Doküman Detay & Drawer', desc: 'Dokümana ait marka ilişkileri ve metadata düzenleme paneli.' },
            { img: 'internproject-1/assets/12_admin_pool_calendar.png', title: 'Havuz & Takvim Görünümü', desc: 'Doküman yayın ve planlama takvimi arayüzü.' },
            { img: 'internproject-1/assets/13_admin_document_access_report.png', title: 'Doküman Erişim Raporu', desc: 'Doküman bazlı erişim ve kullanım analiz raporları.' }
          ]
        },
        {
          category: '📊 Sistem Tanımları & Audit Kayıtları (İzlenebilirlik)',
          items: [
            { img: 'internproject-1/assets/14_admin_login_activity.png', title: 'Giriş Aktiviteleri (Login Audit)', desc: 'Kullanıcıların giriş zamanları, durumları ve oturum kayıtları.' },
            { img: 'internproject-1/assets/15_admin_access_logs.png', title: 'Erişim Kayıtları (Access Logs)', desc: 'Hangi kullanıcının hangi dokümana ne zaman eriştiğinin izi.' },
            { img: 'internproject-1/assets/16_admin_definitions_users.png', title: 'Kullanıcı Tanımları & Roller', desc: 'Sistem kullanıcılarının rolleri ve durum yönetimi.' },
            { img: 'internproject-1/assets/17_admin_definitions_dealers.png', title: 'Bayi Tanımları', desc: 'Bayi oluşturma ve marka yetkilendirme eşleştirmeleri.' },
            { img: 'internproject-1/assets/18_admin_definitions_brands.png', title: 'Marka Tanımları', desc: 'Sistemdeki markaların merkezi yönetimi.' },
            { img: 'internproject-1/assets/19_admin_definitions_categories.png', title: 'Kategori Tanımları', desc: 'Doküman kategorilerinin hiyerarşik yapılandırılması.' }
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
            { img: 'internproject-2/01_giris_ekrani.png', title: 'Kurumsal Giriş Ekranı', desc: 'Cam efektli, rate-limiting korumalı JWT oturum açma arayüzü.' },
            { img: 'internproject-2/02_gosterge_paneli.png', title: 'Yönetici Gösterge Paneli', desc: 'SLA gecikmeleri, bekleyen görevler ve kritik KPI metrikleri.' },
            { img: 'internproject-2/03_akislar_ana_sayfa.png', title: 'İş Akışları Genel Bakış', desc: 'Kurum genelindeki aktif iş akışları ve süreç sayaçları.' },
            { img: 'internproject-2/06_akis_2_sozlesme_mali_onay.png', title: 'Sözleşme & Mali Onay', desc: 'Çok kademeli mali onay ve hukuki inceleme süreci.' },
            { img: 'internproject-2/07_akis_3_teknik_servis_garanti.png', title: 'Teknik Servis & Garanti', desc: 'Arıza bildirimleri ve garanti eksper operasyonları.' },
            { img: 'internproject-2/08_gorevlerim_acik_gorevler.png', title: 'Açık Görevlerim', desc: 'Bekleyen onay talepleri, kalan SLA süreleri ve öncelikler.' },
            { img: 'internproject-2/09_gorevlerim_tamamlanan_gorevler.png', title: 'Tamamlanan Görev Geçmişi', desc: 'Geçmiş onay kararları, onay notları ve işlem zamanları.' },
            { img: 'internproject-2/10_profilim.png', title: 'Kullanıcı Profili', desc: 'Kullanıcı rolleri ve oturum yönetim paneli.' },
            { img: 'internproject-2/11_profilim_guvenlik_vekalet.png', title: 'Görev Vekalet Devri', desc: 'İzin durumunda görevlerin denetim iziyle devredilmesi.' }
          ]
        },
        {
          category: '🗂️ M-Files Sanal Gezgini & Dinamik Form Üretimi',
          items: [
            { img: 'internproject-2/12_nesne_gezgini.png', title: 'Nesne Gezgini (Sanal Düzen)', desc: 'Sanal klasör ağacı, nesne tablosu ve metadata çekmecesi.' },
            { img: 'internproject-2/13_yeni_dokuman_olusturma_formu.png', title: 'Dinamik Doküman Formu', desc: 'Seçilen sınıfa göre runtime üretilen dinamik doğrulama formu.' }
          ]
        },
        {
          category: '⚙️ Vault Yapısı & Dinamik Şema Yönetimi (Kodsuz Şema)',
          items: [
            { img: 'internproject-2/15_admin_vault_yapisi_siniflar.png', title: 'Sınıflar & Akış Bağlantısı', desc: 'Doküman sınıfları ve varsayılan iş akışı eşleştirmeleri.' },
            { img: 'internproject-2/16_admin_vault_yapisi_nesne_turleri.png', title: 'Nesne Türleri', desc: 'Doküman, Sözleşme, Araç, Tedarikçi varlık tanımları.' },
            { img: 'internproject-2/17_admin_vault_yapisi_ozellik_tanimlari.png', title: 'Özellik Tanımları', desc: 'Metadata alanları, veri tipleri ve kural konfigürasyonları.' },
            { img: 'internproject-2/18_admin_vault_yapisi_deger_listeleri.png', title: 'Değer Listeleri (Lookup)', desc: 'Dinamik açılır liste ve hiyerarşik veri tanımları.' }
          ]
        },
        {
          category: '🛡️ Güvenlik, Materyalize ACL, İş Akışları & Denetim İzi',
          items: [
            { img: 'internproject-2/19_admin_izin_kurallari.png', title: 'İzin Kuralları Matrisi', desc: 'Rol, grup ve metadata kesişiminde dinamik izin kuralları.' },
            { img: 'internproject-2/20_admin_is_akislari_tasarimcisi.png', title: 'Görsel İş Akışı Tasarımcısı', desc: 'Durum makinesi adımları ve görsel akış tuvali.' },
            { img: 'internproject-2/21_admin_is_akislari_adim_detaylari.png', title: 'Akış Adım Detayları & SLA', desc: 'SLA süreleri, rol atamaları ve parola onay ayarları.' },
            { img: 'internproject-2/22_admin_denetim_izi.png', title: 'Sistem Denetim İzi (Audit Trail)', desc: 'Tüm kullanıcı aksiyonlarının değiştirilemez günlüğü.' },
            { img: 'internproject-2/23_admin_denetim_izi_detay_modali.png', title: 'Denetim İzi Detay Modalı', desc: 'Ham JSON payload, veri diff farkları ve istemci IP detayları.' },
            { img: 'internproject-2/24_admin_kullanici_yonetimi.png', title: 'Kullanıcı Yönetimi', desc: 'Hesap tanımları, global roller ve durum kontrolü.' },
            { img: 'internproject-2/25_admin_grup_yonetimi.png', title: 'Grup & Departman Yönetimi', desc: 'Organizasyonel birimler ve onay komiteleri yönetimi.' },
            { img: 'internproject-2/26_admin_acl_analitik_haritasi.png', title: 'ACL Analitik Haritası', desc: 'İzin kurallarının dağılımı ve Allow/Deny oranları.' },
            { img: 'internproject-2/27_admin_acl_tanilama_kullanici_sonucu.png', title: 'ACL Tanılama & Simülasyon', desc: 'Kullanıcı bazlı kural eşleşme ve yetki simülasyonu.' }
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
└─────────────────────────────────────────────────────────────┘`,
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
            { img: 'beyourself/1000115787.jpg', title: 'Açılış & Karşılama Ekranı', desc: 'Minimalist origami logo ve modern karşılama arayüzü.' },
            { img: 'beyourself/1000115788.jpg', title: 'Ana Sayfa & Günün Alıntısı Akışı', desc: 'Dinamik selamlama, arama çubuğu, günün sözü kartı ve kategori filtreleri.' },
            { img: 'beyourself/1000115785.jpg', title: 'Alıntı Detayı & Tam Ekran Medya', desc: 'Instagram Reels video/görsel oynatıcı ve tam ekran medya deneyimi.' },
            { img: 'beyourself/1000115786.jpg', title: 'Otomatik Caption & Metin Detayı', desc: 'Instagram\'dan otomatik çekilen açıklama metni ve detaylı alıntı içeriği.' }
          ]
        },
        {
          category: '🎬 Instagram Medya İndirme & Yeni Alıntı Ekleme',
          items: [
            { img: 'beyourself/1000115782.jpg', title: 'Instagram Link Girişi & Medya İndirici', desc: 'Reels ve post linkini yapıştırarak medyayı ve açıklamayı tek tıkla çekme.' },
            { img: 'beyourself/1000115783.jpg', title: 'Medya Seçimi, Yazar & Kategori Atama', desc: 'Cihaz galerisinden medya yükleme, yazar tanımlama ve kategori seçimi.' },
            { img: 'beyourself/1000115784.jpg', title: 'Rastgele Keşfet Çarkı (Zar At & Keşfet)', desc: 'Haptic dokunsal titreşimle çalışan, kategori filtreli rastgele ilham keşfi.' }
          ]
        },
        {
          category: '🗂️ Kategoriler & Favoriler Koleksiyonu',
          items: [
            { img: 'beyourself/1000115779.jpg', title: 'Kategoriler & Akıllı İkonlar', desc: 'Kategori kartları, özel ikonlar ve kategori bazlı alıntı sayaçları.' },
            { img: 'beyourself/1000115780.jpg', title: 'Dinamik Kategori Ekleme Modalı', desc: 'Kullanıcının dilediği gibi yeni kategori oluşturabilmesini sağlayan modal.' },
            { img: 'beyourself/1000115781.jpg', title: 'Favoriler Koleksiyonu', desc: 'Kullanıcının beğendiği ve saklamak istediği favori alıntılar listesi.' }
          ]
        },
        {
          category: '👤 Profil, Avatar, Motto & Bildirim Ayarları',
          items: [
            { img: 'beyourself/1000115775.jpg', title: 'Uygulama Ayarları & Tema Yönetimi', desc: 'Karanlık/aydınlık mod, bildirim anahtarı ve profil ayarlarına erişim menüsü.' },
            { img: 'beyourself/1000115776.jpg', title: 'Zamanlanmış Bildirim & Saat Ayarları', desc: 'Günlük bildirim sıklığı slider\'ı, başlangıç/bitiş saatleri ve test bildirimi.' },
            { img: 'beyourself/1000115777.jpg', title: 'Profil Ayarları & Hazır Avatar Seçici', desc: '16 adet hazır ilham avatarı veya galeriden profil fotoğrafı belirleme arayüzü.' },
            { img: 'beyourself/1000115778.jpg', title: 'Kişisel Yaşam Mottosu & Hitap Tercihi', desc: 'Kullanıcı mottosu, kişiselleştirilmiş bildirim hitap stili ve hesap istatistikleri.' }
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
            { img: 'notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164217.png', title: 'Boş Form & Giriş Parametreleri', desc: 'Geçme notu, vize/final yüzdeleri ve 3 farklı ödev etki oranlarının girilebildiği başlangıç formu.' },
            { img: 'notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164330.png', title: 'Dinamik Hesaplama & Hedef Final Notu', desc: 'Vize (%30: 60), Ödev 1-2 (%10: 80/70) ve Final (%50) verileriyle hesaplanan minimum 24,00 geçme notu.' },
            { img: 'notHesaplaamaUygulamasi/Ekran görüntüsü 2026-08-16 164404.png', title: 'Erken Başarı & "Zaten Geçmişsiniz!" Durumu', desc: 'Yüksek vize ve ödev performansı sonrası final sınavına girmeden ders barajının aşıldığını bildiren sonuç ekranı.' }
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
└─────────────────────────────────────────────────────────────┘`,
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
            { img: 'kart_oyunu/Ekran görüntüsü 2026-01-25 131812.png', title: '4x4 Oyun Tahtası & Başarılı "A" Eşleşmesi', desc: '16 kartlık matriste 2 adet "A" harfli kartın doğru eşleştirilerek açık kaldığı oyun anı.' },
            { img: 'kart_oyunu/Ekran görüntüsü 2026-01-25 131823.png', title: 'Çoklu Eşleşme Durumu & "A" - "C" Çiftleri', desc: 'Oyuncunun ardışık hamlelerle "A" ve "C" kart çiftlerini bularak tahtayı tamamlamaya yaklaştığı an.' }
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
            { img: 'twitter/1_kayit_ve_giris.png', title: 'Kullanıcı Kaydı & Oturum Açma Kontrolü', desc: 'E-mail doğrulama (regex), parola belirleme ve aktif kullanıcı oturum açma akışı.' },
            { img: 'twitter/2_tweet_paylaşımı.png', title: 'Tweet Oluşturma & Hashtag Etiketleme', desc: 'Tweet paylaşımı, dinamik hashtag ayrıştırma ve tüm tweet akışını listeleme.' },
            { img: 'twitter/3_takip_ve_begenı.png', title: 'Takip Sistemi & Beğeni Etkileşimi', desc: 'Kullanıcılar arası takip mekanizması, tweet beğenme ve etkileşim sayaçları.' },
            { img: 'twitter/4_oneri_motoru.png', title: 'Kişiselleştirilmiş Akış & Öneri Motoru', desc: 'Takip edilen kullanıcılar ve ilgili hashtag etiketlerine göre akıllı öneri algoritması.' },
            { img: 'twitter/5_sifre_ve_cikis.png', title: 'Şifre Sıfırlama & Güvenli Oturum Kapatma', desc: 'E-posta doğrulamalı şifre güncelleme, oturum sonlandırma ve güvenli çıkış.' }
          ]
        }
      ]
    }
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-id');
      const data = projectDetails[pid];
      if (!data) return;

      if (data.screenshots && data.screenshots.length > 0) {
        // Render Comprehensive Staj Projesi Modal
        modalContent.innerHTML = `
          <div class="pm-header">
            <span class="pm-tag">${data.tag}</span>
            <h2 class="pm-title">${data.title}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
              ${data.tech.map(t => `<span class="pill">${t}</span>`).join('')}
            </div>
          </div>

          <div class="pm-banner">
            <strong>📌 Proje Bağlamı &amp; Güvenlik:</strong> ${data.contextNotice}
          </div>

          <div class="pm-section">
            <h3 class="pm-section-title"><span class="icon">🎯</span> Proje Amacı &amp; Kullanıcı Rolleri</h3>
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
            <h3 class="pm-section-title"><span class="icon">🧠</span> Karşılaşılan Mühendislik Problemleri &amp; Çözümler</h3>
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
            <h3 class="pm-section-title"><span class="icon">🏗️</span> Sistem &amp; Katmanlı Mimari Yapısı</h3>
            <pre class="pm-arch-box"><code>${data.architectureDiagram}</code></pre>
          </div>

          <div class="pm-section">
            <h3 class="pm-section-title"><span class="icon">👩🏻‍💻</span> Projedeki Kişisel Katkılarım &amp; Sorumluluklarım</h3>
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
            <h3 class="pm-section-title"><span class="icon">📸</span> Proje Ekran Görüntüleri &amp; Arayüz Galerisi</h3>
            <p style="font-size: 0.88rem; color: #94a3b8; margin-bottom: 1.5rem;">
              Aşağıdaki ekran görüntülerine tıklayarak yüksek çözünürlüklü detaylı önizlemesini açabilirsiniz.
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
                          <span>🔍 İncele</span>
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

        // Attach image click events
        modalContent.querySelectorAll('.pm-screenshot-card').forEach(card => {
          card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            const imgTitle = card.getAttribute('data-title');
            openLightbox(imgSrc, imgTitle);
          });
        });

      } else {
        // Generic project render for other projects
        modalContent.innerHTML = `
          <div style="margin-bottom: 1.5rem;">
            <span style="color: var(--accent-cyan); font-family: var(--font-code); font-size: 0.85rem; font-weight: 700; text-transform: uppercase;">${data.subtitle}</span>
            <h2 style="font-size: 1.6rem; margin-top: 0.35rem; color: #fff;">${data.title}</h2>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #cbd5e1; margin-bottom: 0.4rem; font-size: 1.05rem;">🎯 Problem Tanımı</h4>
            <p style="font-size: 0.92rem; line-height: 1.6;">${data.problem}</p>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem; font-size: 1.05rem;">💡 Uygulanan Çözüm &amp; Mimari</h4>
            <p style="font-size: 0.92rem; line-height: 1.6;">${data.solution}</p>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #cbd5e1; margin-bottom: 0.6rem; font-size: 1.05rem;">⚡ Önemli Teknik Özellikler</h4>
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

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Copy Email
  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('E-posta adresi panoya kopyalandı! 📋');
      }).catch(() => {
        showToast('Kopyalama başarısız oldu, lütfen manuel kopyalayın.');
      });
    });
  }

  // Contact Form Submission
  // Handles local testing (file://) via mailto fallback & live web server (http/https) via FormSubmit
  if (form) {
    form.addEventListener('submit', (e) => {
      // Yerel dosya sisteminden (file://) açıldığında FormSubmit engelini aşmak için mailto yönlendirmesi
      if (window.location.protocol === 'file:') {
        e.preventDefault();
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const subject = document.getElementById('form-subject').value;
        const message = document.getElementById('form-message').value;

        showToast('Yerel test ortamındasınız! Mesaj e-posta uygulamanıza (Mail/Outlook) aktarılıyor... 📬');

        setTimeout(() => {
          const mailtoUrl = `mailto:zehratuncer.dev@gmail.com?subject=${encodeURIComponent('Portfolyo: ' + subject)}&body=${encodeURIComponent('Ad Soyad: ' + name + '\nE-Posta: ' + email + '\n\nMesaj:\n' + message)}`;
          window.location.href = mailtoUrl;
          form.reset();
        }, 1200);
      } else {
        // Canlı Web Sunucusu (GitHub Pages / Live Server / http / https)
        showToast('Mesajınız FormSubmit servisine iletiliyor... 🚀');
      }
    });
  }
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

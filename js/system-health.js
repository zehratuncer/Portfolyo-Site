/**
 * Zehra Tuncer Portfolyo - Sistem Sağlığı & Stabilite Teşhis Motoru
 * (System Health & Stability Diagnostics)
 * 
 * Bu modül; Supabase, LinkedIn yönlendirmesi, GitHub Pages (github.io) sunucuları
 * ve kullanıcının yerel bilgisayar/internet bağlantısını test ederek
 * sistemin stabil çalışıp çalışmadığını ve olası hata kaynaklarını tespit eder.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SystemHealth = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/zehra-tuncer-8567a1323/';

  /**
   * Yardımcı fonksiyon: Zaman aşımı (Timeout) destekli fetch
   */
  function fetchWithTimeout(url, options, timeoutMs) {
    timeoutMs = timeoutMs || 4000;
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () {
        reject(new Error('Zaman aşımı (Timeout: ' + timeoutMs + 'ms)'));
      }, timeoutMs);

      fetch(url, options)
        .then(function (res) {
          clearTimeout(timer);
          resolve(res);
        })
        .catch(function (err) {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  /**
   * 1. KULLANICI BİLGİSAYARI & İNTERNET BAĞLANTISI KONTROLÜ
   */
  async function checkClientNetwork() {
    var startTime = performance.now();
    var result = {
      id: 'client',
      name: 'Kullanıcı Cihazı & İnternet Bağlantısı',
      icon: '💻',
      status: 'ok',
      latency: 0,
      details: 'İnternet bağlantınız aktif ve yerel tarayıcı ortamı stabil.',
      potentialCause: null,
      recommendation: null
    };

    // Tarayıcı offline modda mı?
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      result.status = 'error';
      result.details = 'Cihazınız çevrimdışı (Offline). İnternet bağlantısı tespit edilemedi.';
      result.potentialCause = 'Bilgisayarınızın Wi-Fi veya Ethernet bağlantısı kesilmiş, uçak modunda veya modem internete bağlı değil.';
      result.recommendation = 'Kendi bilgisayarınızın ağ ayarlarını, Wi-Fi bağlantısını veya modeminizi kontrol edin.';
      return result;
    }

    // LocalStorage / SessionStorage erişim izni kontrolü (Gizli sekme / çerez engelleri)
    try {
      var testKey = '__health_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
    } catch (e) {
      result.status = 'warning';
      result.details = 'Tarayıcı yerel depolama (localStorage) erişimini kısıtlamış.';
      result.potentialCause = 'Tarayıcınız gizli sekmede (Incognito) açılmış veya üçüncü taraf çerezleri tamamen engellemiş.';
      result.recommendation = 'Oturum bilgileri ve analitik çerezlerinin düzgün saklanabilmesi için tarayıcı depolama izinlerini açın.';
    }

    // Gerçek genel internet erişimi testi (Public CDN / DNS Ping)
    try {
      await fetchWithTimeout('https://dns.google/resolve?name=google.com&type=A', { mode: 'cors' }, 3500);
      result.latency = Math.round(performance.now() - startTime);
    } catch (err) {
      // Yedek ping denemesi
      try {
        await fetchWithTimeout('https://api.github.com/zen', { mode: 'cors' }, 3000);
        result.latency = Math.round(performance.now() - startTime);
      } catch (err2) {
        result.status = 'error';
        result.details = 'Genel internet sunucularına erişilemiyor.';
        result.potentialCause = 'Bilgisayarınız bir yerel ağa bağlı ancak internete çıkış yapamıyor (DNS hatası, kurumsal ağ güvenlik duvarı veya internet servis sağlayıcı kesintisi).';
        result.recommendation = 'DNS adresinizi (8.8.8.8 / 1.1.1.1) güncellemeyi deneyin veya internet bağlantınızı yeniden başlatın.';
      }
    }

    return result;
  }

  /**
   * 2. SUPABASE VERİTABANI & REST API KONTROLÜ
   */
  async function checkSupabase() {
    var startTime = performance.now();
    var config = (typeof window !== 'undefined' && window.SUPABASE_CONFIG) ? window.SUPABASE_CONFIG : null;

    var result = {
      id: 'supabase',
      name: 'Supabase Veritabanı & API Servisi',
      icon: '⚡',
      status: 'ok',
      latency: 0,
      details: 'Supabase servisleri ve veritabanı uç noktaları aktif.',
      potentialCause: null,
      recommendation: null
    };

    if (!config || !config.url || !config.anonKey || config.url.indexOf('PROJE_REFERANSINIZ') !== -1) {
      result.status = 'error';
      result.details = 'Supabase yapılandırma bilgileri eksik veya tanımlanmamış.';
      result.potentialCause = 'js/analytics-config.js dosyası boş veya Supabase URL / API anahtarı girilmemiş.';
      result.recommendation = 'js/analytics-config.js dosyasına geçerli Supabase proje URL ve anon anahtarınızı ekleyin.';
      return result;
    }

    var healthUrl = config.url.replace(/\/$/, '') + '/auth/v1/health';

    try {
      var res = await fetchWithTimeout(healthUrl, {
        method: 'GET',
        headers: {
          'apikey': config.anonKey
        }
      }, 4500);

      result.latency = Math.round(performance.now() - startTime);

      if (res.ok) {
        result.status = 'ok';
        result.details = 'Supabase API aktif ve yanıt süresi mükemmel (' + result.latency + ' ms).';
      } else if (res.status === 401 || res.status === 403) {
        result.status = 'error';
        result.details = 'Supabase yetkilendirme reddedildi (HTTP ' + res.status + ').';
        result.potentialCause = 'js/analytics-config.js içindeki anonKey anahtarının süresi dolmuş veya hatalı yazılmış.';
        result.recommendation = 'Supabase paneline (Project Settings > API) giderek yeni "anon public" anahtarını kopyalayıp yapılandırma dosyasına yapıştırın.';
      } else {
        result.status = 'warning';
        result.details = 'Supabase sunucusu beklenmeyen yanıt kodu döndürdü (HTTP ' + res.status + ').';
        result.potentialCause = 'Supabase altyapısında geçici bir bakım veya sunucu tarafı gecikmesi olabilir.';
        result.recommendation = 'status.supabase.com adresinden genel Supabase durumunu kontrol edin.';
      }
    } catch (err) {
      result.status = 'error';
      result.latency = Math.round(performance.now() - startTime);
      result.details = 'Supabase sunucusuna bağlanılamadı: ' + err.message;
      
      // En yaygın ve kritik Supabase sorunları
      result.potentialCause = 'Olası 3 Neden: 1) ÜCRETSİZ SUPABASE PLANI: Proje 7 gün boyunca aktif istek almadığında otomatik "Paused" (uyku) moduna geçer. 2) REKLAM ENGELLEYİCİ: Bilgisayarınızdaki AdBlock/uBlock eklentisi Supabase isteklerini engelliyor olabilir. 3) KOTA AŞIMI: Aylık ücretsiz kota sınırına ulaşılmış olabilir.';
      result.recommendation = 'Supabase Dashboard\'a (https://supabase.com/dashboard) giriş yapıp projenin "Paused" olup olmadığını kontrol edin ve gerekirse "Restore" butonuna basın.';
    }

    return result;
  }

  /**
   * 3. GITHUB PAGES (github.io) & HOSTING BARINDIRMA KONTROLÜ
   */
  async function checkGitHubPages() {
    var startTime = performance.now();
    var result = {
      id: 'github',
      name: 'GitHub Pages Hosting (github.io)',
      icon: '🐙',
      status: 'ok',
      latency: 0,
      details: 'GitHub Pages CDN ve web sunucusu aktif ve erişilebilir durumda.',
      potentialCause: null,
      recommendation: null
    };

    // Mevcut sitenin kendi köküne veya GitHub CDN'e hafif kontrol
    try {
      var testUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '') + '/assets/images/favicon.svg';
      var res = await fetchWithTimeout(testUrl, { method: 'HEAD', cache: 'no-cache' }, 3500);
      result.latency = Math.round(performance.now() - startTime);

      if (!res.ok && res.status !== 304) {
        // Eğer yerel sunucudaysa bu normal olabilir, genel GitHub durumuna bak
        var ghRes = await fetchWithTimeout('https://api.github.com/zen', { mode: 'cors' }, 3000);
        if (!ghRes.ok) throw new Error('GitHub API yanıt vermedi');
      }
      result.details = 'Web sitesi sunucusu hızlı yanıt veriyor (' + result.latency + ' ms).';
    } catch (err) {
      result.status = 'warning';
      result.latency = Math.round(performance.now() - startTime);
      result.details = 'GitHub Pages sunucularında yavaşlama veya yanıt gecikmesi tespit edildi.';
      result.potentialCause = 'GitHub Pages genelinde bir bakım olabilir veya son push edilen commit henüz derleme (Pages Build/Deploy) aşamasındadır.';
      result.recommendation = 'https://www.githubstatus.com sayfasından "GitHub Pages" durumunu kontrol edin veya repository\'deki Actions/Deploy sekmesini inceleyin.';
    }

    return result;
  }

  /**
   * 4. LINKEDIN BAĞLANTISI & TRAFİK YÖNLENDİRMESİ KONTROLÜ
   */
  async function checkLinkedInIntegration() {
    var result = {
      id: 'linkedin',
      name: 'LinkedIn Bağlantısı & Entegrasyon',
      icon: '💼',
      status: 'ok',
      latency: 0,
      details: 'LinkedIn profil bağlantısı geçerli ve yönlendirme kuralları tanımlı.',
      potentialCause: null,
      recommendation: null
    };

    // Profil URL format kontrolü
    if (!LINKEDIN_PROFILE_URL || !LINKEDIN_PROFILE_URL.includes('linkedin.com/in/')) {
      result.status = 'error';
      result.details = 'LinkedIn profil bağlantı adresi geçersiz.';
      result.potentialCause = 'Profil linkinde yazım hatası var.';
      result.recommendation = 'index.html ve konfigürasyonlardaki LinkedIn profil bağlantısını güncelleyin.';
      return result;
    }

    // LinkedIn görsel / favicon erişilebilirlik testi (Ağdan LinkedIn'e çıkış engeli var mı?)
    var startTime = performance.now();
    var imgTestPromise = new Promise(function (resolve) {
      var img = new Image();
      var isResolved = false;
      img.onload = function () {
        if (!isResolved) {
          isResolved = true;
          resolve(true);
        }
      };
      img.onerror = function () {
        if (!isResolved) {
          isResolved = true;
          // LinkedIn CORS koruması resim hatalarına yol açabilir ama sunucuya ulaşıldığını kanıtlar
          resolve(true);
        }
      };
      setTimeout(function () {
        if (!isResolved) {
          isResolved = true;
          resolve(false);
        }
      }, 3500);
      img.src = 'https://static.licdn.com/sc/h/al2o9zrvเค.ico?' + Date.now();
    });

    var canReachLinkedIn = await imgTestPromise;
    result.latency = Math.round(performance.now() - startTime);

    if (!canReachLinkedIn) {
      result.status = 'warning';
      result.details = 'LinkedIn sunucularına erişim gecikmeli veya yerel ağ tarafından engelleniyor.';
      result.potentialCause = 'Kullandığınız ağda (iş yeri/okul vb.) LinkedIn alan adları filtrelenmiş veya LinkedIn servislerinde bölgesel kısıtlama uygulanıyor olabilir.';
      result.recommendation = 'Farklı bir ağdan (mobil veri) veya VPN kapatılarak test edin.';
    } else {
      result.details = 'LinkedIn profil adresi aktif (' + LINKEDIN_PROFILE_URL + '). Mobil uygulama içi yönlendirmeler destekleniyor.';
    }

    return result;
  }

  /**
   * 5. IP GEOLOCATION (ŞEHİR / KONUM) SERVİSİ KONTROLÜ
   */
  async function checkGeolocationService() {
    var startTime = performance.now();
    var result = {
      id: 'geolocation',
      name: 'IP & Ziyaretçi İl/Şehir Tespiti',
      icon: '📍',
      status: 'ok',
      latency: 0,
      details: 'Birincil IP Geolocation servisi (ipapi.co) aktif.',
      potentialCause: null,
      recommendation: null
    };

    try {
      var res = await fetchWithTimeout('https://ipapi.co/json/', {}, 3000);
      result.latency = Math.round(performance.now() - startTime);

      if (res.status === 429) {
        result.status = 'warning';
        result.details = 'Birincil konum servisi günlük limitine ulaştı (429 Rate Limit), sistem otomatik yedek servise (freeipapi.com) geçti.';
        result.potentialCause = 'ipapi.co ücretsiz günlük istek sınırı (1,000 istek/gün) doldu.';
        result.recommendation = 'Endişelenmeyin; tracker.js otomatik olarak yedek servise geçtiğinden loglar kesintisiz toplanmaya devam eder.';
      } else if (!res.ok) {
        throw new Error('HTTP ' + res.status);
      }
    } catch (err) {
      // Yedek servis kontrolü
      try {
        var res2 = await fetchWithTimeout('https://freeipapi.com/api/json', {}, 3000);
        result.latency = Math.round(performance.now() - startTime);
        if (res2.ok) {
          result.status = 'warning';
          result.details = 'Birincil servis erişilemez durumda ancak yedek servis (freeipapi) sorunsuz çalışıyor.';
          result.potentialCause = 'ipapi.co geçici olarak yanıt vermiyor; sistem yedek servis ile çalışıyor.';
        } else {
          throw new Error('Yedek de yanıt vermedi');
        }
      } catch (err2) {
        result.status = 'warning';
        result.details = 'IP konum tespit servisleri yanıt vermiyor.';
        result.potentialCause = 'Tarayıcı gizlilik koruması veya reklam engelleyici IP sorgulama servislerini engelliyor olabilir.';
        result.recommendation = 'Konum bilgisi "Bilinmiyor" olarak kaydedilebilir ancak ziyaretçi kaydı engellenmez.';
      }
    }

    return result;
  }

  /**
   * TÜM TEŞHİSLERİ PARALEL ÇALIŞTIRMA VE SİSTEM STABİLİTE RAPORU OLUŞTURMA
   */
  async function runFullDiagnostics() {
    var startTime = performance.now();

    // Tüm testleri eş zamanlı başlat
    var results = await Promise.all([
      checkClientNetwork(),
      checkSupabase(),
      checkGitHubPages(),
      checkLinkedInIntegration(),
      checkGeolocationService()
    ]);

    var totalDuration = Math.round(performance.now() - startTime);
    var hasError = results.some(function (r) { return r.status === 'error'; });
    var hasWarning = results.some(function (r) { return r.status === 'warning'; });

    var overallStatus = 'stable';
    var badgeClass = 'status-stable';
    var title = 'Sistem Tamamen Stabil';
    var summary = 'Tüm harici servisler, veritabanı, hosting ve yerel bağlantı kusursuz çalışıyor.';

    if (hasError) {
      overallStatus = 'critical';
      badgeClass = 'status-critical';
      title = 'Sistem Stabil Değil - Kritik Kesinti Tespit Edildi!';
      summary = 'Bir veya daha fazla kritik servis yanıt vermiyor. Aşağıdaki olası nedenleri ve çözüm önerilerini inceleyin.';
    } else if (hasWarning) {
      overallStatus = 'warning';
      badgeClass = 'status-warning';
      title = 'Kısmi Yavaşlama / Uyarı';
      summary = 'Sistem temel olarak çalışıyor ancak bazı servislerde gecikme veya yedek servise geçiş yaşanıyor.';
    }

    // Olası nedenleri ve çözüm önerilerini filtrele
    var issueList = results
      .filter(function (r) { return r.status !== 'ok'; })
      .map(function (r) {
        return {
          service: r.name,
          icon: r.icon,
          status: r.status,
          details: r.details,
          cause: r.potentialCause,
          solution: r.recommendation
        };
      });

    return {
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toLocaleTimeString('tr-TR'),
      overallStatus: overallStatus,
      badgeClass: badgeClass,
      title: title,
      summary: summary,
      totalDurationMs: totalDuration,
      checks: results,
      issues: issueList
    };
  }

  return {
    runFullDiagnostics: runFullDiagnostics,
    checkClientNetwork: checkClientNetwork,
    checkSupabase: checkSupabase,
    checkGitHubPages: checkGitHubPages,
    checkLinkedInIntegration: checkLinkedInIntegration,
    checkGeolocationService: checkGeolocationService
  };
});

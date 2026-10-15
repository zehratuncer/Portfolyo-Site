/**
 * Zehra Tuncer Portfolyo - Ziyaretçi Analitik Takipçisi (Tracker)
 * 
 * - Asenkron ve hafif çalışır, site performansını etkilemez.
 * - Sadece INSERT (yazma) yetkisine sahiptir, logları okuyamaz.
 * - İl/Şehir, platform (Instagram, LinkedIn vb.), cihaz ve zaman tespiti yapar.
 */
(function () {
  'use strict';

  // Kendi ziyaretlerinizi saymamak için: Tarayıcı konsolunda 'localStorage.setItem("disable_analytics", "true")' yapabilirsiniz.
  if (localStorage.getItem('disable_analytics') === 'true') {
    return;
  }

  // Oturum boyunca tek bir ziyaret kaydı üretmek için (Sayfa yenilemelerinde kirliliği önler)
  var SESSION_STORAGE_KEY = 'zt_visited_session';
  if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
    return;
  }

  // Platform & Kaynak Tespiti (Instagram, LinkedIn, X, Doğrudan vb.)
  function detectPlatform(referrer, ua, searchParams) {
    var ref = (referrer || '').toLowerCase();
    var userAgent = (ua || '').toLowerCase();

    // 1. URL UTM parametreleri önceliklidir
    var utmSource = searchParams.get('utm_source') || searchParams.get('ref') || searchParams.get('source');
    if (utmSource) {
      if (utmSource.indexOf('instagram') !== -1) return 'Instagram';
      if (utmSource.indexOf('linkedin') !== -1) return 'LinkedIn';
      if (utmSource.indexOf('twitter') !== -1 || utmSource.indexOf('x') !== -1) return 'Twitter / X';
      if (utmSource.indexOf('github') !== -1) return 'GitHub';
      if (utmSource.indexOf('whatsapp') !== -1) return 'WhatsApp';
      if (utmSource.indexOf('cv') !== -1) return 'CV / Özgeçmiş';
      return utmSource.charAt(0).toUpperCase() + utmSource.slice(1);
    }

    // 2. Uygulama İçi Tarayıcı Tespiti (In-App Browser)
    if (userAgent.indexOf('instagram') !== -1) return 'Instagram (Uygulama İçi)';
    if (userAgent.indexOf('linkedinapp') !== -1) return 'LinkedIn (Uygulama İçi)';
    if (userAgent.indexOf('twitter') !== -1) return 'Twitter / X (Uygulama İçi)';
    if (userAgent.indexOf('whatsapp') !== -1) return 'WhatsApp (Uygulama İçi)';
    if (userAgent.indexOf('fban') !== -1 || userAgent.indexOf('fbav') !== -1) return 'Facebook (Uygulama İçi)';

    // 3. Referrer (Yönlendiren Site) Tespiti
    if (ref.indexOf('instagram.com') !== -1 || ref.indexOf('l.instagram.com') !== -1) return 'Instagram';
    if (ref.indexOf('linkedin.com') !== -1 || ref.indexOf('lnkd.in') !== -1) return 'LinkedIn';
    if (ref.indexOf('t.co') !== -1 || ref.indexOf('twitter.com') !== -1 || ref.indexOf('x.com') !== -1) return 'Twitter / X';
    if (ref.indexOf('github.com') !== -1) return 'GitHub';
    if (ref.indexOf('whatsapp') !== -1) return 'WhatsApp';
    if (ref.indexOf('telegram') !== -1 || ref.indexOf('t.me') !== -1) return 'Telegram';
    if (ref.indexOf('google.') !== -1) return 'Google Arama';
    if (ref.indexOf('yandex.') !== -1 || ref.indexOf('bing.') !== -1 || ref.indexOf('duckduckgo.') !== -1) return 'Arama Motoru';

    if (!ref || ref.indexOf(window.location.hostname) !== -1) {
      return 'Doğrudan Bağlantı / DM';
    }

    try {
      var urlObj = new URL(ref);
      return urlObj.hostname.replace('www.', '');
    } catch (e) {
      return 'Harici Web Sitesi';
    }
  }

  // Cihaz ve İşletim Sistemi Tespiti
  function detectDeviceAndOS(ua) {
    var userAgent = ua || navigator.userAgent;
    var os = 'Bilinmiyor';
    var deviceType = 'Masaüstü';

    if (/iPad|Tablet/i.test(userAgent)) {
      deviceType = 'Tablet';
    } else if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) {
      deviceType = 'Mobil';
    }

    if (/iPhone/i.test(userAgent)) os = 'iOS (iPhone)';
    else if (/iPad/i.test(userAgent)) os = 'iPadOS';
    else if (/Android/i.test(userAgent)) os = 'Android';
    else if (/Windows NT 10.0/i.test(userAgent)) os = 'Windows 10/11';
    else if (/Windows/i.test(userAgent)) os = 'Windows';
    else if (/Macintosh|Mac OS X/i.test(userAgent)) os = 'macOS';
    else if (/Linux/i.test(userAgent)) os = 'Linux';

    // Tarayıcı tespiti
    var browser = 'Diğer';
    if (/Edg\//i.test(userAgent)) browser = 'Microsoft Edge';
    else if (/Chrome\//i.test(userAgent) && !/Edg\//i.test(userAgent)) browser = 'Chrome';
    else if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent)) browser = 'Safari';
    else if (/Firefox\//i.test(userAgent)) browser = 'Firefox';

    return { os: os, deviceType: deviceType, browser: browser };
  }

  // Şehir / Konum Bilgisini Al (IP Geolocation)
  async function fetchLocationData() {
    // 1. ipapi.co denemesi (Hızlı ve Türkçe il isimleri içerir)
    try {
      var res = await fetch('https://ipapi.co/json/', { timeout: 3500 });
      if (res.ok) {
        var data = await res.json();
        return {
          city: data.city || 'Bilinmiyor',
          region: data.region || 'Bilinmiyor',
          country: data.country_name || 'Türkiye',
          countryCode: data.country_code || 'TR'
        };
      }
    } catch (err) {
      // Birincil servis başarısız olursa yedeğe geçer
    }

    // 2. Yedek Servis: freeipapi.com
    try {
      var res2 = await fetch('https://freeipapi.com/api/json');
      if (res2.ok) {
        var data2 = await res2.json();
        return {
          city: data2.cityName || 'Bilinmiyor',
          region: data2.regionName || 'Bilinmiyor',
          country: data2.countryName || 'Türkiye',
          countryCode: data2.countryCode || 'TR'
        };
      }
    } catch (err2) {
      // İkisi de başarısız olursa
    }

    return { city: 'Bilinmiyor', region: 'Bilinmiyor', country: 'Türkiye', countryCode: 'TR' };
  }

  // Ana Takip Fonksiyonu
  async function trackVisitor() {
    var config = window.SUPABASE_CONFIG;
    if (!config || !config.url || !config.anonKey || config.url.indexOf('PROJE_REFERANSINIZ') !== -1) {
      // Henüz Supabase bilgileri girilmemişse sessizce durur
      return;
    }

    try {
      var params = new URLSearchParams(window.location.search);
      var platform = detectPlatform(document.referrer, navigator.userAgent, params);
      var deviceInfo = detectDeviceAndOS(navigator.userAgent);
      var locationInfo = await fetchLocationData();

      var sessionId = 'sess_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

      var payload = {
        city: locationInfo.city,
        region: locationInfo.region,
        country: locationInfo.country,
        country_code: locationInfo.countryCode,
        referrer: document.referrer || 'Doğrudan',
        platform: platform,
        device_type: deviceInfo.deviceType,
        os: deviceInfo.os,
        browser: deviceInfo.browser,
        screen_resolution: window.screen.width + 'x' + window.screen.height,
        path: window.location.pathname + window.location.hash,
        session_id: sessionId
      };

      // Supabase REST API'ye direkt güvenli INSERT (fetch ile harici kütüphane gerektirmez)
      var endpoint = config.url.replace(/\/$/, '') + '/rest/v1/site_analytics';

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apikey': config.anonKey,
          'Authorization': 'Bearer ' + config.anonKey,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      // Oturumu işaretle
      sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    } catch (error) {
      // Sessiz hata yönetimi (kullanıcıya hata yansıtılmaz)
    }
  }

  // Sayfa yüklendikten sonra arka planda çalıştır
  if (document.readyState === 'complete') {
    setTimeout(trackVisitor, 1200);
  } else {
    window.addEventListener('load', function () {
      setTimeout(trackVisitor, 1200);
    });
  }
})();

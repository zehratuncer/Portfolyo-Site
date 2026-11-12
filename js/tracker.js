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

  // Türkiye 81 İl Plaka Kodları Haritası (01 - 81)
  var TR_PROVINCES = {
    '01': 'Adana', '02': 'Adıyaman', '03': 'Afyonkarahisar', '04': 'Ağrı', '05': 'Amasya',
    '06': 'Ankara', '07': 'Antalya', '08': 'Artvin', '09': 'Aydın', '10': 'Balıkesir',
    '11': 'Bilecik', '12': 'Bingöl', '13': 'Bitlis', '14': 'Bolu', '15': 'Burdur',
    '16': 'Bursa', '17': 'Çanakkale', '18': 'Çankırı', '19': 'Çorum', '20': 'Denizli',
    '21': 'Diyarbakır', '22': 'Edirne', '23': 'Elazığ', '24': 'Erzincan', '25': 'Erzurum',
    '26': 'Eskişehir', '27': 'Gaziantep', '28': 'Giresun', '29': 'Gümüşhane', '30': 'Hakkari',
    '31': 'Hatay', '32': 'Isparta', '33': 'Mersin', '34': 'İstanbul', '35': 'İzmir',
    '36': 'Kars', '37': 'Kastamonu', '38': 'Kayseri', '39': 'Kırklareli', '40': 'Kırşehir',
    '41': 'Kocaeli', '42': 'Konya', '43': 'Kütahya', '44': 'Malatya', '45': 'Manisa',
    '46': 'Kahramanmaraş', '47': 'Mardin', '48': 'Muğla', '49': 'Muş', '50': 'Nevşehir',
    '51': 'Niğde', '52': 'Ordu', '53': 'Rize', '54': 'Sakarya', '55': 'Samsun',
    '56': 'Siirt', '57': 'Sinop', '58': 'Sivas', '59': 'Tekirdağ', '60': 'Tokat',
    '61': 'Trabzon', '62': 'Tunceli', '63': 'Şanlıurfa', '64': 'Uşak', '65': 'Van',
    '66': 'Yozgat', '67': 'Zonguldak', '68': 'Aksaray', '69': 'Bayburt', '70': 'Karaman',
    '71': 'Kırıkkale', '72': 'Batman', '73': 'Şırnak', '74': 'Bartın', '75': 'Ardahan',
    '76': 'Iğdır', '77': 'Yalova', '78': 'Karabük', '79': 'Kilis', '80': 'Osmaniye',
    '81': 'Düzce'
  };

  var TR_ALIASES = {
    'icel': 'Mersin', 'içel': 'Mersin',
    'afyon': 'Afyonkarahisar',
    'sanliurfa': 'Şanlıurfa', 'urfa': 'Şanlıurfa',
    'maras': 'Kahramanmaraş', 'kahramanmaras': 'Kahramanmaraş',
    'antep': 'Gaziantep',
    'elaziz': 'Elazığ'
  };

  function toAscii(str) {
    if (!str) return '';
    return String(str).toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
  }

  // Türkiye için İl Çözümleyici (Plaka kodu, bölge ismi, ilçe analizi)
  function resolveTurkeyProvince(rawCity, rawRegion, rawRegionCode) {
    // 1. Plaka Kodu Kontrolü (Örn: "08", "69", "TR-08")
    if (rawRegionCode) {
      var code = String(rawRegionCode).replace(/^TR-?/i, '').trim();
      if (code.length === 1) code = '0' + code;
      if (TR_PROVINCES[code]) {
        return TR_PROVINCES[code];
      }
    }

    // 2. Metin temizleme (Province, İli, Ili gibi ekleri kaldır)
    function clean(s) {
      if (!s) return '';
      return String(s)
        .replace(/\b(Province|İli|Ili|Bölgesi|Merkez|Prov\.)\b/gi, '')
        .trim();
    }

    var cleanRegion = clean(rawRegion);
    var cleanCity = clean(rawCity);

    // 3. Bölge ve Şehir adaylarını 81 il ile eşleştir
    var candidates = [cleanRegion, cleanCity, rawRegion, rawCity];
    for (var i = 0; i < candidates.length; i++) {
      var cand = candidates[i];
      if (!cand || cand === 'Bilinmiyor' || cand.length < 3) continue;

      var candAscii = toAscii(cand.replace(/['".,]/g, '').trim());

      if (TR_ALIASES[candAscii]) {
        return TR_ALIASES[candAscii];
      }

      for (var plate in TR_PROVINCES) {
        var prov = TR_PROVINCES[plate];
        var provAscii = toAscii(prov);

        if (candAscii === provAscii ||
            candAscii.indexOf(provAscii) !== -1 ||
            provAscii.indexOf(candAscii) !== -1) {
          return prov;
        }
      }
    }

    return null;
  }

  // Fetch with timeout yardımcısı
  async function fetchWithTimeout(url, timeoutMs) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, timeoutMs || 3000);
    try {
      var response = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      return response;
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  }

  // Şehir / Konum Bilgisini Al (IP Geolocation - Çoklu Zincir & 81 İl Desteği)
  async function fetchLocationData() {
    var raw = null;

    // 1. Birincil Servis: ipwho.is (Hızlı, HTTPS, Türkçe karakter ve detaylı bölge/plaka desteği)
    try {
      var res1 = await fetchWithTimeout('https://ipwho.is/', 3000);
      if (res1.ok) {
        var d1 = await res1.json();
        if (d1 && d1.success !== false) {
          raw = {
            city: d1.city,
            region: d1.region,
            regionCode: d1.region_code,
            country: d1.country || 'Türkiye',
            countryCode: d1.country_code || 'TR'
          };
        }
      }
    } catch (e1) {}

    // 2. Yedek Servis: ipapi.co (İl plaka kodu ve ilçe/bölge verisi)
    if (!raw) {
      try {
        var res2 = await fetchWithTimeout('https://ipapi.co/json/', 3000);
        if (res2.ok) {
          var d2 = await res2.json();
          raw = {
            city: d2.city,
            region: d2.region,
            regionCode: d2.region_code,
            country: d2.country_name || 'Türkiye',
            countryCode: d2.country_code || 'TR'
          };
        }
      } catch (e2) {}
    }

    // 3. İkinci Yedek Servis: freeipapi.com
    if (!raw) {
      try {
        var res3 = await fetchWithTimeout('https://freeipapi.com/api/json', 3000);
        if (res3.ok) {
          var d3 = await res3.json();
          raw = {
            city: d3.cityName,
            region: d3.regionName,
            regionCode: d3.regionCode,
            country: d3.countryName || 'Türkiye',
            countryCode: d3.countryCode || 'TR'
          };
        }
      } catch (e3) {}
    }

    // Hiçbir servis yanıt vermediyse
    if (!raw) {
      return { city: 'Bilinmiyor', region: 'Bilinmiyor', country: 'Türkiye', countryCode: 'TR' };
    }

    var countryCode = (raw.countryCode || 'TR').toUpperCase();
    var finalCity = raw.city;
    var finalRegion = raw.region;

    // Türkiye istekleri için 81 İl Çözümlemesi (Artvin, Bayburt vb. kesin tespiti)
    if (countryCode === 'TR' || raw.country === 'Turkey' || raw.country === 'Türkiye') {
      var resolvedProv = resolveTurkeyProvince(raw.city, raw.region, raw.regionCode);
      if (resolvedProv) {
        finalCity = resolvedProv;
        finalRegion = raw.city && raw.city !== resolvedProv ? raw.city : resolvedProv;
      }
    }

    return {
      city: finalCity || 'Bilinmiyor',
      region: finalRegion || finalCity || 'Bilinmiyor',
      country: raw.country || 'Türkiye',
      countryCode: countryCode
    };
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

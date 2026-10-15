# 🚀 Ziyaretçi Takip & Güvenli Log Sistemi Kurulum Rehberi

Bu sistem sayesinde portfolyonuza gelen ziyaretçilerin:
- **Hangi uygulamadan/siteden geldiği** (Instagram, LinkedIn, X, WhatsApp, Google veya Doğrudan bağlantı),
- **Hangi saatte ve hangi ilden girdiği** (İstanbul, Ankara, İzmir vb. + Ülke),
- **Cihaz ve işletim sistemi** (iPhone, Android, Windows, Mac)

bilgileri güvenli bir şekilde kaydedilir. **Bu veriler `index.html` içinde asla görüntülenemez.** Yalnızca sizin şifrenizle giriş yapabileceğiniz `admin.html` panelinden izlenebilir.

---

## ⏱️ 3 Adımda Kolay Kurulum (Toplam 3-4 Dakika)

### 1. Adım: Supabase'de Ücretsiz Proje Açın
1. [supabase.com](https://supabase.com) adresine gidin ve ücretsiz bir hesap açın (GitHub ile tek tıkla giriş yapabilirsiniz).
2. **"New Project"** butonuna tıklayın:
   - **Name:** `Portfolyo Analytics` (veya istediğiniz bir isim)
   - **Database Password:** Güçlü bir şifre belirleyin ve not edin.
   - **Region:** `Frankfurt (eu-central-1)` (Türkiye'ye en yakın ve en hızlı bölgedir).
3. **"Create new project"** butonuna basıp projenin açılmasını bekleyin (~1-2 dakika).

---

### 2. Adım: Veritabanı Tablosunu ve Güvenlik Kurallarını Oluşturun
1. Supabase panelinde sol menüden **"SQL Editor"** simgesine tıklayın.
2. Projenizdeki [`docs/supabase_setup.sql`](supabase_setup.sql) dosyasının içeriğini kopyalayın ve SQL Editor ekranına yapıştırın.
3. Sağ alttaki yeşil **"Run"** butonuna basın.
   > **Güvenlik Notu:** Bu script veritabanınızda **Row Level Security (RLS)** kurallarını otomatik aktif eder. Böylece dışarıdaki anonim ziyaretçiler yalnızca kendi tekil ziyaretini ekleyebilir (`INSERT`); geçmiş hiçbir logu veya başkalarının verilerini **ASLA OKUYAMAZ** (`SELECT` engellenir).

---

### 3. Adım: Yönetici (Admin) Hesabınızı Oluşturun
Logları sadece siz göreceğiniz için kendinize bir kullanıcı hesabı açmanız gerekir:
1. Supabase sol menüsünden **"Authentication"** (Kullanıcılar simgesi) -> **"Users"** sekmesine gelin.
2. **"Add user"** -> **"Create user"** seçeneğine tıklayın:
   - **User Email:** Kendi e-posta adresiniz (Örn: `zehra@ornek.com`)
   - **User Password:** Giriş yapmak istediğiniz şifre
   - **Auto Confirm User?** seçeneğini **işaretli (açık)** bırakın (böylece e-posta onay linki beklemeden anında giriş yapabilirsiniz).
3. **"Create user"** butonuna basarak kaydedin.

---

### 4. Adım: API Bilgilerini Dosyaya Yazın
1. Supabase sol menüsünün en altındaki **"Project Settings"** (Dişli çark) -> **"API"** sekmesine tıklayın.
2. Buradaki iki bilgiyi kopyalayın:
   - **Project URL** (Örn: `https://abcdefghijklm.supabase.co`)
   - **Project API Keys** altındaki **`anon` `public`** anahtarı.
3. Projenizdeki [`js/analytics-config.js`](../js/analytics-config.js) dosyasını açıp bu bilgileri yapıştırın:

```javascript
window.SUPABASE_CONFIG = {
  url: "https://abcdefghijklm.supabase.co", // Kendi Supabase URL'niz
  anonKey: "sb_publishable_xxxxxxx..." // Kendi Supabase Anon Key'iniz
};
```

---

## 🎯 Test Etme & Kullanım

1. **Ziyaret Testi:**
   - Tarayıcınızda [`index.html`](../index.html) dosyasını açın (veya siteniz yayındaysa normal ziyaret edin).
   - Sayfa açıldığında arka plandaki `js/tracker.js` otomatik olarak ziyaretinizi Supabase'e iletecektir.

2. **Paneli Açma:**
   - Tarayıcınızda [`admin.html`](../admin.html) dosyasını açın.
   - 3. adımda oluşturduğunuz **E-posta** ve **Şifre** ile giriş yapın.
   - Karşınıza anlık istatistik kartları, illere göre dağılım grafiği ve detaylı log tablosu gelecektir!

3. **Önemli İpucu (Kendi Ziyaretlerinizi Saymama):**
   - Admin panelinde sağ üstteki **"🛡️ Beni Sayma: Açık"** butonuna basarak kendi tarayıcınızda gezinirken sayaçların artmasını engelleyebilirsiniz.

-- ==============================================================================
-- Zehra Tuncer Portfolyo - Ziyaretçi Analitik & Güvenli Log Sistemi
-- Supabase SQL Kurulum Betiği
-- ==============================================================================

-- 1. Ziyaretçi Log Tablosunu Oluştur
CREATE TABLE IF NOT EXISTS public.site_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    city TEXT DEFAULT 'Bilinmiyor',
    region TEXT DEFAULT 'Bilinmiyor',
    country TEXT DEFAULT 'Türkiye',
    country_code TEXT DEFAULT 'TR',
    referrer TEXT DEFAULT 'Doğrudan',
    platform TEXT DEFAULT 'Web',
    device_type TEXT DEFAULT 'Masaüstü',
    os TEXT DEFAULT 'Bilinmiyor',
    browser TEXT DEFAULT 'Bilinmiyor',
    screen_resolution TEXT DEFAULT '',
    path TEXT DEFAULT '/',
    session_id TEXT DEFAULT ''
);

-- Hızlı sorgular için indeksler
CREATE INDEX IF NOT EXISTS idx_site_analytics_created_at ON public.site_analytics (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_analytics_platform ON public.site_analytics (platform);
CREATE INDEX IF NOT EXISTS idx_site_analytics_city ON public.site_analytics (city);

-- 2. Row Level Security (RLS - Satır Düzeyi Güvenlik) Aktif Et
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- 3. GÜVENLİK POLİTİKALARI (CRITICAL SECURITY RULES)

-- Kural A: Dışarıdaki ziyaretçiler (anon key) SADECE yeni log ekleyebilir (INSERT).
-- Asla geçmiş logları, başkalarının verilerini OKUYAMAZ (SELECT İZNİ YOKTUR)!
DROP POLICY IF EXISTS "Anonim_Kullanici_Sadece_Log_Ekleyebilir" ON public.site_analytics;
CREATE POLICY "Anonim_Kullanici_Sadece_Log_Ekleyebilir"
ON public.site_analytics
FOR INSERT
TO anon
WITH CHECK (true);

-- Kural B: Sadece oturum açmış YETKİLİ ADMİN (authenticated) tüm logları okuyabilir ve silebilir.
DROP POLICY IF EXISTS "Sadece_Admin_Loglari_Okuyabilir" ON public.site_analytics;
CREATE POLICY "Sadece_Admin_Loglari_Okuyabilir"
ON public.site_analytics
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. Bilgilendirme / Başarılı Kurulum
COMMENT ON TABLE public.site_analytics IS 'Portfolyo sitesi güvenli ziyaretçi takip tablosu (RLS ile sadece admin okuyabilir)';

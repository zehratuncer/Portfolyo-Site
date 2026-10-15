/**
 * Supabase Bağlantı Yapılandırması
 * 
 * Bu bilgileri https://supabase.com adresindeki projenizin:
 * "Project Settings" -> "API" sekmesinden alabilirsiniz.
 * 
 * NOT: "anon public" anahtarını buraya yazmak tamamen güvenlidir çünkü
 * veritabanındaki RLS (Row Level Security) kuralımız sayesinde bu anahtar
 * SADECE yeni ziyaretçi ekleyebilir (INSERT), geçmiş logları ASLA okuyamaz!
 */
window.SUPABASE_CONFIG = {
  url: "https://rghgvjgiqbintsvirwht.supabase.co", // Örnek: https://xyzcompany.supabase.co
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnaGd2amdpcWJpbnRzdmlyd2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNTM0MjgsImV4cCI6MjEwNzYyOTQyOH0.bSNAcyAXPjPj8t4pCgbNAKMo_KrKI0mD7jQ8I6pvRUY" // 'sb_publishable_...' veya JWT anon key
};

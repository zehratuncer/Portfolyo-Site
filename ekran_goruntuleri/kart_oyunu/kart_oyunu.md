# VeriYapilari_ProjeOdevi

🎴 Kart Eşleştirme Oyunu (SFML – C++)

Bu proje, C++ ve SFML kütüphanesi kullanılarak geliştirilmiş bir kart eşleştirme oyunudur.
Oyunun amacı, kapalı kartları açarak aynı harfe sahip kart çiftlerini bulmaktır.

Proje, veri yapıları dersi kapsamında geliştirilmiştir ve temel programlama kavramlarını pekiştirmeyi amaçlar.

🎯 Projenin Amacı
Veri yapılarının (struct, queue, map, array) gerçek bir projede nasıl kullanılacağını göstermek
Grafik arayüzlü (GUI) bir oyun geliştirmek
Kullanıcı etkileşimini yönetmek
Algoritmik düşünme becerisini geliştirmek

🧩 Kullanılan Veri Yapıları
Veri Yapısı	Kullanım Amacı
struct	Kart nesnesini tanımlamak
2D Array	Oyun tahtasını temsil etmek
queue	Seçilen kartları sırayla kontrol etmek
map	Harfler ile görselleri eşleştirmek

🖼️ Oyun Mantığı
Oyun alanı 4x4 = 16 karttan oluşur
8 farklı harf, her biri 2 kez bulunur
Kartlar başlangıçta kapalıdır
Oyuncu iki kart seçer
Eğer kartlar eşleşirse açık kalır
Eşleşmezse tekrar kapanır

🛠️ Kullanılan Teknolojiler
C++
SFML (Simple and Fast Multimedia Library)
Visual Studio

## 🧰 Gereksinimler

- **Windows**
- **Visual Studio 2019 veya 2022**
- Visual Studio kurulurken:
  - ✅ *Desktop development with C++* seçili olmalıdır
- **SFML 2.x**

---

## 📥 SFML Kurulumu

1. SFML’nin resmi sitesine gidin:  
   👉 https://www.sfml-dev.org/download.php

2. **Windows → Visual C++** sürümünü indirin  
   (Visual Studio sürümünüze uygun olanı seçin)

3. Zip dosyasını çıkarın  
   Örnek konum:
   ```text
   C:\SFML
⚙️ Visual Studio Proje Ayarları
1️⃣ Projeyi Açma
GitHub’dan projeyi clone edin

.sln dosyasını Visual Studio ile açın

2️⃣ SFML Include ve Lib Ayarları
Visual Studio’da:

Project → Properties

📌 C/C++ → General
Additional Include Directories:
C:\SFML\include
📌 Linker → General
Additional Library Directories:
C:\SFML\lib
3️⃣ Linker Input Ayarları
📌 Linker → Input → Additional Dependencies
Debug modu için:

sfml-graphics-d.lib
sfml-window-d.lib
sfml-system-d.lib
Release modu için:

sfml-graphics.lib
sfml-window.lib
sfml-system.lib
▶️ Projeyi Çalıştırma
🔹 Debug Modu
Configuration: Debug

Platform: x64

Build:

Ctrl + Shift + B
Çalıştır:

Ctrl + F5
🔹 Release Modu (Önerilen)
Configuration: Release

Platform: x64

Tekrar build alın

📦 DLL Dosyaları (Çok Önemli)
Uygulamanın çalışabilmesi için SFML .dll dosyaları .exe ile aynı klasörde olmalıdır.

Debug için:
sfml-graphics-d-2.dll
sfml-window-d-2.dll
sfml-system-d-2.dll
Release için:
sfml-graphics-2.dll
sfml-window-2.dll
sfml-system-2.dll
Bu dosyaları:

C:\SFML\bin
klasöründen alıp, projenin çalıştırılabilir dosyasının bulunduğu klasöre kopyalayın.

❗ Olası Hatalar
❌ “sfml-graphics-d-2.dll bulunamadı”
➡ Gerekli DLL dosyaları .exe ile aynı klasörde değildir.

❌ Build hatası
➡ SFML include / lib yolları yanlış ayarlanmıştır.

📌 Notlar
.dll dosyaları GitHub reposuna eklenmemiştir.

Proje kaynak kodu odaklıdır, bağımlılıklar kullanıcı tarafından sağlanmalıdır.

⭐ Not
Bu proje eğitim amaçlı hazırlanmıştır.

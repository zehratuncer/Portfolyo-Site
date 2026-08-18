# TweetUygulamasi
Java ile geliştirilmiş basit bir kullanıcı-tweet yönetim sistemi.

# Mini Twitter Uygulaması 📢

Bu proje, Java ile geliştirilen terminal tabanlı bir mini sosyal medya uygulamasıdır. Kullanıcılar kayıt olabilir, giriş yapabilir, tweet atabilir, tüm tweetleri görebilir ve şifrelerini sıfırlayabilir.

Bu projeyi Java becerilerimi geliştirmek amacıyla geliştirdim.

---

## 🚀 Özellikler

- ✅ Kullanıcı Kaydı
- ✅ Giriş & Çıkış sistemi
- ✅ Tweet paylaşma
- ✅ Tweet eğenme
- ✅ Tüm tweetleri listeleme
- ✅ Email doğrulama
- ✅ Kullanıcı takip etme
- ✅ Öneri tweetleri gösterme (Öneri Motoru)
- ✅ Şifre korumalı giriş
- ✅ Şifre sıfırlama (konsol üzerinden)
- ✅ Aktif kullanıcı kontrolü

---

## 🛠️ Kullanılan Teknolojiler

- Java 17
- OOP (Nesne yönelimli programlama)
- IntelliJ IDEA
- Konsol arayüzü

---

## 🔧 Kurulum ve Çalıştırma

1. Reponun bir kopyasını klonlayın:
   ```bash
   https://github.com/zehratuncer/TweetUygulamasi.git
2. IntelliJ IDEA veya benzeri bir Java IDE ile açın.

3. Main.java dosyasını çalıştırarak uygulamayı başlatın.

## 👩‍💻 Kullanım

- Uygulama başlatıldığında kullanıcıdan giriş veya kayıt olması istenir.
- Kayıt olurken geçerli bir e-mail adresi (içinde @ olmalı) girilmelidir.
- Giriş yaptıktan sonra tweet atabilir, tüm tweetleri görebilir ya da çıkış yapabilirsiniz.
- Şifresini unutan kullanıcılar “Şifremi unuttum” menüsünden yeni şifre belirleyebilir.   


## 🐞 Karşılaşılan Hatalar & Çözümleri

1. 🔁 Giriş yapılmadan tweet atılabiliyordu
Sorun: Uygulamada oturum açmadan tweet atılmasına izin veriliyordu.
Çözüm: Tweet atma kısmına (aktifKullanici != null) kontrolü eklendi.

2. 👯‍♀️ İkinci kullanıcı kaydolduğunda hala birinci kullanıcının tweetleri görünüyordu
Sorun: Kullanıcılar değişmesine rağmen aktif oturum güncellenmiyordu.
Çözüm: Her kayıt/giriş işleminden sonra (aktifKullanici) değişkeni güncellendi.

3. 📩 Geçersiz e-mail adresleri ile kayıt olunabiliyordu
Sorun: @ sembolü olmayan e-mail adresleri kabul ediliyordu.
Çözüm: Regex benzeri bir kontrol eklenerek email içerisinde @ kontrolü zorunlu hale getirildi.

4. 🔓 Kayıtlı kullanıcılar çıkış yapmadan yeni kullanıcı oluşturabiliyordu
Sorun: Aktif oturum varken yeni kayıt yapılabiliyordu.
Çözüm: “Kayıt ol” menüsüne (aktifKullanici != null) kontrolü ve kullanıcıya “önce çıkış yapmalısınız” uyarısı eklendi.

## 🔐 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır. Dilediğiniz gibi kullanabilir, geliştirebilir ve paylaşabilirsiniz. Tek şart: lütfen kaynak gösterin 😊
MIT License

## 💌 İletişim
Ben Zehra TUNCER
📧 zehrat16zehrat16@gmail.com
💼 1. Sınıf Bilgisayar Mühendisliği Öğrencisi



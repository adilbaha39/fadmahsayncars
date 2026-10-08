"use client";

import { useState, useEffect } from "react";
import { cars, agencies } from "@/data/cars";
import { translations, Locale, TranslationKey } from "@/data/translations";

export default function HomePage() {
  const [lang, setLang] = useState<Locale>("ar");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    vehicle: "",
    pickup: "",
    returnLoc: "",
    pickupDate: "",
    returnDate: "",
    notes: "",
  });

  const t = (key: TranslationKey) => translations[lang][key] || key;

  useEffect(() => {
    const saved = localStorage.getItem("preferredLang") as Locale | null;
    if (saved && ["fr", "ar", "en"].includes(saved)) setLang(saved);
    else {
      const browser = navigator.language.toLowerCase();
      if (browser.startsWith("fr")) setLang("fr");
      else if (browser.startsWith("en")) setLang("en");
      else setLang("ar");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");
    localStorage.setItem("preferredLang", lang);
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openBooking = (carName = "") => {
    setForm((f) => ({ ...f, vehicle: carName }));
    setBookingOpen(true);
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.pickup || !form.pickupDate || !form.returnDate) {
      alert(lang === "ar" ? "المرجو ملء جميع الحقول المطلوبة" : lang === "en" ? "Please fill all required fields" : "Veuillez remplir tous les champs obligatoires");
      return;
    }
    let msg = "";
    if (lang === "ar") {
      msg = `🚗 *حجز جديد - فضمة احسين كارز*\n\n👤 *الاسم:* ${form.fullName}\n📞 *الهاتف:* ${form.phone}\n`;
      if (form.vehicle) msg += `🚘 *المركبة:* ${form.vehicle}\n`;
      msg += `📍 *مكان الاستلام:* ${form.pickup}\n`;
      if (form.returnLoc) msg += `🏁 *مكان التسليم:* ${form.returnLoc}\n`;
      msg += `📅 *تاريخ الاستلام:* ${form.pickupDate}\n📅 *تاريخ التسليم:* ${form.returnDate}\n`;
      if (form.notes) msg += `📝 *ملاحظات:* ${form.notes}\n`;
    } else if (lang === "en") {
      msg = `🚗 *New Booking - Fadma Hsayn Cars*\n\n👤 *Name:* ${form.fullName}\n📞 *Phone:* ${form.phone}\n`;
      if (form.vehicle) msg += `🚘 *Vehicle:* ${form.vehicle}\n`;
      msg += `📍 *Pick-up:* ${form.pickup}\n`;
      if (form.returnLoc) msg += `🏁 *Return:* ${form.returnLoc}\n`;
      msg += `📅 *Pick-up Date:* ${form.pickupDate}\n📅 *Return Date:* ${form.returnDate}\n`;
      if (form.notes) msg += `📝 *Notes:* ${form.notes}\n`;
    } else {
      msg = `🚗 *Nouvelle Réservation - Fadma Hsayn Cars*\n\n👤 *Nom:* ${form.fullName}\n📞 *Téléphone:* ${form.phone}\n`;
      if (form.vehicle) msg += `🚘 *Véhicule:* ${form.vehicle}\n`;
      msg += `📍 *Prise en charge:* ${form.pickup}\n`;
      if (form.returnLoc) msg += `🏁 *Restitution:* ${form.returnLoc}\n`;
      msg += `📅 *Date de départ:* ${form.pickupDate}\n📅 *Date de retour:* ${form.returnDate}\n`;
      if (form.notes) msg += `📝 *Remarques:* ${form.notes}\n`;
    }
    window.open(`https://wa.me/212661371670?text=${encodeURIComponent(msg)}`, "_blank");
    setBookingOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-between px-4 md:px-10 transition-all ${isScrolled ? "bg-white/95 backdrop-blur shadow-lg" : "bg-white/95 backdrop-blur shadow"}`}>
        <a href="#home" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Fadma Hsayn Cars" className="h-12 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-bold text-[var(--blue)] tracking-wider">FADMA HSAYN</span>
            <span className="text-[9px] font-medium text-[var(--red)] tracking-wide">CARS</span>
          </div>
        </a>
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {(["home", "vehicles", "agencies", "about", "contact"] as const).map((key) => (
            <li key={key}>
              <a href={`#${key === "home" ? "home" : key === "vehicles" ? "fleet" : key === "about" ? "about" : key === "contact" ? "contact" : "agencies"}`} className="text-[13px] font-medium text-[var(--text-dark)] hover:text-[var(--red)] transition">
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(["fr", "ar", "en"] as Locale[]).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition ${lang === l ? "bg-[var(--blue)] text-white border-[var(--blue)]" : "bg-white text-gray-500 border-gray-300 hover:border-[var(--blue)]"}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="tel:+212661371670" className="hidden md:flex items-center gap-2 border-2 border-[var(--red)] text-[var(--red)] rounded-full px-4 py-2 text-[13px] font-semibold hover:bg-[var(--red)] hover:text-white transition">
            <i className="fa-solid fa-phone" /> +212 6 61 37 16 70
          </a>
          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className={`block w-6 h-0.5 bg-[var(--text-dark)] transition ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[var(--text-dark)] transition ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[var(--text-dark)] transition ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed top-[70px] left-0 right-0 bg-white z-40 shadow-xl p-5 flex flex-col gap-2 lg:hidden">
          {(["home", "vehicles", "agencies", "about", "contact"] as const).map((key) => (
            <a key={key} href={`#${key === "home" ? "home" : key === "vehicles" ? "fleet" : key === "about" ? "about" : key === "contact" ? "contact" : "agencies"}`} onClick={() => setMobileOpen(false)} className="py-3 px-4 rounded-lg text-[14px] font-medium hover:bg-gray-100">
              {t(key)}
            </a>
          ))}
          <a href="tel:+212661371670" className="mt-2 py-3 text-center bg-gradient-to-r from-[var(--red)] to-[#c01820] text-white rounded-lg font-semibold">+212 6 61 37 16 70</a>
        </div>
      )}

      <section id="home" className="mt-[70px] relative min-h-[calc(100vh-70px)] max-h-[680px] overflow-hidden bg-[#e8eef5]">
        <img src="/images/sora1.jpeg" alt="Aéroport Marrakech Menara" className="absolute inset-0 w-full h-full object-cover object-right" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-r from-white/97 via-white/80 to-transparent" />
        <div className="relative z-10 p-8 md:p-12 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--blue)] leading-tight mb-4">
            {t("hero_title")}
            <span className="block text-[var(--red)]">{t("hero_accent")}</span>
            {lang === "fr" ? "DÈS VOTRE ARRIVÉE" : lang === "en" ? "UPON ARRIVAL" : "من المطار"}
          </h1>
          <p className="text-[14px] text-gray-600 max-w-xs mb-10">{t("hero_subtitle")}</p>
          <div className="flex gap-6 flex-wrap">
            {[{ icon: "fa-plane-arrival", text: t("badge1") }, { icon: "fa-shield-halved", text: t("badge2") }, { icon: "fa-headset", text: t("badge3") }].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md text-[var(--blue)] text-lg"><i className={`fa-solid ${b.icon}`} /></div>
                <span className="text-[11px] font-medium max-w-[70px]">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white shadow-lg py-5 px-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 items-end justify-center">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-[11px] font-semibold mb-1.5">{t("pickup_location")}</label>
            <select className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-[13px] outline-none focus:border-[var(--blue)]">
              <option value="">{t("select_airport")}</option>
              <option value="وكالة مطار مراكش">{t("agency1")}</option>
              <option value="وكالة مرزوكة">{t("agency2")}</option>
              <option value="وكالة مطار الرشيدية">{t("agency3")}</option>
            </select>
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-[11px] font-semibold mb-1.5">{t("pickup_date")}</label>
            <input type="date" className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-[13px] outline-none focus:border-[var(--blue)]" />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-[11px] font-semibold mb-1.5">{t("return_date")}</label>
            <input type="date" className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-[13px] outline-none focus:border-[var(--blue)]" />
          </div>
          <button onClick={() => openBooking()} className="bg-gradient-to-r from-[var(--red)] to-[#c01820] text-white font-bold text-[12px] uppercase px-6 py-3 rounded-md flex items-center gap-2 hover:shadow-lg transition">
            {t("book_now")} <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>

      <section id="agencies" className="py-16 px-4 md:px-10 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--blue)] uppercase tracking-wide">— {t("agencies_title")} —</h2>
          <p className="text-[13px] text-gray-500 mt-2">{t("agencies_subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {agencies.map((a) => (
            <div key={a.id} className="rounded-xl shadow-md overflow-hidden bg-white hover:-translate-y-2 transition duration-300 cursor-pointer group">
              <img src={`/images/${a.image}`} alt={a.name.fr} className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="p-5 relative">
                <div className="absolute -top-5 left-5 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow border-2 border-gray-200 text-[var(--blue)] group-hover:border-[var(--red)] group-hover:text-[var(--red)] transition">
                  <i className={`fa-solid ${a.type === "airport" ? "fa-plane" : "fa-map-location-dot"}`} />
                </div>
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mt-3 block">{a.label[lang]}</span>
                <h3 className="text-lg font-extrabold text-[var(--blue)] mt-1 mb-3 uppercase">{a.name[lang]}</h3>
                <a href={a.mapUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-[var(--red)] inline-flex items-center gap-1 hover:underline">
                  {t("see_agency")} <i className="fa-solid fa-arrow-right text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="fleet" className="py-16 px-4 md:px-10 bg-[var(--gray-light)]">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--blue)] uppercase tracking-wide">— {t("fleet_title")} —</h2>
          <p className="text-[13px] text-gray-500 mt-2">{t("fleet_subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl p-4 shadow-md text-center hover:-translate-y-2 hover:shadow-xl transition duration-300 border-2 border-transparent hover:border-red-100">
              <img src={`/images/${car.image}`} alt={car.name} className="w-full h-32 object-cover rounded-lg mb-3" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <h3 className="text-[13px] font-bold uppercase tracking-wide mb-2">{car.name}</h3>
              <div className="flex justify-center gap-3 text-[11px] text-gray-500 mb-2">
                <span className="flex items-center gap-1"><i className="fa-solid fa-gears" /> {car.transmission === "manual" ? t("specs_manual") : t("specs_auto")}</span>
                <span className="flex items-center gap-1"><i className="fa-solid fa-users" /> {car.seats} {t("specs_seats")}</span>
              </div>
              <div className="text-[15px] font-bold text-[var(--red)] mb-3">{car.price} MAD <span className="text-[12px] font-normal text-gray-400">{t("price_day")}</span></div>
              <button onClick={() => openBooking(car.name)} className="w-full py-2 border border-[var(--red)] text-[var(--red)] rounded-md text-[12px] font-semibold hover:bg-[var(--red)] hover:text-white transition flex items-center justify-center gap-1">
                {t("reserve")} <i className="fa-solid fa-arrow-right text-xs" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="info" className="py-16 px-4 md:px-10 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--blue)] uppercase tracking-wide">— {t("info_title")} —</h2>
          <p className="text-[13px] text-gray-500 mt-2">{t("info_subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {[
            { icon: "fa-id-card", color: "blue", title: t("info1_title"), text: t("info1_text") },
            { icon: "fa-money-bill-wave", color: "red", title: t("info2_title"), text: t("info2_text") },
            { icon: "fa-credit-card", color: "green", title: t("info3_title"), text: t("info3_text") },
            { icon: "fa-globe", color: "orange", title: t("info4_title"), text: t("info4_text") },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-md hover:-translate-y-2 transition border-2 border-transparent hover:border-red-50">
              <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-xl ${card.color === "blue" ? "bg-blue-100 text-[var(--blue)]" : card.color === "red" ? "bg-red-100 text-[var(--red)]" : card.color === "green" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-500"}`}>
                <i className={`fa-solid ${card.icon}`} />
              </div>
              <h4 className="text-[14px] font-bold text-[var(--blue)] mb-2">{card.title}</h4>
              <p className="text-[12px] text-gray-500 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-white py-10 px-4 border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-around gap-4">
          {[
            { icon: "fa-percent", color: "red", title: t("feature1_title"), text: t("feature1_text") },
            { icon: "fa-infinity", color: "blue", title: t("feature2_title"), text: t("feature2_text") },
            { icon: "fa-shield-halved", color: "green", title: t("feature3_title"), text: t("feature3_text") },
            { icon: "fa-calendar-xmark", color: "orange", title: t("feature4_title"), text: t("feature4_text") },
            { icon: "fa-headset", color: "purple", title: t("feature5_title"), text: t("feature5_text") },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 max-w-[200px] hover:bg-gray-50 rounded-xl transition">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg ${f.color === "red" ? "bg-red-100 text-[var(--red)]" : f.color === "blue" ? "bg-blue-100 text-[var(--blue)]" : f.color === "green" ? "bg-green-100 text-green-600" : f.color === "orange" ? "bg-orange-100 text-orange-500" : "bg-purple-100 text-purple-600"}`}>
                <i className={`fa-solid ${f.icon}`} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[var(--blue)]">{f.title}</h4>
                <p className="text-[11px] text-gray-500">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section id="about" className="py-16 px-4 md:px-10 bg-[var(--gray-light)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--blue)] mb-3">{t("cta_title")}</h2>
            <p className="text-[14px] text-gray-500 mb-6">{t("cta_text")}</p>
            <button onClick={() => openBooking()} className="bg-gradient-to-r from-[var(--red)] to-[#c01820] text-white font-bold text-[13px] uppercase px-8 py-3.5 rounded-md hover:shadow-lg transition">{t("cta_button")}</button>
          </div>
          <div className="hidden md:block">
            <img src="/images/cars1.jpeg" alt="Voiture" className="w-full max-w-sm float-car" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-white border-t border-gray-200 pt-12 pb-6 px-4 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/logo.png" alt="Logo" className="h-12" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-bold text-[var(--blue)]">FADMA HSAYN</span>
                <span className="text-[9px] font-medium text-[var(--red)]">CARS</span>
              </div>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed mb-4 max-w-[230px]">{t("footer_desc")}</p>
            <div className="flex gap-2">
              {["facebook-f", "instagram", "whatsapp"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[var(--blue)] hover:text-white hover:border-[var(--blue)] transition"><i className={`fa-brands fa-${s}`} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[var(--blue)] uppercase tracking-wide mb-4">{t("quick_links")}</h4>
            <ul className="space-y-2 text-[13px] text-gray-500">
              <li><a href="#home" className="hover:text-[var(--red)]">{t("home")}</a></li>
              <li><a href="#fleet" className="hover:text-[var(--red)]">{t("vehicles")}</a></li>
              <li><a href="#agencies" className="hover:text-[var(--red)]">{t("agencies")}</a></li>
              <li><a href="#about" className="hover:text-[var(--red)]">{t("about")}</a></li>
              <li><a href="#contact" className="hover:text-[var(--red)]">{t("contact")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[var(--blue)] uppercase tracking-wide mb-4">{t("our_agencies")}</h4>
            <ul className="space-y-2 text-[13px] text-gray-500">
              <li><a href="#agencies" className="flex items-center gap-2 hover:text-[var(--red)]"><i className="fa-solid fa-plane text-[var(--blue)]" /> {t("agency1")}</a></li>
              <li><a href="#agencies" className="flex items-center gap-2 hover:text-[var(--red)]"><i className="fa-solid fa-map-location-dot text-[var(--blue)]" /> {t("agency2")}</a></li>
              <li><a href="#agencies" className="flex items-center gap-2 hover:text-[var(--red)]"><i className="fa-solid fa-plane text-[var(--blue)]" /> {t("agency3")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[var(--blue)] uppercase tracking-wide mb-4">{t("contact_us")}</h4>
            <div className="space-y-3 text-[13px] text-gray-500">
              <div className="flex items-center gap-2"><i className="fa-solid fa-phone text-[var(--blue)]" /> +212 6 61 37 16 70</div>
              <div className="flex items-center gap-2"><i className="fa-brands fa-whatsapp text-green-500" /> +212 6 61 37 16 70</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-envelope text-[var(--red)]" /> fadmahsayncarrs@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="text-center pt-6 text-[12px] text-gray-500">{t("copyright")}</div>
      </footer>

      <a href="https://wa.me/212661371670" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition text-2xl" aria-label="WhatsApp">
        <i className="fa-brands fa-whatsapp" />
      </a>

      {bookingOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={() => setBookingOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setBookingOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">✕</button>
            <h2 className="text-xl font-extrabold text-[var(--blue)] text-center mb-6">{t("booking_form_title")}</h2>
            <form onSubmit={submitBooking} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold mb-1">{t("full_name")}</label>
                <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-[13px] outline-none focus:border-[var(--blue)]" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1">{t("phone_number")}</label>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-[13px] outline-none focus:border-[var(--blue)]" placeholder="+212 6 XX XX XX XX" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1">{t("vehicle")}</label>
                <input value={form.vehicle} readOnly className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-[13px] bg-gray-50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold mb-1">{t("pickup_location")} *</label>
                  <select required value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-[13px]">
                    <option value="">{t("select_location")}</option>
                    <option value="وكالة مطار مراكش">{t("agency1")}</option>
                    <option value="وكالة مرزوكة">{t("agency2")}</option>
                    <option value="وكالة مطار الرشيدية">{t("agency3")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">{t("return_location")}</label>
                  <select value={form.returnLoc} onChange={(e) => setForm({ ...form, returnLoc: e.target.value })} className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-[13px]">
                    <option value="">{t("select_location")}</option>
                    <option value="وكالة مطار مراكش">{t("agency1")}</option>
                    <option value="وكالة مرزوكة">{t("agency2")}</option>
                    <option value="وكالة مطار الرشيدية">{t("agency3")}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold mb-1">{t("pickup_date")} *</label>
                  <input required type="date" value={form.pickupDate} onChange={(e) => setForm({ ...form, pickupDate: e.target.value })} className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-[13px]" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold mb-1">{t("return_date")} *</label>
                  <input required type="date" value={form.returnDate} onChange={(e) => setForm({ ...form, returnDate: e.target.value })} className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-[13px]" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold mb-1">{t("notes")}</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-[13px] min-h-[80px]" />
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-[14px] uppercase rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition">
                {t("send_whatsapp")} <i className="fa-brands fa-whatsapp" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

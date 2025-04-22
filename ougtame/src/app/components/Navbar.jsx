"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { useCurrency } from "./CurrencyContext";
import { Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const content = {
    ru: {
      production: "Продукция",
      about: "О бренде",
      contact: "Связаться",
      searchPlaceholder: "Поиск...",
      products: ["Настольные ПК", "Ноутбуки", "Игровые приставки"],
      servicesList: ["Ремонт", "Консультация", "Доставка"],
      modalTitle: "Оставьте заявку",
      modalSubtitle: "и наш менеджер свяжется с вами",
      modalNote: "Мы ответим в течение рабочего дня.",
      fullName: "Полное имя",
      phoneNumber: "Номер телефона",
      fullNamePlaceholder: "Иван Иванов",
      phonePlaceholder: "+998 90 123 45 67",
      submit: "Отправить",
    },
    uz: {
      production: "Mahsulotlar",
      about: "Brend haqida",
      contact: "Bog‘lanish",
      searchPlaceholder: "Qidirish...",
      products: ["Stol kompyuterlari", "Noutbuklar", "O'yin pristavkalari"],
      servicesList: ["Ta'mirlash", "Konsultatsiya", "Yetkazib berish"],
      modalTitle: "Ariza qoldiring",
      modalSubtitle: "va menejerimiz siz bilan bog‘lanadi",
      modalNote: "Biz ish kunida javob beramiz.",
      fullName: "To‘liq ism",
      phoneNumber: "Telefon raqami",
      fullNamePlaceholder: "Ali Valiyev",
      phonePlaceholder: "+998 90 123 45 67",
      submit: "Yuborish",
    },
  };

  const t = content[language];

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://api.mirmakhmudoff.uz/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone_number: phone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Ошибка: " + JSON.stringify(error));
      } else {
        alert("Успешно отправлено!");
        setName("");
        setPhone("");
        setContactModalOpen(false);
      }
    } catch (error) {
      alert("Ошибка отправки.");
    }
  };

  return (
    <>
      <nav className="bg-black text-white px-4 py-1 border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-pink-500 font-bold text-2xl">
            InGame<span className="text-white">.uz</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-lg">
            <div className="relative">
              <button
                className="flex items-center gap-2"
                onClick={() => setProductsOpen(!productsOpen)}
              >
                {t.production} <ChevronDown size={18} />
              </button>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 mt-3 bg-gray-900 shadow-md rounded p-4 min-w-[180px] z-10 text-base space-y-2"
                >
                  <ul className="space-y-2">
                    {t.products.map((item, i) => (
                      <li key={i} className="hover:text-pink-500 cursor-pointer">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            <Link href="/brends">
              <button className="hover:text-pink-500">{t.about}</button>
            </Link>

            <button
              onClick={() => setContactModalOpen(true)}
              className="border px-4 py-2 rounded hover:border-pink-500"
            >
              {t.contact}
            </button>

            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-black text-lg">
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
            </select>

            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-black text-lg">
              <option value="uzs">UZS</option>
              <option value="usd">USD</option>
            </select>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <button onClick={() => setMenuOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: menuOpen ? 0 : "100%" }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed top-0 right-0 h-full w-[260px] bg-black text-white p-6 z-50 overflow-y-auto text-lg space-y-4"
        >
          <div className="flex justify-end mb-4">
            <button onClick={() => setMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col space-y-5">
            <div>
              <button
                className="flex justify-between w-full"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              >
                {t.production}
                <ChevronRight className={`transition-transform ${mobileProductsOpen ? "rotate-90" : ""}`} />
              </button>
              {mobileProductsOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-4 mt-2 space-y-2"
                >
                  {t.products.map((item, i) => (
                    <li key={i} className="hover:text-pink-500">{item}</li>
                  ))}
                </motion.ul>
              )}
            </div>

            <div>
              <button
                className="flex justify-between w-full"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                {t.services}
                <ChevronRight className={`transition-transform ${mobileServicesOpen ? "rotate-90" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-4 mt-2 space-y-2"
                >
                  {t.servicesList.map((item, i) => (
                    <li key={i} className="hover:text-pink-500">{item}</li>
                  ))}
                </motion.ul>
              )}
            </div>

            <button onClick={() => setContactModalOpen(true)} className="text-left w-full">{t.contact}</button>
            <Link href="/brends" className="text-left w-full">{t.about}</Link>

            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-black text-white text-lg mt-2">
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
            </select>

            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-black text-white text-lg">
              <option value="uzs">UZS</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </motion.div>
      </nav>

      {contactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] px-4">
          <div className="bg-black rounded-lg p-6 w-full max-w-md text-white relative border border-gray-700">
            <button onClick={() => setContactModalOpen(false)} className="absolute top-2 right-2 text-white">
              <X size={20} />
            </button>
            <h2 className="text-pink-500 text-2xl font-bold text-center">{t.modalTitle}</h2>
            <p className="text-center font-semibold mt-1 text-lg">{t.modalSubtitle}</p>
            <p className="text-center text-sm mt-2 text-gray-400">{t.modalNote}</p>

            <div className="mt-4">
              <label className="block text-sm mb-1">{t.fullName}</label>
              <input
                type="text"
                placeholder={t.fullNamePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none text-lg"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-1">{t.phoneNumber}</label>
              <input
                type="number"
                placeholder={t.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none text-lg"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded text-lg"
            >
              {t.submit}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

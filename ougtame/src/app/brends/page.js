"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FaqAccordion from "../components/FaqAccordion";
import Image from "next/image";
import { motion } from "framer-motion";

const content = {
  ru: {
    title: "О компании",
    intro: "Добро пожаловать в нашу компанию! Мы гордимся тем, что предоставляем продукцию и услуги высочайшего качества нашим клиентам...",
    aboutTitle: "Про нас",
    aboutText1: "Мы — команда профессионалов, стремящихся к совершенству...",
    aboutText2: "Сотрудничая с нами, вы получаете не просто услугу...",
    mission: "Наша миссия — создавать инновационные решения...",
    whyChoose: "Почему стоит выбрать нас?",
    whyDesc: "Мы стремимся к тому, чтобы каждая деталь нашей работы приносила ценность...",
    features: [
      "Сильная команда профессионалов",
      "Индивидуальный подход к каждому клиенту",
      "Надежность и высокое качество",
      "Постоянное развитие и инновации",
    ],
  },
  uz: {
    title: "Kompaniya haqida",
    intro: "Kompaniyamizga xush kelibsiz! Biz mijozlarimizga yuqori sifatli mahsulot va xizmatlarni taqdim etishdan faxrlanamiz...",
    aboutTitle: "Biz haqimizda",
    aboutText1: "Biz — professional jamoa bo‘lib, doimiy mukammallikka intilamiz...",
    aboutText2: "Biz bilan hamkorlik qilganingizda siz faqat xizmat emas...",
    mission: "Bizning vazifamiz — innovatsion yechimlar yaratish...",
    whyChoose: "Nega bizni tanlashadi?",
    whyDesc: "Biz har bir detaldan qiymat yaratishga harakat qilamiz...",
    features: [
      "Kuchli mutaxassislar jamoasi",
      "Har bir mijozga individual yondashuv",
      "Ishonchlilik va yuqori sifat",
      "Doimiy rivojlanish va innovatsiyalar",
    ],
  },
};

const BrandPage = () => {
  const { language } = useLanguage();
  const [t, setT] = useState(content[language] || content.ru);

  useEffect(() => {
    setT(content[language] || content.ru);
  }, [language]);

  return (
    <div className="bg-black text-white mt-5">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 mb-10 max-w-4xl"
        >
          {t.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Image
            src="https://www.outgame.uz/_next/image?url=https%3A%2F%2Fi0.wp.com%2Fwww.iadea.com%2Fwp-content%2Fuploads%2F2016%2F01%2FAbout-company-S2-02.jpg%3Fssl%3D1&w=1920&q=75"
            alt="Hero"
            width={800}
            height={200}
            loading="lazy"
            className="rounded-xl w-full object-cover"
          />
        </motion.div>

        <section className="grid md:grid-cols-2 gap-8 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1590650046871-92c887180603"
              alt="About"
              width={500}
              height={300}
              className="rounded-lg w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4">{t.aboutTitle}</h3>
            <p className="text-gray-300 mb-4">{t.aboutText1}</p>
            <p className="text-gray-300 mb-4">{t.aboutText2}</p>
            <div className="border-l-4 border-pink-500 pl-4 text-sm italic text-gray-400">
              <strong className="text-pink-500">
                {language === "ru" ? "Наша миссия" : "Bizning vazifamiz"}
              </strong>{" "}
              — {t.mission}
            </div>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-semibold mb-4">{t.whyChoose}</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">{t.whyDesc}</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {t.features.map((item, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900 rounded-xl p-6 shadow hover:shadow-pink-500/30 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <p className="text-gray-200">{item}</p>
            </motion.div>
          ))}
        </motion.div>

        <FaqAccordion />
      </div>

      <Footer />
    </div>
  );
};

export default BrandPage;

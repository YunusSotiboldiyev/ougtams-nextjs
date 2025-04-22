"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

type Service = {
  id: number;
  name_uz: string;
  name_ru: string;
  min_description_uz: string;
  min_description_ru: string;
  description_uz: string;
  description_ru: string;
  image: string;
};

const translations = {
  ru: {
    title: "Услуги",
    button: "Подробнее",
  },
  uz: {
    title: "Xizmatlar",
    button: "Batafsil",
  },
};

const Services = () => {
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("https://api.mirmakhmudoff.uz/api/services/")
      .then((res) => res.json())
      .then((data) => {
        const repeated = Array(4)
          .fill(null)
          .map((_, i) => data[i % data.length]);
        setServices(repeated);
      })
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  const t = translations[language] || translations.ru;

  return (
    <section className="bg-neutral-900 text-white py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold mb-8">{t.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const fullDescription =
            language === "ru"
              ? service.description_ru
              : service.description_uz;

          const listItems = fullDescription
            .split(". ")
            .filter((line) => line.trim().length > 0);

          return (
            <motion.div
              key={`${service.id}-${index}`}
              className="bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={service.image}
                alt={
                  language === "ru" ? service.name_ru : service.name_uz
                }
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-pink-500 font-semibold text-lg mb-1">
                  {language === "ru"
                    ? service.name_ru
                    : service.name_uz}
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  {language === "ru"
                    ? service.min_description_ru
                    : service.min_description_uz}
                </p>
                <ul className="text-sm text-gray-400 mb-4 list-disc list-inside space-y-1">
                  {listItems.slice(0, 5).map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                  ))}
                </ul>
                <button className="border border-white text-white py-1 px-3 text-sm hover:bg-white hover:text-black transition-colors">
                  {t.button}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;

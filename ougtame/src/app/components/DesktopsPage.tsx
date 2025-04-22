"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { useCurrency } from "./CurrencyContext";

const translations = {
  ru: {
    specs: "Характеристики",
    processor: "Процессор",
    videocard: "Видеокарта",
    cooler: "Кулер",
    memory: "Оперативная память",
    monitor: "Монитор",
    resolution: "Разрешение",
    fps: "Частота кадров",
    price: "Цена",
    usd: "долларов",
  },
  uz: {
    specs: "Texnik xususiyatlar",
    processor: "Protsessor",
    videocard: "Videokarta",
    cooler: "Sovutgich",
    memory: "Tezkor xotira",
    monitor: "Monitor",
    resolution: "Ekran aniqligi",
    fps: "FPS",
    price: "Narx",
    usd: "dollar",
  },
};

const getLocalized = (item, field, lang) =>
  item[`${field}_${lang}`] || item[`${field}_ru`];

const Desktops = () => {
  const { language } = useLanguage();
  const { currency } = useCurrency();
  const t = translations[language];
  const [desktops, setDesktops] = useState([]);

  useEffect(() => {
    fetch("https://api.mirmakhmudoff.uz/api/desktops/")
      .then((res) => res.json())
      .then(setDesktops)
      .catch(console.error);
  }, []);

  return (
    <section className="bg-black min-h-screen text-white py-12 px-4 md:px-16">
      <h1 className="text-4xl font-bold mb-10">
        {language === "ru" ? "Игровые ПК" : "Oʻyin kompyuterlari"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {desktops.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-xl hover:shadow-pink-500/20 transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={getLocalized(item, "name", language)}
              className="w-full h-52 object-contain mb-4 rounded-xl"
            />
            <h2 className="text-xl font-bold mb-2">
              {getLocalized(item, "name", language)}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              {getLocalized(item, "description", language)}
            </p>
            <div className="text-sm space-y-1">
              <p>
                <strong>{t.processor}:</strong> {item.processor}
              </p>
              <p>
                <strong>{t.videocard}:</strong> {item.videocard}
              </p>
              <p>
                <strong>{t.cooler}:</strong> {item.cooler}
              </p>
              <p>
                <strong>{t.memory}:</strong> {item.memory}
              </p>
              <p>
                <strong>{t.monitor}:</strong> {item.monitor}
              </p>
              <p>
                <strong>{t.resolution}:</strong> {item.resolution}
              </p>
              <p>
                <strong>{t.fps}:</strong> {item.fps}
              </p>
              <p className="mt-2 font-semibold text-pink-500">
                {t.price}:{" "}
                {currency === "uzs"
                  ? `${parseInt(item.price_uzs).toLocaleString()} so'm`
                  : `$${parseFloat(item.price_usd).toFixed(2)}`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Desktops;

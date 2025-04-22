"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { useCurrency } from "./CurrencyContext";
import { motion } from "framer-motion";

type Discount = {
  id: number;
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  price_uzs: string;
  price_usd: string;
  image: string;
  slug: string;
};

const Diskounts = () => {
  const { language } = useLanguage();
  const { currency } = useCurrency();
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  useEffect(() => {
    fetch("https://api.mirmakhmudoff.uz/api/discounts/")
      .then((res) => res.json())
      .then((data) => setDiscounts(data))
      .catch((err) => console.error("Failed to fetch discounts:", err));
  }, []);

  return (
    <section className="bg-zinc-900 text-white px-4 py-10 md:px-12">
      <h2 className="text-3xl font-bold mb-6">
        {language === "ru" ? "Скидки" : "Chegirmalar"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-800 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt={language === "ru" ? item.name_ru : item.name_uz}
              className="w-full max-h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-pink-500 font-semibold text-lg mb-1">
                {language === "ru" ? item.name_ru : item.name_uz}
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                {language === "ru" ? item.description_ru : item.description_uz}
              </p>
              <p className="text-white font-bold text-md">
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

export default Diskounts;

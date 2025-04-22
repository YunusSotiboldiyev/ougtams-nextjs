'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';

const CatalogSection = () => {
  const [catalogs, setCatalogs] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const res = await fetch('https://api.mirmakhmudoff.uz/api/catalogs/');
        const data = await res.json();
        setCatalogs(data);
      } catch (error) {
        console.error('Failed to fetch catalogs:', error);
      }
    };

    fetchCatalogs();
  }, []);

  return (
    <div className="bg-black text-white py-12 px-4 text-center">
      {language === 'ru' ? (
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          КАТАЛОГ INGAME.UZ
        </h2>
      ) : (
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Ta'riflar INGAME.UZ
        </h2>
      )}
      <p className="text-lg mb-8 text-gray-300">
        {language === 'ru'
          ? 'Выберите себе в каталоге для максимальной комфортной игры'
          : 'Oʻzingizga qulay oʻyin uchun katalogdan tanlang'}
      </p>

      <div className="w-24 h-1 bg-pink-500 mx-auto mb-12 rounded-full" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {catalogs.map((item) => (
          <motion.div
            key={item.id} // Added key prop with unique value (item.id)
            whileHover={{ scale: 1.07 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 relative">
              <Image
                src={item.image}
                alt={item[`name_${language}`]}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 120px"
              />
            </div>
            <span className="text-sm md:text-base font-medium">
              {item[`name_${language}`]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CatalogSection;

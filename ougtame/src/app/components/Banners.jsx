"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

const Banners = () => {
  const { language } = useLanguage();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("https://api.mirmakhmudoff.uz/api/banners/");
        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="w-full relative ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="bg-black text-white grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-6 md:px-20 py-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {language === "ru" ? banner.title_ru : banner.title_uz}
                </h2>
                <p className="text-lg mb-6">
                  {language === "ru" ? banner.description_ru : banner.description_uz}
                </p>

                {banner.link && (
                  <Link href={banner.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 border-2 border-pink-500 text-white rounded transition-colors duration-300 hover:bg-pink-500"
                    >
                      {language === "ru" ? "Подробнее" : "Batafsil"}
                    </motion.button>
                  </Link>
                )}
              </div>

              <div className="flex justify-center">
                <motion.img
                  src={banner.image}
                  alt="Banner"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-[500px] object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banners;

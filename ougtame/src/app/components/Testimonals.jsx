"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { Play, ArrowRight, ArrowLeft } from "lucide-react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { language } = useLanguage();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("https://api.mirmakhmudoff.uz/api/testimonials/");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  const getReview = (item) =>
    language === "ru" ? item.review_ru : item.review_uz;

  const getProfession = (item) =>
    language === "ru" ? item.profession_ru : item.profession_uz;

  const handleLast = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black text-white py-14 max-h-[728px]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          {language === "ru" ? "Почему стоит выбрать нас?" : "Nega aynan bizni tanlash kerak?"}
        </h2>
        <p className="text-gray-400">
          {language === "ru"
            ? "Об этом лучше всего расскажут сами наши клиенты!"
            : "Buni bizning mijozlarimiz eng yaxshi aytib berishadi!"}
        </p>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 md:px-10 scrollbar-hide"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-zinc-900 rounded-xl p-4 relative"
            >
              <p className="text-pink-500 text-sm font-medium mb-3">
                {getReview(t)}
              </p>

              {t.image ? (
                <div className="w-full h-[400px] relative rounded-xl overflow-hidden mb-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center bg-gray-700 rounded-xl mb-3">
                  <span className="text-white text-sm">
                    {language === "ru" ? "Нет изображения" : "Rasm yo'q"}
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <p className="text-gray-400 text-sm">{getProfession(t)}</p>
              </div>

              <a
                href={t.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-1 text-pink-500 font-semibold text-sm hover:underline"
              >
                <Play className="w-4 h-4" /> Play
              </a>
            </div>
          ))}
        </div>

        <button
          onClick={handleLast}
          className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full shadow-lg"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full shadow-lg"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;

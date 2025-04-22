"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { useCurrency } from "./CurrencyContext";
import Link from "next/link";

const BlogNews = () => {
  const [news, setNews] = useState([]);
  const { language } = useLanguage();
  const { currency } = useCurrency();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("https://api.mirmakhmudoff.uz/api/news/");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <section className="bg-black text-white py-12 px-4 md:px-16">
      {language === 'ru' ? (
        <h2 className="text-3xl font-bold mb-10">Блог и новости</h2>
      ) : (
        <h2 className="text-3xl font-bold mb-10">Sahifa va yangiliklar</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg flex flex-col"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src={item.image}
                alt={item[`title_${language}`]}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded">
                {formatDate(item.created_time)}
              </div>
              <div className="absolute top-4 right-4 text-white text-sm font-extrabold bg-pink-500 px-2 py-1 rounded">
                НОВИНКА
              </div>
              <div className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                {currency === "uzs"
                  ? `2597287.91 so'm`
                  : `200$`}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">
                  {item[`title_${language}`]}
                </h3>
                <p className="text-sm text-gray-300">
                  {item[`description_${language}`]}
                </p>
              </div>

              <Link
                href="#"
                className="mt-4 text-sm text-pink-400 hover:underline font-medium"
              >
                {language === "ru" ? "Читать дальше" : "Batafsil o'qish"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogNews;

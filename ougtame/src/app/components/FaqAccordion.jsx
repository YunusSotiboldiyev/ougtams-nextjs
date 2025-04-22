"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useCurrency } from "./CurrencyContext";

const faqData = {
  ru: {
    title: "Часто задаваемые вопросы",
    faqs: [
      {
        question: "Сколько примерно стоит средний ПК для игр?",
        answer: "Средний игровой ПК стоит от $700 до $1200 в зависимости от характеристик."
      },
      {
        question: "Какая видеокарта лучше для 1080p?",
        answer: "NVIDIA RTX 3060 или AMD RX 6600 — отличные варианты для 1080p."
      },
      {
        question: "Сколько примерно стоит средний ПК для игр?",
        answer: "Средний игровой ПК стоит от $700 до $1200 в зависимости от характеристик."
      },
      {
        question: "Какая видеокарта лучше для 1080p?",
        answer: "NVIDIA RTX 3060 или AMD RX 6600 — отличные варианты для 1080p."
      },
      {
        question: "Сколько примерно стоит средний ПК для игр?",
        answer: "Средний игровой ПК стоит от $700 до $1200 в зависимости от характеристик."
      },
      {
        question: "Какая видеокарта лучше для 1080p?",
        answer: "NVIDIA RTX 3060 или AMD RX 6600 — отличные варианты для 1080p."
      },
    ],
  },
  uz: {
    title: "Ko‘p so‘raladigan savollar",
    faqs: [
      {
        question: "O‘rtacha o‘yin kompyuteri qancha turadi?",
        answer: "O‘rtacha o‘yin kompyuteri narxi $700 dan $1200 gacha bo‘ladi, konfiguratsiyaga qarab."
      },
      {
        question: "1080p uchun qaysi videokarta yaxshi?",
        answer: "NVIDIA RTX 3060 yoki AMD RX 6600 — 1080p uchun yaxshi tanlov."
      },
      {
        question: "O‘rtacha o‘yin kompyuteri qancha turadi?",
        answer: "O‘rtacha o‘yin kompyuteri narxi $700 dan $1200 gacha bo‘ladi, konfiguratsiyaga qarab."
      },
      {
        question: "1080p uchun qaysi videokarta yaxshi?",
        answer: "NVIDIA RTX 3060 yoki AMD RX 6600 — 1080p uchun yaxshi tanlov."
      },
      {
        question: "O‘rtacha o‘yin kompyuteri qancha turadi?",
        answer: "O‘rtacha o‘yin kompyuteri narxi $700 dan $1200 gacha bo‘ladi, konfiguratsiyaga qarab."
      },
      {
        question: "1080p uchun qaysi videokarta yaxshi?",
        answer: "NVIDIA RTX 3060 yoki AMD RX 6600 — 1080p uchun yaxshi tanlov."
      },
    ],
  },
};

const convertCurrency = (price, currency) => {
  if (currency === "uzs") {
    const exchangeRate = 11400;
    return `${(price * exchangeRate).toLocaleString()} so'm`;
  }
  return `$${price.toFixed(2)}`;
};

const FaqAccordion = () => {
  const { language } = useLanguage();
  const { currency } = useCurrency();
  const [openIndex, setOpenIndex] = useState(null);
  const content = faqData[language] || faqData.ru;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-12 px-4 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        {content.title}
      </h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {content.faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-700 pb-4"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between w-full items-center text-left font-medium text-white hover:text-pink-400"
            >
              <span className="flex gap-2">
                • {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-pink-500 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === index && (
              <div className="mt-2 text-gray-300 text-sm">
                {faq.answer.includes("$")
                  ? faq.answer.replace(/\$(\d+(\.\d{1,2})?)/g, (match, p1) => convertCurrency(parseFloat(p1), currency))
                  : faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqAccordion;

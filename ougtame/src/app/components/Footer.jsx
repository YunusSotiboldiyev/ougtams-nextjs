"use client";

import { useLanguage } from "./LanguageContext";
import { Zap } from "lucide-react";

const Footer = () => {
  const { language } = useLanguage();

  const content = {
    ru: {
      title: "Одним онлайн-звонком мы изменим ваш игровой опыт навсегда",
      description:
        "Назначим звонок, узнаем о ваших запросах, предложим подходящую конфигурацию. После разбора мы возьмем на себя все заботы по поддержке и дальнейшей доставке и сбору ПК",
      button: "📞 Заказать звонок",
    },
    uz: {
      title: "Bitta onlayn qo‘ng‘iroq bilan sizning o‘yin tajribangizni o‘zgartiramiz",
      description:
        "Biz qo‘ng‘iroq belgilaymiz, sizning ehtiyojlaringizni o‘rganamiz va mos konfiguratsiyani taklif qilamiz. So‘ngra barcha yetkazib berish va yig‘ish jarayonlarini biz o‘zimiz bajaramiz",
      button: "📞 Qo‘ng‘iroq buyurtma qilish",
    },
  };

  const { title, description, button } = content[language];

  return (
    <section className="bg-black text-white px-6 md:px-20 py-12">
      <div className="bg-zinc-900 rounded-xl p-8 md:p-12 flex flex-col items-center text-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 max-w-3xl">
          {title}
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl">{description}</p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
          <Zap className="w-4 h-4" /> {button}
        </button>
      </div>
    </section>
  );
};

export default Footer;
